// Database types matching supabase/schema.sql

export type UserRole = 'student' | 'teacher';
export type LessonStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type LessonDuration = 10 | 20 | 30 | 50;
export type NotificationType = 'booking' | 'reminder' | 'message' | 'achievement' | 'feedback' | 'community' | 'system';
export type PostCategory = 'All' | 'K-POP' | 'K-Drama' | 'K-Food' | 'Travel' | 'Study Tips' | 'Free Talk';
export type AvatarCategory = 'Hair' | 'Face' | 'Top' | 'Bottom' | 'Shoes' | 'Accessory' | 'Background' | 'Pet';
export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type BadgeCategory = 'Learning' | 'Social' | 'Streak' | 'Special';
export type Locale = 'en' | 'ko';

export interface Profile {
    id: string;
    role: UserRole;
    display_name: string;
    avatar_url: string | null;
    avatar_emoji: string;
    level: number;
    xp: number;
    tp: number;
    streak_days: number;
    streak_last_date: string | null;
    timezone: string;
    locale: Locale;
    onboarding_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface TeacherProfile {
    id: string;
    bio: string | null;
    experience: string | null;
    education: string | null;
    specialties: string[];
    languages: string[];
    price_30: number;
    price_50: number;
    avail_morning: boolean;
    avail_afternoon: boolean;
    avail_evening: boolean;
    avail_night: boolean;
    intro_video_url: string | null;
    rating: number;
    total_reviews: number;
    total_lessons: number;
    total_students: number;
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

export interface StudentProfile {
    id: string;
    korean_level: number;
    learning_goals: string[];
    k_culture_interests: string[];
    preferred_schedule: string[];
    total_lessons: number;
    lessons_since_test: number;
    created_at: string;
}

export interface Lesson {
    id: string;
    student_id: string;
    teacher_id: string;
    status: LessonStatus;
    duration: LessonDuration;
    price: number;
    scheduled_at: string;
    meet_link: string | null;
    topic: string | null;
    notes: string | null;
    cancelled_by: string | null;
    cancelled_reason: string | null;
    created_at: string;
    updated_at: string;
    // Joined
    student?: Profile;
    teacher?: Profile & { teacher_profile?: TeacherProfile };
}

export interface Feedback {
    id: string;
    lesson_id: string;
    teacher_id: string;
    student_id: string;
    overall_rating: number;
    skills: Record<string, number>;
    strengths: string | null;
    improvements: string | null;
    notes: string | null;
    homework: string[];
    homework_note: string | null;
    tp_earned: number;
    created_at: string;
}

export interface Review {
    id: string;
    lesson_id: string | null;
    student_id: string;
    teacher_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    student?: Profile;
}

export interface Conversation {
    id: string;
    participant_1: string;
    participant_2: string;
    last_message_at: string;
    created_at: string;
    other_user?: Profile;
    last_message?: Message;
    unread_count?: number;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    read: boolean;
    created_at: string;
}

export interface Post {
    id: string;
    author_id: string;
    category: PostCategory;
    title: string | null;
    content: string;
    image_url: string | null;
    likes_count: number;
    comments_count: number;
    created_at: string;
    author?: Profile;
    liked_by_user?: boolean;
    saved_by_user?: boolean;
}

export interface PostComment {
    id: string;
    post_id: string;
    author_id: string;
    content: string;
    created_at: string;
    author?: Profile;
}

export interface Notification {
    id: string;
    user_id: string;
    type: NotificationType;
    title: string;
    description: string | null;
    action_url: string | null;
    read: boolean;
    created_at: string;
}

export interface AvatarItem {
    id: string;
    category: AvatarCategory;
    name: string;
    emoji: string;
    price: number;
    rarity: Rarity;
    level_required: number;
    created_at: string;
}

export interface UserAvatarItem {
    user_id: string;
    item_id: string;
    equipped: boolean;
    purchased_at: string;
    item?: AvatarItem;
}

export interface Badge {
    id: string;
    category: BadgeCategory;
    name: string;
    description: string;
    emoji: string;
    xp_reward: number;
    rarity: Rarity;
    condition_type: string | null;
    condition_value: number;
    created_at: string;
}

export interface UserBadge {
    user_id: string;
    badge_id: string;
    progress: number;
    earned: boolean;
    earned_at: string | null;
    badge?: Badge;
}

export interface TPTransaction {
    id: string;
    user_id: string;
    amount: number;
    reason: string;
    reference_id: string | null;
    created_at: string;
}
