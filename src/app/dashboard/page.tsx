'use client';

import Link from 'next/link';
import { Calendar, MessageCircle, BookOpen, Flame, Trophy, Star, Clock, Video, ChevronRight, Gamepad2, Users } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-6xl mx-auto">
                {/* Welcome Banner */}
                <div className="rounded-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.3), rgba(162,155,254,0.15))', border: '1px solid rgba(108,92,231,0.2)' }}>
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-[60px]" style={{ background: '#A29BFE' }} />
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Sarah! 🌿</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-purple-300 font-medium">Level 2 — 풀잎</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">340 / 500 XP</span>
                        </div>
                        <div className="h-3 rounded-full w-full max-w-md overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { icon: <BookOpen size={20} className="text-purple-400" />, value: '12', label: 'Total Lessons', color: 'rgba(108,92,231,0.15)' },
                        { icon: <Flame size={20} className="text-orange-400" />, value: '5 days', label: 'Streak 🔥', color: 'rgba(249,115,22,0.15)' },
                        { icon: <Clock size={20} className="text-cyan-400" />, value: '3', label: 'This Week', color: 'rgba(0,210,211,0.15)' },
                        { icon: <Star size={20} className="text-yellow-400" />, value: '160 XP', label: 'To Next Level', color: 'rgba(234,179,8,0.15)' },
                    ].map((stat, i) => (
                        <div key={i} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.color }}>
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Upcoming Lesson */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Calendar size={18} className="text-purple-400" />
                                    Upcoming Lesson
                                </h2>
                                <Link href="/booking" className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1 transition">
                                    View All <ChevronRight size={14} />
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(108,92,231,0.1)', border: '1px solid rgba(108,92,231,0.15)' }}>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                    👩‍🏫
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-semibold">Min-ji Kim</div>
                                    <div className="text-gray-400 text-sm">Today at 3:00 PM · 30 min · Conversation Practice</div>
                                </div>
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
                                    style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}
                                >
                                    <Video size={16} /> Join
                                </Link>
                            </div>
                        </div>

                        {/* Recent Feedback */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Trophy size={18} className="text-yellow-400" />
                                Recent Feedback
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { teacher: 'Min-ji Kim', date: 'Yesterday', rating: 4, comment: 'Great improvement in ordering food vocabulary! Keep practicing particles.' },
                                    { teacher: 'Jun-ho Park', date: '3 days ago', rating: 5, comment: 'Excellent pronunciation today! You mastered the double consonants.' },
                                ].map((fb, i) => (
                                    <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-medium text-sm">{fb.teacher}</span>
                                            <span className="text-gray-500 text-xs">{fb.date}</span>
                                        </div>
                                        <div className="flex gap-0.5 mb-2">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star key={j} size={14} className={j < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                                            ))}
                                        </div>
                                        <p className="text-gray-400 text-sm">{fb.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Avatar Preview */}
                        <Link href="/avatar" className="block rounded-2xl p-6 transition-all hover:border-purple-500/30" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <Gamepad2 size={18} className="text-green-400" />
                                My Avatar
                            </h3>
                            <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-3" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(255,107,157,0.1))' }}>
                                🧝‍♀️
                            </div>
                            <div className="text-center">
                                <div className="text-purple-300 text-sm font-medium">Level 2 · 풀잎</div>
                                <div className="text-gray-500 text-xs mt-1">💎 2,450 TP</div>
                            </div>
                        </Link>

                        {/* Quick Actions */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                {[
                                    { icon: <Calendar size={16} />, label: 'Book a Lesson', href: '/teachers', color: '#6C5CE7' },
                                    { icon: <MessageCircle size={16} />, label: 'Messages', href: '/messages', color: '#00D2D3' },
                                    { icon: <Users size={16} />, label: 'Community', href: '/community', color: '#FF6B9D' },
                                    { icon: <Gamepad2 size={16} />, label: 'Avatar Shop', href: '/avatar/shop', color: '#F59E0B' },
                                ].map((action, i) => (
                                    <Link
                                        key={i}
                                        href={action.href}
                                        className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white transition-all hover:bg-white/5"
                                    >
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${action.color}20`, color: action.color }}>
                                            {action.icon}
                                        </div>
                                        <span className="text-sm font-medium">{action.label}</span>
                                        <ChevronRight size={14} className="ml-auto text-gray-600" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
