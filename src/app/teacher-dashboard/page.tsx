'use client';

import Link from 'next/link';
import { Calendar, Clock, DollarSign, Users, Star, TrendingUp, MessageCircle, BookOpen, ChevronRight, Video, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';

export default function TeacherDashboardPage() {
    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Teacher Dashboard 👩‍🏫</h1>
                        <p className="text-gray-400 mt-1">Welcome back, Min-ji!</p>
                    </div>
                    <Link href="/teachers/settings" className="px-4 py-2 rounded-xl text-sm text-gray-300 transition hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                        ⚙️ Settings
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { icon: <Users size={20} className="text-purple-400" />, value: '89', label: 'Active Students', change: '+5 this week', color: 'rgba(108,92,231,0.15)' },
                        { icon: <Calendar size={20} className="text-cyan-400" />, value: '1,240', label: 'Total Lessons', change: '+18 this month', color: 'rgba(0,210,211,0.15)' },
                        { icon: <DollarSign size={20} className="text-green-400" />, value: '$2,480', label: 'This Month', change: '+12% vs last', color: 'rgba(34,197,94,0.15)' },
                        { icon: <Star size={20} className="text-yellow-400" />, value: '4.9', label: 'Average Rating', change: '127 reviews', color: 'rgba(234,179,8,0.15)' },
                    ].map((stat, i) => (
                        <div key={i} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.color }}>
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                            <div className="text-green-400 text-xs mt-1">{stat.change}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Today's Schedule */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Calendar size={18} className="text-purple-400" />
                                    Today&apos;s Schedule
                                </h2>
                                <Link href="/schedule" className="text-purple-400 text-sm hover:text-purple-300 flex items-center gap-1 transition">
                                    Full Calendar <ChevronRight size={14} />
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { time: '10:00 AM', student: 'Sarah M.', level: 'Level 2', topic: 'K-POP Lyrics - BTS Butter', duration: '30 min', status: 'completed' },
                                    { time: '11:00 AM', student: 'James K.', level: 'Level 3', topic: 'Business Korean - Meeting Phrases', duration: '50 min', status: 'completed' },
                                    { time: '3:00 PM', student: 'Yuki T.', level: 'Level 1', topic: 'Hangul Pronunciation Basics', duration: '30 min', status: 'upcoming' },
                                    { time: '7:00 PM', student: 'Carlos R.', level: 'Level 2', topic: 'K-Drama Dialogue Practice', duration: '30 min', status: 'upcoming' },
                                    { time: '8:30 PM', student: 'Emma L.', level: 'Level 4', topic: 'Free Conversation - News Topics', duration: '50 min', status: 'upcoming' },
                                ].map((lesson, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/[0.02]"
                                        style={{
                                            background: lesson.status === 'upcoming' ? 'rgba(108,92,231,0.05)' : 'transparent',
                                            border: `1px solid ${lesson.status === 'upcoming' ? 'rgba(108,92,231,0.1)' : 'rgba(255,255,255,0.04)'}`,
                                        }}
                                    >
                                        <div className="text-sm text-gray-400 w-20 flex-shrink-0">{lesson.time}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-medium text-sm">{lesson.student}</span>
                                                <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(108,92,231,0.15)', color: '#A29BFE' }}>{lesson.level}</span>
                                            </div>
                                            <div className="text-gray-500 text-xs mt-0.5">{lesson.topic} · {lesson.duration}</div>
                                        </div>
                                        {lesson.status === 'completed' ? (
                                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                                        ) : (
                                            <Link href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                                <Video size={12} /> Join
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Feedback */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <AlertCircle size={18} className="text-orange-400" />
                                Pending Feedback
                                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-bold text-orange-400" style={{ background: 'rgba(249,115,22,0.15)' }}>2</span>
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { student: 'Sarah M.', time: 'Today 10:00 AM', topic: 'K-POP Lyrics', remaining: '8:42' },
                                    { student: 'James K.', time: 'Today 11:00 AM', topic: 'Business Korean', remaining: '5:18' },
                                ].map((fb, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.1)' }}>
                                        <div className="flex-1">
                                            <div className="text-white font-medium text-sm">{fb.student}</div>
                                            <div className="text-gray-500 text-xs">{fb.time} · {fb.topic}</div>
                                        </div>
                                        <div className="text-orange-400 text-xs font-mono">{fb.remaining} left</div>
                                        <Link href="/feedback" className="px-3 py-1.5 rounded-lg text-xs font-medium text-orange-300 transition hover:bg-orange-500/10" style={{ border: '1px solid rgba(249,115,22,0.2)' }}>
                                            Write Feedback
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Earning Chart (placeholder) */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <BarChart3 size={18} className="text-green-400" />
                                Monthly Earnings
                            </h2>
                            <div className="flex items-end gap-2 h-40">
                                {[65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 88, 78].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <div
                                            className="w-full rounded-t-md transition-all"
                                            style={{
                                                height: `${h}%`,
                                                background: i === 11 ? 'linear-gradient(180deg, #6C5CE7, #A29BFE)' : 'rgba(108,92,231,0.2)',
                                            }}
                                        />
                                        <span className="text-[9px] text-gray-600">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Messages */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <MessageCircle size={18} className="text-cyan-400" />
                                    Messages
                                </h3>
                                <Link href="/messages" className="text-purple-400 text-sm hover:text-purple-300 transition">View All</Link>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Sarah M.', msg: '감사합니다 선생님! 😊', time: '2:30 PM', unread: true },
                                    { name: 'Yuki T.', msg: '오늘 수업 기대돼요!', time: '1:00 PM', unread: true },
                                    { name: 'Carlos R.', msg: 'Can we review last week...', time: '11:30 AM', unread: false },
                                ].map((msg, i) => (
                                    <Link key={i} href="/messages" className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(108,92,231,0.15)' }}>
                                            {msg.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between">
                                                <span className="text-white text-sm font-medium">{msg.name}</span>
                                                <span className="text-gray-500 text-[10px]">{msg.time}</span>
                                            </div>
                                            <p className="text-gray-500 text-xs truncate">{msg.msg}</p>
                                        </div>
                                        {msg.unread && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#6C5CE7' }} />}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Student List */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Users size={18} className="text-purple-400" />
                                My Students
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { name: 'Sarah M.', level: 2, lessons: 12, lastLesson: 'Today' },
                                    { name: 'James K.', level: 3, lessons: 24, lastLesson: 'Today' },
                                    { name: 'Yuki T.', level: 1, lessons: 5, lastLesson: '3 days ago' },
                                    { name: 'Carlos R.', level: 2, lessons: 8, lastLesson: '1 week ago' },
                                    { name: 'Emma L.', level: 4, lessons: 42, lastLesson: 'Tomorrow' },
                                ].map((student, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.3), rgba(162,155,254,0.2))' }}>
                                            {student.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white text-sm font-medium">{student.name}</div>
                                            <div className="text-gray-500 text-xs">Lvl {student.level} · {student.lessons} lessons · {student.lastLesson}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-green-400" />
                                This Week
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-400"><span>Lessons Taught</span><span className="text-white font-medium">18</span></div>
                                <div className="flex justify-between text-gray-400"><span>Hours Teaching</span><span className="text-white font-medium">12.5h</span></div>
                                <div className="flex justify-between text-gray-400"><span>New Students</span><span className="text-white font-medium">3</span></div>
                                <div className="flex justify-between text-gray-400"><span>Earnings</span><span className="text-green-400 font-medium">$620</span></div>
                                <div className="flex justify-between text-gray-400"><span>Avg Rating</span><span className="text-yellow-400 font-medium">4.9 ⭐</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
