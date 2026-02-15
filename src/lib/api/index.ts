import { createClient } from '@/lib/supabase/client';
import type {
    Profile, TeacherProfile, StudentProfile, Lesson, Feedback,
    Review, Conversation, Message, Post, PostComment, Notification,
    AvatarItem, UserAvatarItem, Badge, UserBadge, TPTransaction,
    LessonDuration, PostCategory,
} from '@/lib/types/database';

// ============================================
// Client singleton
// ============================================
function supabase() {
    return createClient();
}

// ============================================
// AUTH / PROFILE
// ============================================
export async function getCurrentUser() {
    const { data: { user } } = await supabase().auth.getUser();
    return user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
    const { data } = await supabase().from('profiles').select('*').eq('id', userId).single();
    return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase().from('profiles').update(updates).eq('id', userId).select().single();
    if (error) throw error;
    return data;
}

// ============================================
// TEACHER
// ============================================
export async function getTeachers(filters?: { specialty?: string; search?: string; sort?: string }) {
    let query = supabase()
        .from('teacher_profiles')
        .select('*, profiles!inner(*)')
        .eq('is_active', true);

    if (filters?.specialty) {
        query = query.contains('specialties', [filters.specialty]);
    }
    if (filters?.search) {
        query = query.ilike('profiles.display_name', `%${filters.search}%`);
    }

    switch (filters?.sort) {
        case 'rating': query = query.order('rating', { ascending: false }); break;
        case 'price_low': query = query.order('price_30', { ascending: true }); break;
        case 'price_high': query = query.order('price_30', { ascending: false }); break;
        case 'reviews': query = query.order('total_reviews', { ascending: false }); break;
        default: query = query.order('rating', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function getTeacher(teacherId: string) {
    const { data, error } = await supabase()
        .from('teacher_profiles')
        .select('*, profiles!inner(*)')
        .eq('id', teacherId)
        .single();
    if (error) throw error;
    return data;
}

export async function updateTeacherProfile(teacherId: string, updates: Partial<TeacherProfile>) {
    const { data, error } = await supabase().from('teacher_profiles').update(updates).eq('id', teacherId).select().single();
    if (error) throw error;
    return data;
}

// ============================================
// STUDENT
// ============================================
export async function getStudentProfile(studentId: string): Promise<StudentProfile | null> {
    const { data } = await supabase().from('student_profiles').select('*').eq('id', studentId).single();
    return data;
}

export async function updateStudentProfile(studentId: string, updates: Partial<StudentProfile>) {
    const { data, error } = await supabase().from('student_profiles').update(updates).eq('id', studentId).select().single();
    if (error) throw error;
    return data;
}

// ============================================
// LESSONS
// ============================================
export async function createLesson(lesson: { student_id: string; teacher_id: string; duration: LessonDuration; price: number; scheduled_at: string; topic?: string }) {
    const { data, error } = await supabase().from('lessons').insert(lesson).select().single();
    if (error) throw error;
    return data as Lesson;
}

export async function getUpcomingLessons(userId: string) {
    const { data, error } = await supabase()
        .from('lessons')
        .select('*, student:profiles!lessons_student_id_fkey(*), teacher:profiles!lessons_teacher_id_fkey(*)')
        .or(`student_id.eq.${userId},teacher_id.eq.${userId}`)
        .in('status', ['pending', 'confirmed'])
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .limit(10);
    if (error) throw error;
    return data;
}

export async function updateLessonStatus(lessonId: string, status: string, extraFields?: Record<string, unknown>) {
    const { data, error } = await supabase().from('lessons').update({ status, ...extraFields }).eq('id', lessonId).select().single();
    if (error) throw error;
    return data;
}

// ============================================
// FEEDBACK
// ============================================
export async function createFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>) {
    const { data, error } = await supabase().from('feedback').insert(feedback).select().single();
    if (error) throw error;
    // Award TP
    await addTP(feedback.teacher_id, feedback.tp_earned, 'Feedback submitted', feedback.lesson_id);
    return data;
}

export async function getFeedbackForStudent(studentId: string) {
    const { data, error } = await supabase()
        .from('feedback')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

// ============================================
// REVIEWS
// ============================================
export async function createReview(review: { student_id: string; teacher_id: string; lesson_id?: string; rating: number; comment?: string }) {
    const { data, error } = await supabase().from('reviews').insert(review).select().single();
    if (error) throw error;
    await addTP(review.student_id, 20, 'Wrote a review', data.id);
    return data;
}

export async function getTeacherReviews(teacherId: string) {
    const { data, error } = await supabase()
        .from('reviews')
        .select('*, student:profiles!reviews_student_id_fkey(*)')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

// ============================================
// MESSAGES
// ============================================
export async function getConversations(userId: string) {
    const { data, error } = await supabase()
        .from('conversations')
        .select('*')
        .or(`participant_1.eq.${userId},participant_2.eq.${userId}`)
        .order('last_message_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function getMessages(conversationId: string) {
    const { data, error } = await supabase()
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
}

export async function sendMessage(conversationId: string, senderId: string, content: string) {
    const { data, error } = await supabase().from('messages').insert({ conversation_id: conversationId, sender_id: senderId, content }).select().single();
    if (error) throw error;
    await supabase().from('conversations').update({ last_message_at: new Date().toISOString() }).eq('id', conversationId);
    return data;
}

// ============================================
// COMMUNITY POSTS
// ============================================
export async function getPosts(category?: PostCategory) {
    let query = supabase()
        .from('posts')
        .select('*, author:profiles!posts_author_id_fkey(*)')
        .order('created_at', { ascending: false })
        .limit(30);

    if (category && category !== 'All') {
        query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function createPost(post: { author_id: string; category: PostCategory; title?: string; content: string; image_url?: string }) {
    const { data, error } = await supabase().from('posts').insert(post).select().single();
    if (error) throw error;
    await addTP(post.author_id, 10, 'Community post', data.id);
    return data;
}

export async function togglePostLike(postId: string, userId: string) {
    const { data: existing } = await supabase().from('post_likes').select('*').eq('post_id', postId).eq('user_id', userId).single();
    if (existing) {
        await supabase().from('post_likes').delete().eq('post_id', postId).eq('user_id', userId);
        return false;
    } else {
        await supabase().from('post_likes').insert({ post_id: postId, user_id: userId });
        return true;
    }
}

export async function addComment(postId: string, authorId: string, content: string) {
    const { data, error } = await supabase().from('post_comments').insert({ post_id: postId, author_id: authorId, content }).select().single();
    if (error) throw error;
    return data;
}

// ============================================
// NOTIFICATIONS
// ============================================
export async function getNotifications(userId: string) {
    const { data, error } = await supabase()
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);
    if (error) throw error;
    return data;
}

export async function markNotificationRead(notifId: string) {
    await supabase().from('notifications').update({ read: true }).eq('id', notifId);
}

export async function markAllNotificationsRead(userId: string) {
    await supabase().from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false);
}

export async function createNotification(notif: { user_id: string; type: string; title: string; description?: string; action_url?: string }) {
    const { data, error } = await supabase().from('notifications').insert(notif).select().single();
    if (error) throw error;
    return data;
}

// ============================================
// AVATAR & SHOP
// ============================================
export async function getAvatarItems(category?: string) {
    let query = supabase().from('avatar_items').select('*').order('price', { ascending: true });
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    if (error) throw error;
    return data;
}

export async function getUserItems(userId: string) {
    const { data, error } = await supabase()
        .from('user_avatar_items')
        .select('*, item:avatar_items(*)')
        .eq('user_id', userId);
    if (error) throw error;
    return data;
}

export async function purchaseItem(userId: string, itemId: string, price: number) {
    // Deduct TP
    await addTP(userId, -price, 'Avatar item purchased', itemId);
    // Add item
    const { data, error } = await supabase().from('user_avatar_items').insert({ user_id: userId, item_id: itemId }).select().single();
    if (error) throw error;
    // Update profile TP
    await supabase().rpc('decrement_tp', { user_id: userId, amount: price });
    return data;
}

export async function equipItem(userId: string, itemId: string, category: string) {
    // Unequip all in same category
    const { data: currentItems } = await supabase()
        .from('user_avatar_items')
        .select('*, item:avatar_items(*)')
        .eq('user_id', userId)
        .eq('equipped', true);

    if (currentItems) {
        for (const ci of currentItems) {
            if (ci.item?.category === category) {
                await supabase().from('user_avatar_items').update({ equipped: false }).eq('user_id', userId).eq('item_id', ci.item_id);
            }
        }
    }

    // Equip selected
    await supabase().from('user_avatar_items').update({ equipped: true }).eq('user_id', userId).eq('item_id', itemId);
}

// ============================================
// BADGES
// ============================================
export async function getAllBadges() {
    const { data, error } = await supabase().from('badges').select('*').order('category');
    if (error) throw error;
    return data;
}

export async function getUserBadges(userId: string) {
    const { data, error } = await supabase()
        .from('user_badges')
        .select('*, badge:badges(*)')
        .eq('user_id', userId);
    if (error) throw error;
    return data;
}

export async function updateBadgeProgress(userId: string, badgeId: string, progress: number) {
    const { data: badge } = await supabase().from('badges').select('*').eq('id', badgeId).single();
    const earned = badge ? progress >= badge.condition_value : false;

    await supabase().from('user_badges').upsert({
        user_id: userId,
        badge_id: badgeId,
        progress,
        earned,
        earned_at: earned ? new Date().toISOString() : null,
    });

    if (earned && badge) {
        await addTP(userId, badge.xp_reward, `Badge earned: ${badge.name}`, badgeId);
        await createNotification({
            user_id: userId,
            type: 'achievement',
            title: `Badge Earned: ${badge.name} ${badge.emoji}`,
            description: `${badge.description} +${badge.xp_reward} XP`,
            action_url: '/badges',
        });
    }
}

// ============================================
// TP (TONG POINTS)
// ============================================
export async function addTP(userId: string, amount: number, reason: string, referenceId?: string) {
    await supabase().from('tp_transactions').insert({ user_id: userId, amount, reason, reference_id: referenceId });
    // Update profile TP
    const { data: profile } = await supabase().from('profiles').select('tp').eq('id', userId).single();
    if (profile) {
        await supabase().from('profiles').update({ tp: profile.tp + amount }).eq('id', userId);
    }
}

export async function getTPHistory(userId: string) {
    const { data, error } = await supabase()
        .from('tp_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);
    if (error) throw error;
    return data;
}

// ============================================
// STREAK
// ============================================
export async function updateStreak(userId: string) {
    const { data: profile } = await supabase().from('profiles').select('streak_days, streak_last_date').eq('id', userId).single();
    if (!profile) return;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (profile.streak_last_date === today) return; // Already counted today

    let newStreak = 1;
    if (profile.streak_last_date === yesterday) {
        newStreak = profile.streak_days + 1;
    }

    await supabase().from('profiles').update({ streak_days: newStreak, streak_last_date: today }).eq('id', userId);

    // Check streak badges
    if (newStreak === 7) {
        await addTP(userId, 100, '7-day streak bonus');
    }
    if (newStreak === 30) {
        await addTP(userId, 500, '30-day streak bonus');
    }
}
