'use client';

import Link from 'next/link';
import { Calendar, Clock, DollarSign, Users, Star, TrendingUp, MessageCircle, BookOpen, ChevronRight, Video, CheckCircle2, AlertCircle, BarChart3, Settings } from 'lucide-react';

export default function TeacherDashboardPage() {
    return (
        <div className="min-h-screen px-4 py-8 bg-[#F5F6FA]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard 👩‍🏫</h1>
                        <p className="text-gray-500 mt-1">Welcome back, Min-ji!</p>
                    </div>
                    <Link href="/teachers/settings" className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:border-purple-200 hover:text-purple-600 transition shadow-sm flex items-center gap-2">
                        <Settings size={16} /> Settings
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {[
                        { icon: <Users size={22} className="text-purple-600" />, value: '89', label: 'Active Students', change: '+5 this week', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-900' },
                        { icon: <Calendar size={22} className="text-cyan-600" />, value: '1,240', label: 'Total Lessons', change: '+18 this month', bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-900' },
                        { icon: <DollarSign size={22} className="text-green-600" />, value: '$2,480', label: 'This Month', change: '+12% vs last', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-900' },
                        { icon: <Star size={22} className="text-amber-500" />, value: '4.9', label: 'Average Rating', change: '127 reviews', bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-900' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.border} border`}>
                                {stat.icon}
                            </div>
                            <div className={`text-3xl font-bold ${stat.text} mb-1`}>{stat.value}</div>
                            <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
                            <div className="text-gray-400 text-xs mt-2 font-medium bg-gray-50 inline-block px-2 py-1 rounded-lg border border-gray-100">{stat.change}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        {/* Today's Schedule */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Calendar size={20} /></div>
                                    Today&apos;s Schedule
                                </h2>
                                <Link href="/schedule" className="text-purple-600 text-sm font-bold hover:text-purple-800 flex items-center gap-1 transition hover:underline">
                                    Full Calendar <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { time: '10:00 AM', student: 'Sarah M.', level: 'Level 2', topic: 'K-POP Lyrics - BTS Butter', duration: '30 min', status: 'completed' },
                                    { time: '11:00 AM', student: 'James K.', level: 'Level 3', topic: 'Business Korean - Meeting Phrases', duration: '50 min', status: 'completed' },
                                    { time: '3:00 PM', student: 'Yuki T.', level: 'Level 1', topic: 'Hangul Pronunciation Basics', duration: '30 min', status: 'upcoming' },
                                    { time: '7:00 PM', student: 'Carlos R.', level: 'Level 2', topic: 'K-Drama Dialogue Practice', duration: '30 min', status: 'upcoming' },
                                    { time: '8:30 PM', student: 'Emma L.', level: 'Level 4', topic: 'Free Conversation - News Topics', duration: '50 min', status: 'upcoming' },
                                ].map((lesson, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl transition-all border ${lesson.status === 'upcoming'
                                            ? 'bg-purple-50/50 border-purple-100 hover:border-purple-200'
                                            : 'bg-white border-gray-100 opacity-75 hover:opacity-100'
                                            }`}
                                    >
                                        <div className="text-sm font-bold text-gray-500 w-24 flex-shrink-0 flex items-center gap-2">
                                            <Clock size={14} /> {lesson.time}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-gray-900 font-bold text-base">{lesson.student}</span>
                                                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">{lesson.level}</span>
                                            </div>
                                            <div className="text-gray-500 text-sm font-medium">{lesson.topic} · <span className="text-gray-400">{lesson.duration}</span></div>
                                        </div>
                                        {lesson.status === 'completed' ? (
                                            <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 self-start sm:self-center">
                                                <CheckCircle2 size={16} /> Completed
                                            </div>
                                        ) : (
                                            <Link href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200 transition-all self-start sm:self-center">
                                                <Video size={16} /> Join Class
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Feedback */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="p-2 bg-orange-100 rounded-lg text-orange-500"><AlertCircle size={20} /></div>
                                Pending Feedback
                                <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-orange-600 bg-orange-100 border border-orange-200">2 Actions</span>
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { student: 'Sarah M.', time: 'Today 10:00 AM', topic: 'K-POP Lyrics', remaining: '8:42' },
                                    { student: 'James K.', time: 'Today 11:00 AM', topic: 'Business Korean', remaining: '5:18' },
                                ].map((fb, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-orange-50/50 border border-orange-100 hover:bg-orange-50 transition-colors">
                                        <div className="flex-1 w-full sm:w-auto">
                                            <div className="text-gray-900 font-bold text-sm mb-1">{fb.student}</div>
                                            <div className="text-gray-500 text-xs font-medium">{fb.time} · {fb.topic}</div>
                                        </div>
                                        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                                            <div className="text-orange-500 text-xs font-bold bg-white px-2 py-1 rounded-lg border border-orange-100 shadow-sm">{fb.remaining} left</div>
                                            <Link href="/feedback" className="px-4 py-2 rounded-xl text-sm font-bold text-orange-600 bg-white border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition shadow-sm whitespace-nowrap">
                                                Write Feedback
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Earnings Chart (Simplified Visual) */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600"><BarChart3 size={20} /></div>
                                Monthly Earnings
                            </h2>
                            <div className="flex items-end gap-2 sm:gap-4 h-48 pt-4">
                                {[65, 45, 80, 55, 70, 90, 60, 85, 75, 95, 88, 78].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="relative w-full flex justify-center">
                                            <div
                                                className={`w-full max-w-[24px] rounded-t-lg transition-all duration-300 ${i === 11 ? 'bg-purple-600 shadow-lg shadow-purple-200 scale-105' : 'bg-purple-100 group-hover:bg-purple-300'}`}
                                                style={{ height: `${h * 1.5}px` }}
                                            />
                                        </div>
                                        <span className={`text-[10px] font-bold ${i === 11 ? 'text-purple-700' : 'text-gray-400'}`}>
                                            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Recent Messages */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <MessageCircle size={18} className="text-gray-400" />
                                    Messages
                                </h3>
                                <Link href="/messages" className="text-purple-600 text-xs font-bold uppercase tracking-wide hover:underline">View All</Link>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { name: 'Sarah M.', msg: '감사합니다 선생님! 😊', time: '2:30 PM', unread: true, initial: 'S', color: 'bg-pink-100 text-pink-600' },
                                    { name: 'Yuki T.', msg: '오늘 수업 기대돼요!', time: '1:00 PM', unread: true, initial: 'Y', color: 'bg-blue-100 text-blue-600' },
                                    { name: 'Carlos R.', msg: 'Can we review last week...', time: '11:30 AM', unread: false, initial: 'C', color: 'bg-amber-100 text-amber-600' },
                                ].map((msg, i) => (
                                    <Link key={i} href="/messages" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${msg.color}`}>
                                            {msg.initial}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <span className="text-gray-900 text-sm font-bold group-hover:text-purple-700 transition-colors">{msg.name}</span>
                                                <span className="text-gray-400 text-[10px] font-medium">{msg.time}</span>
                                            </div>
                                            <p className="text-gray-500 text-xs truncate">{msg.msg}</p>
                                        </div>
                                        {msg.unread && <div className="w-2.5 h-2.5 rounded-full bg-purple-600 ring-2 ring-white" />}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Student List */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Users size={18} className="text-gray-400" />
                                My Students
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Sarah M.', level: 2, lessons: 12, lastLesson: 'Today' },
                                    { name: 'James K.', level: 3, lessons: 24, lastLesson: 'Today' },
                                    { name: 'Yuki T.', level: 1, lessons: 5, lastLesson: '3 days ago' },
                                    { name: 'Carlos R.', level: 2, lessons: 8, lastLesson: '1 week ago' },
                                    { name: 'Emma L.', level: 4, lessons: 42, lastLesson: 'Tomorrow' },
                                ].map((student, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-sm hover:border-purple-100 transition group">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-purple-700 bg-purple-100">
                                            {student.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-gray-900 text-sm font-bold group-hover:text-purple-700 transition-colors">{student.name}</div>
                                            <div className="text-gray-400 text-xs font-medium">Lvl {student.level} · {student.lessons} lessons</div>
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded border border-gray-100">{student.lastLesson}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-500/20">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 opacity-90">
                                <TrendingUp size={18} className="text-purple-200" />
                                This Week
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center border-b border-white/10 pb-3"><span className="text-purple-100">Lessons Taught</span><span className="text-white font-bold text-lg">18</span></div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-3"><span className="text-purple-100">Hours Teaching</span><span className="text-white font-bold text-lg">12.5h</span></div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-3"><span className="text-purple-100">New Students</span><span className="text-white font-bold text-lg">3</span></div>
                                <div className="flex justify-between items-center border-b border-white/10 pb-3"><span className="text-purple-100">Earnings</span><span className="text-green-300 font-bold text-lg">$620</span></div>
                                <div className="flex justify-between items-center pt-1"><span className="text-purple-100">Avg Rating</span><span className="text-yellow-300 font-bold text-lg">4.9 ⭐</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
