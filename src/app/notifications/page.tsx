'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Calendar, MessageCircle, Award, Check, X, Clock, Video, BookOpen, Star, Trash2 } from 'lucide-react';

const NOTIFICATIONS = [
    { id: 1, type: 'booking', icon: <Calendar size={16} className="text-purple-400" />, title: 'Lesson Confirmed!', desc: 'Your lesson with Min-ji Kim is confirmed for Feb 16 at 3:00 PM', time: '2m ago', read: false, action: '/teachers/1' },
    { id: 2, type: 'reminder', icon: <Clock size={16} className="text-orange-400" />, title: 'Lesson in 30 minutes', desc: 'Your lesson with Min-ji Kim starts at 3:00 PM. Get ready!', time: '30m ago', read: false, action: '/dashboard' },
    { id: 3, type: 'message', icon: <MessageCircle size={16} className="text-cyan-400" />, title: 'New message from Min-ji Kim', desc: '네, 다음 수업에서 그 표현 연습해요! 😊', time: '1h ago', read: false, action: '/messages' },
    { id: 4, type: 'achievement', icon: <Award size={16} className="text-yellow-400" />, title: 'Badge Earned: On Fire 🔥', desc: 'You completed a 7-day learning streak! +100 XP', time: '2h ago', read: true, action: '/badges' },
    { id: 5, type: 'feedback', icon: <Star size={16} className="text-yellow-400" />, title: 'Feedback received', desc: 'Min-ji Kim left feedback for your lesson. Check it out!', time: '3h ago', read: true, action: '/dashboard' },
    { id: 6, type: 'community', icon: <BookOpen size={16} className="text-green-400" />, title: 'Your post got 10 likes!', desc: '"오늘 BTS Butter 가사에서 배운 표현!" is trending', time: '5h ago', read: true, action: '/community' },
    { id: 7, type: 'reminder', icon: <Video size={16} className="text-purple-400" />, title: 'Lesson tomorrow', desc: 'Don\'t forget your lesson with Jun-ho Park tomorrow at 11 AM', time: '1d ago', read: true, action: '/dashboard' },
    { id: 8, type: 'achievement', icon: <Award size={16} className="text-yellow-400" />, title: 'Level Up! 🎉', desc: 'You\'ve reached Level 3 - 초중급! +200 TP', time: '2d ago', read: true, action: '/badges' },
    { id: 9, type: 'booking', icon: <Calendar size={16} className="text-red-400" />, title: 'Lesson Cancelled', desc: 'Your lesson with Soo-young Lee on Feb 14 was cancelled. Full refund applied.', time: '3d ago', read: true, action: '/dashboard' },
];

const FILTER_TABS = ['All', 'Unread', 'Bookings', 'Messages', 'Achievements'];

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));
    const markRead = (id: number) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));
    const deleteNotif = (id: number) => setNotifications(n => n.filter(x => x.id !== id));

    const unreadCount = notifications.filter(n => !n.read).length;

    const filtered = notifications.filter(n => {
        if (activeTab === 'Unread') return !n.read;
        if (activeTab === 'Bookings') return n.type === 'booking' || n.type === 'reminder';
        if (activeTab === 'Messages') return n.type === 'message';
        if (activeTab === 'Achievements') return n.type === 'achievement';
        return true;
    });

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-white">Notifications</h1>
                        {unreadCount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>{unreadCount}</span>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <button onClick={markAllRead} className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition">
                            <Check size={14} /> Mark all read
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {FILTER_TABS.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all" style={{ background: activeTab === tab ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)', border: `1px solid ${activeTab === tab ? 'transparent' : 'rgba(255,255,255,0.08)'}`, color: activeTab === tab ? 'white' : '#9ca3af' }}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Notification List */}
                <div className="space-y-2">
                    {filtered.map(notif => (
                        <div key={notif.id} className="group flex items-start gap-3 p-4 rounded-xl transition-all hover:bg-white/[0.02]" style={{ background: notif.read ? 'transparent' : 'rgba(108,92,231,0.05)', border: `1px solid ${notif.read ? 'rgba(255,255,255,0.04)' : 'rgba(108,92,231,0.1)'}` }}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                {notif.icon}
                            </div>
                            <Link href={notif.action} onClick={() => markRead(notif.id)} className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-medium ${notif.read ? 'text-gray-300' : 'text-white'}`}>{notif.title}</span>
                                    {!notif.read && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#6C5CE7' }} />}
                                </div>
                                <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{notif.desc}</p>
                                <span className="text-gray-600 text-[10px] mt-1 block">{notif.time}</span>
                            </Link>
                            <button onClick={() => deleteNotif(notif.id)} className="p-1 text-gray-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition flex-shrink-0">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <Bell size={40} className="text-gray-700 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-white mb-1">All caught up!</h3>
                        <p className="text-gray-500 text-sm">No notifications here</p>
                    </div>
                )}
            </div>
        </div>
    );
}
