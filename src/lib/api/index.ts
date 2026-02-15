import {
    collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc,
    query, where, orderBy, limit, serverTimestamp, increment, onSnapshot,
    Timestamp, DocumentData, QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// ============================================
// PROFILES
// ============================================
export async function getProfile(userId: string) {
    const snap = await getDoc(doc(db, 'profiles', userId));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function updateProfile(userId: string, data: Record<string, unknown>) {
    await updateDoc(doc(db, 'profiles', userId), { ...data, updatedAt: serverTimestamp() });
}

// ============================================
// TEACHER PROFILES
// ============================================
export async function getTeachers(filters?: { specialty?: string; sort?: string }) {
    const constraints: QueryConstraint[] = [where('role', '==', 'teacher')];

    if (filters?.sort === 'rating') {
        constraints.push(orderBy('rating', 'desc'));
    } else if (filters?.sort === 'price_low') {
        constraints.push(orderBy('price30', 'asc'));
    } else if (filters?.sort === 'price_high') {
        constraints.push(orderBy('price30', 'desc'));
    } else {
        constraints.push(orderBy('rating', 'desc'));
    }

    constraints.push(limit(50));

    const q = query(collection(db, 'profiles'), ...constraints);
    const snap = await getDocs(q);
    let results = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    if (filters?.specialty) {
        results = results.filter((t: DocumentData) =>
            t.specialties?.includes(filters.specialty)
        );
    }

    return results;
}

export async function getTeacher(teacherId: string) {
    return getProfile(teacherId);
}

// ============================================
// LESSONS
// ============================================
export async function createLesson(data: {
    studentId: string; teacherId: string;
    duration: number; price: number;
    scheduledAt: Date; topic?: string;
}) {
    const ref = await addDoc(collection(db, 'lessons'), {
        ...data,
        status: 'pending',
        scheduledAt: Timestamp.fromDate(data.scheduledAt),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return { id: ref.id, ...data };
}

export async function getUpcomingLessons(userId: string, role: 'student' | 'teacher') {
    const field = role === 'student' ? 'studentId' : 'teacherId';
    const q = query(
        collection(db, 'lessons'),
        where(field, '==', userId),
        where('status', 'in', ['pending', 'confirmed']),
        orderBy('scheduledAt', 'asc'),
        limit(10)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateLessonStatus(lessonId: string, status: string, extra?: Record<string, unknown>) {
    await updateDoc(doc(db, 'lessons', lessonId), { status, ...extra, updatedAt: serverTimestamp() });
}

// ============================================
// FEEDBACK
// ============================================
export async function createFeedback(data: {
    lessonId: string; teacherId: string; studentId: string;
    overallRating: number; skills: Record<string, number>;
    strengths?: string; improvements?: string; notes?: string;
    homework?: string[]; tpEarned?: number;
}) {
    const ref = await addDoc(collection(db, 'feedback'), {
        ...data,
        tpEarned: data.tpEarned || 30,
        createdAt: serverTimestamp(),
    });
    // Award TP to teacher
    await addTP(data.teacherId, data.tpEarned || 30, 'Feedback submitted', data.lessonId);
    return { id: ref.id };
}

export async function getFeedbackForStudent(studentId: string) {
    const q = query(
        collection(db, 'feedback'),
        where('studentId', '==', studentId),
        orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ============================================
// REVIEWS
// ============================================
export async function createReview(data: {
    studentId: string; teacherId: string;
    rating: number; comment?: string; lessonId?: string;
}) {
    const ref = await addDoc(collection(db, 'reviews'), {
        ...data,
        createdAt: serverTimestamp(),
    });
    // Update teacher rating (denormalized)
    const reviewsQ = query(collection(db, 'reviews'), where('teacherId', '==', data.teacherId));
    const reviewsSnap = await getDocs(reviewsQ);
    const ratings = reviewsSnap.docs.map(d => d.data().rating as number);
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    await updateDoc(doc(db, 'profiles', data.teacherId), {
        rating: Math.round(avg * 10) / 10,
        totalReviews: ratings.length,
    });
    await addTP(data.studentId, 20, 'Wrote a review', ref.id);
    return { id: ref.id };
}

export async function getTeacherReviews(teacherId: string) {
    const q = query(
        collection(db, 'reviews'),
        where('teacherId', '==', teacherId),
        orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ============================================
// MESSAGES
// ============================================
export async function getConversations(userId: string) {
    const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        orderBy('lastMessageAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getMessages(conversationId: string) {
    const q = query(
        collection(db, 'conversations', conversationId, 'messages'),
        orderBy('createdAt', 'asc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function sendMessage(conversationId: string, senderId: string, content: string) {
    await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        senderId,
        content,
        read: false,
        createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessageAt: serverTimestamp(),
        lastMessage: content,
    });
}

export function onMessagesSnapshot(conversationId: string, callback: (messages: DocumentData[]) => void) {
    const q = query(
        collection(db, 'conversations', conversationId, 'messages'),
        orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snap) => {
        callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
}

// ============================================
// COMMUNITY POSTS
// ============================================
export async function getPosts(category?: string) {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc'), limit(30)];
    if (category && category !== 'All') {
        constraints.unshift(where('category', '==', category));
    }
    const q = query(collection(db, 'posts'), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function createPost(data: {
    authorId: string; category: string;
    title?: string; content: string; imageUrl?: string;
}) {
    const ref = await addDoc(collection(db, 'posts'), {
        ...data,
        likesCount: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
    });
    await addTP(data.authorId, 10, 'Community post', ref.id);
    return { id: ref.id };
}

export async function togglePostLike(postId: string, userId: string) {
    const likeRef = doc(db, 'posts', postId, 'likes', userId);
    const likeSnap = await getDoc(likeRef);
    if (likeSnap.exists()) {
        await deleteDoc(likeRef);
        await updateDoc(doc(db, 'posts', postId), { likesCount: increment(-1) });
        return false;
    } else {
        await setDoc(likeRef, { createdAt: serverTimestamp() });
        await updateDoc(doc(db, 'posts', postId), { likesCount: increment(1) });
        return true;
    }
}

export async function addComment(postId: string, authorId: string, content: string) {
    await addDoc(collection(db, 'posts', postId, 'comments'), {
        authorId,
        content,
        createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'posts', postId), { commentsCount: increment(1) });
}

// ============================================
// NOTIFICATIONS
// ============================================
export async function getNotifications(userId: string) {
    const q = query(
        collection(db, 'notifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function markNotificationRead(notifId: string) {
    await updateDoc(doc(db, 'notifications', notifId), { read: true });
}

export async function createNotification(data: {
    userId: string; type: string;
    title: string; description?: string; actionUrl?: string;
}) {
    await addDoc(collection(db, 'notifications'), {
        ...data,
        read: false,
        createdAt: serverTimestamp(),
    });
}

// ============================================
// AVATAR ITEMS & SHOP
// ============================================
export async function getAvatarItems(category?: string) {
    const constraints: QueryConstraint[] = [orderBy('price', 'asc')];
    if (category) constraints.unshift(where('category', '==', category));
    const q = query(collection(db, 'avatarItems'), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getUserItems(userId: string) {
    const q = query(collection(db, 'profiles', userId, 'ownedItems'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function purchaseItem(userId: string, itemId: string, price: number) {
    await setDoc(doc(db, 'profiles', userId, 'ownedItems', itemId), {
        equipped: false,
        purchasedAt: serverTimestamp(),
    });
    await addTP(userId, -price, 'Avatar item purchased', itemId);
}

// ============================================
// BADGES
// ============================================
export async function getAllBadges() {
    const snap = await getDocs(query(collection(db, 'badges'), orderBy('category')));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getUserBadges(userId: string) {
    const snap = await getDocs(collection(db, 'profiles', userId, 'badges'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function updateBadgeProgress(userId: string, badgeId: string, progress: number, target: number) {
    const earned = progress >= target;
    await setDoc(doc(db, 'profiles', userId, 'badges', badgeId), {
        progress,
        earned,
        earnedAt: earned ? serverTimestamp() : null,
    }, { merge: true });
}

// ============================================
// TP (TONG POINTS)
// ============================================
export async function addTP(userId: string, amount: number, reason: string, referenceId?: string) {
    await addDoc(collection(db, 'tpTransactions'), {
        userId,
        amount,
        reason,
        referenceId: referenceId || null,
        createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, 'profiles', userId), { tp: increment(amount) });
}

export async function getTPHistory(userId: string) {
    const q = query(
        collection(db, 'tpTransactions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(50)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ============================================
// STREAK
// ============================================
export async function updateStreak(userId: string) {
    const profile = await getProfile(userId);
    if (!profile) return;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if ((profile as DocumentData).streakLastDate === today) return;

    let newStreak = 1;
    if ((profile as DocumentData).streakLastDate === yesterday) {
        newStreak = ((profile as DocumentData).streakDays || 0) + 1;
    }

    await updateDoc(doc(db, 'profiles', userId), {
        streakDays: newStreak,
        streakLastDate: today,
    });

    if (newStreak === 7) await addTP(userId, 100, '7-day streak bonus');
    if (newStreak === 30) await addTP(userId, 500, '30-day streak bonus');
}
