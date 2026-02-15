'use client';

import { useState } from 'react';
import { Award, Lock, Star, Flame, BookOpen, MessageCircle, Users, Trophy, Target, Zap, Heart, Crown } from 'lucide-react';

const BADGE_CATEGORIES = ['All', 'Learning', 'Social', 'Streak', 'Special'];

const BADGES = [
    // Learning
    { id: 1, cat: 'Learning', name: 'First Step', desc: 'Complete your first lesson', emoji: '🎯', earned: true, date: 'Feb 1', xp: 50, rarity: 'Common' },
    { id: 2, cat: 'Learning', name: 'Hangul Master', desc: 'Learn all Hangul characters', emoji: '🔤', earned: true, date: 'Feb 5', xp: 100, rarity: 'Rare' },
    { id: 3, cat: 'Learning', name: 'Word Collector', desc: 'Learn 100 vocabulary words', emoji: '📚', earned: true, date: 'Feb 10', xp: 150, rarity: 'Rare' },
    { id: 4, cat: 'Learning', name: 'Grammar Guru', desc: 'Master 20 grammar patterns', emoji: '📝', earned: false, progress: 14, total: 20, xp: 200, rarity: 'Epic' },
    { id: 5, cat: 'Learning', name: 'TOPIK Ready', desc: 'Complete TOPIK prep course', emoji: '🏆', earned: false, progress: 0, total: 1, xp: 500, rarity: 'Legendary' },
    { id: 6, cat: 'Learning', name: 'Lesson Legend', desc: 'Complete 50 lessons', emoji: '⭐', earned: false, progress: 12, total: 50, xp: 300, rarity: 'Epic' },

    // Social
    { id: 7, cat: 'Social', name: 'Community Star', desc: 'Get 50 likes on your posts', emoji: '💫', earned: true, date: 'Feb 8', xp: 100, rarity: 'Rare' },
    { id: 8, cat: 'Social', name: 'Helpful Hand', desc: 'Answer 10 community questions', emoji: '🤝', earned: false, progress: 6, total: 10, xp: 150, rarity: 'Rare' },
    { id: 9, cat: 'Social', name: 'Conversation King', desc: 'Chat with 5 different teachers', emoji: '👑', earned: false, progress: 2, total: 5, xp: 200, rarity: 'Epic' },
    { id: 10, cat: 'Social', name: 'Review Writer', desc: 'Write 5 teacher reviews', emoji: '✍️', earned: false, progress: 1, total: 5, xp: 100, rarity: 'Common' },

    // Streak
    { id: 11, cat: 'Streak', name: 'On Fire', desc: '7-day learning streak', emoji: '🔥', earned: true, date: 'Feb 12', xp: 100, rarity: 'Common' },
    { id: 12, cat: 'Streak', name: 'Unstoppable', desc: '30-day learning streak', emoji: '💎', earned: false, progress: 14, total: 30, xp: 500, rarity: 'Legendary' },
    { id: 13, cat: 'Streak', name: 'Morning Person', desc: 'Study before 8 AM for 7 days', emoji: '🌅', earned: false, progress: 3, total: 7, xp: 150, rarity: 'Rare' },

    // Special
    { id: 14, cat: 'Special', name: 'Pioneer', desc: 'Join TONG in beta phase', emoji: '🚀', earned: true, date: 'Jan 15', xp: 200, rarity: 'Legendary' },
    { id: 15, cat: 'Special', name: 'K-Culture Expert', desc: 'Complete all K-Culture onboarding', emoji: '🇰🇷', earned: true, date: 'Feb 1', xp: 100, rarity: 'Rare' },
    { id: 16, cat: 'Special', name: 'Level 5 Master', desc: 'Reach Korean Level 5', emoji: '🐉', earned: false, progress: 2, total: 5, xp: 1000, rarity: 'Legendary' },
];

const RARITY_COLORS: Record<string, string> = {
    Common: '#9ca3af',
    Rare: '#6C5CE7',
    Epic: '#FF6B9D',
    Legendary: '#F59E0B',
};

export default function BadgesPage() {
    const [activeCat, setActiveCat] = useState('All');

    const filtered = activeCat === 'All' ? BADGES : BADGES.filter(b => b.cat === activeCat);
    const earnedCount = BADGES.filter(b => b.earned).length;
    const totalXP = BADGES.filter(b => b.earned).reduce((sum, b) => sum + b.xp, 0);

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">Badges & Achievements <Trophy size={24} className="text-yellow-400" /></h1>
                        <p className="text-gray-400 mt-1">Collect them all!</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-5 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Award size={24} className="text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{earnedCount}/{BADGES.length}</div>
                        <div className="text-gray-500 text-sm">Badges Earned</div>
                    </div>
                    <div className="p-5 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Zap size={24} className="text-yellow-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{totalXP.toLocaleString()}</div>
                        <div className="text-gray-500 text-sm">Total XP</div>
                    </div>
                    <div className="p-5 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Flame size={24} className="text-orange-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">14</div>
                        <div className="text-gray-500 text-sm">Day Streak</div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {BADGE_CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCat(cat)} className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all" style={{ background: activeCat === cat ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)', border: `1px solid ${activeCat === cat ? 'transparent' : 'rgba(255,255,255,0.08)'}`, color: activeCat === cat ? 'white' : '#9ca3af' }}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Badge Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map(badge => (
                        <div
                            key={badge.id}
                            className={`rounded-2xl p-5 text-center transition-all hover:scale-[1.02] ${badge.earned ? '' : 'opacity-60'}`}
                            style={{
                                background: badge.earned ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${badge.earned ? `${RARITY_COLORS[badge.rarity]}40` : 'rgba(255,255,255,0.04)'}`,
                            }}
                        >
                            <div className={`text-4xl mb-3 ${badge.earned ? '' : 'grayscale'}`}>
                                {badge.earned ? badge.emoji : '🔒'}
                            </div>
                            <div className="text-white font-semibold text-sm mb-1">{badge.name}</div>
                            <div className="text-xs mb-2" style={{ color: RARITY_COLORS[badge.rarity] }}>{badge.rarity}</div>
                            <p className="text-gray-500 text-xs mb-3">{badge.desc}</p>

                            {badge.earned ? (
                                <div className="text-xs text-green-400">✅ {badge.date}</div>
                            ) : 'progress' in badge ? (
                                <div>
                                    <div className="w-full h-1.5 rounded-full mb-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                        <div className="h-full rounded-full" style={{ width: `${((badge.progress ?? 0) / (badge.total ?? 1)) * 100}%`, background: RARITY_COLORS[badge.rarity] }} />
                                    </div>
                                    <span className="text-gray-500 text-[10px]">{badge.progress}/{badge.total}</span>
                                </div>
                            ) : null}

                            <div className="mt-2 text-[10px] text-yellow-400 font-medium">+{badge.xp} XP</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
