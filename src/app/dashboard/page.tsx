'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import Link from 'next/link';
import {
    Play, Calendar, Trophy, Zap, Clock,
    ArrowRight, Star, TrendingUp, Users
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface UserProfile {
    koreanLevel?: string;
    goals?: string[];
    streak?: number;
    xp?: number;
}

export default function DashboardPage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const t = useTranslations('dashboard');
    const tLevel = useTranslations('levels');
    const tNav = useTranslations('nav');

    useEffect(() => {
        setMounted(true);
        const fetchProfile = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'profiles', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProfile(docSnap.data() as UserProfile);
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    if (!mounted) return null;

    const stats = [
        { label: t('streak'), value: '-', icon: <Zap size={24} />, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
        { label: t('totalXP'), value: '-', icon: <Star size={24} />, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
        { label: t('lessonsCompleted'), value: '-', icon: <Trophy size={24} />, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100' },
        { label: 'Hours Learned', value: '-', icon: <Clock size={24} />, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    ];

    if (loading) return <div className="text-purple-600 animate-pulse text-center mt-20">{t('loading')}</div>;

    const displayName = user?.displayName?.split(' ')[0] || 'Learner';

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                        {t('welcome')}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">{displayName}!</span> 🌿
                    </h1>
                    <div className="flex items-center gap-3 mt-3 bg-green-50 w-fit px-4 py-2 rounded-full border border-green-100">
                        <span className="text-xl">🌱</span>
                        <div>
                            <div className="text-sm font-bold text-green-800">Level 1 - Seed</div>
                            <div className="text-xs text-green-600">{tLevel('subtitle')}</div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href="/lessons" className="btn-secondary text-sm shadow-sm hover:shadow-md h-12 flex items-center justify-center whitespace-nowrap px-6">
                        {t('viewSchedule') || '일정 보기'}
                    </Link>
                    <Link href="/study" className="btn-primary text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 h-12 whitespace-nowrap px-6">
                        <Play size={16} fill="currentColor" /> {t('startLearning') || '학습 시작하기'}
                    </Link>
                </div>
            </div>

            {/* Level Progress Bar (Empty State) */}
            <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white to-gray-50/50">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold border border-gray-200 shadow-sm">
                        Lvl 1
                    </div>
                    <div className="flex-1 md:w-64">
                        <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                            <span>{tLevel('currentLevel')} XP</span>
                            <span className="text-gray-400">0 / 100 XP</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-gray-300 to-gray-400 w-[0%]" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-8 text-center w-full md:w-auto justify-around md:justify-end">
                    <div>
                        <div className="text-2xl font-bold text-gray-300">-</div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('lessonsCompleted')}</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-300">-</div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('thisWeek')}</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-300">-</div>
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t('streak')}</div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`glass-card p-5 md:p-6 flex flex-col gap-4 bg-white/80 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/5 border ${stat.border}`}>
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
                            <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6 md:space-y-8">

                    {/* Continue Learning Card (Empty State) */}
                    <div className="glass-card p-8 md:p-10 border-dashed border-2 border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white mb-4 flex items-center justify-center shadow-sm">
                            <Play size={24} className="text-gray-300 ml-1" fill="currentColor" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t('noLessons') || 'No Active Lessons'}</h3>
                        <p className="text-gray-500 text-sm mb-6 max-w-xs">{t('startMessage') || 'You haven\'t started any lessons yet. Pick a topic to begin your journey!'}</p>
                        <Link href="/study" className="btn-primary text-sm px-6 py-2.5 shadow-md">
                            {t('browseLessons') || 'Browse Lessons'}
                        </Link>
                    </div>

                    {/* Upcoming Lessons (Empty) */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Calendar className="text-purple-500" size={20} /> {t('upcomingLessons')}
                            </h3>
                            <Link href="/lessons" className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline">
                                {t('viewCalendar') || 'View Calendar'}
                            </Link>
                        </div>
                        <div className="glass-card p-8 text-center bg-white">
                            <p className="text-gray-500">{t('noLessons')}</p>
                            <Link href="/teachers" className="text-sm font-bold text-purple-600 mt-2 inline-block hover:underline">
                                {t('bookLesson')}
                            </Link>
                        </div>
                    </div>

                    {/* Recent Feedback (Empty) */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <TrendingUp className="text-pink-500" size={20} /> {t('recentFeedback')}
                        </h3>
                        <div className="glass-card p-6 bg-white border-pink-100 flex items-center justify-center h-32">
                            <p className="text-gray-400 text-sm italic">{t('noFeedback') || 'No feedback received yet.'}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 md:space-y-8">
                    {/* Community Highlights */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{tNav('community')}</h3>
                            <Link href="/community" className="text-xs font-bold text-purple-600 uppercase tracking-wide hover:underline">{t('viewAll')}</Link>
                        </div>
                        <div className="glass-card p-6 text-center bg-white/60">
                            <p className="text-gray-500 text-sm">{t('joinCommunity') || 'Join the community to see updates!'}</p>
                        </div>
                    </div>

                    {/* Leaderboard Mini */}
                    <div className="glass-card p-5 bg-gradient-to-br from-white to-gray-50 border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Trophy className="text-amber-500" size={18} /> {t('topLearners') || 'Top Learners'}
                        </h3>
                        {/* Placeholder Leaderboard - Keep actual data structure for now or simulate empty */}
                        <div className="space-y-4 opacity-50 filter grayscale">
                            {[
                                { name: 'Sarah L.', xp: '---', rank: 1, avatar: '👤' },
                                { name: 'Mike T.', xp: '---', rank: 2, avatar: '👤' },
                                { name: 'Jenny K.', xp: '---', rank: 3, avatar: '👤' },
                            ].map((user) => (
                                <div key={user.rank} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold bg-gray-100 text-gray-500`}>
                                            {user.rank}
                                        </div>
                                        <span className="text-xl">{user.avatar}</span>
                                        <span className="text-sm font-medium text-gray-500">{user.name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-300">{user.xp} XP</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4 text-xs text-gray-400">{t('leaderboardUpdate') || 'Leaderboard updates weekly'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
