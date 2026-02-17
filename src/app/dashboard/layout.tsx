'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, MessageCircle, Users, Gamepad2, User, Settings } from 'lucide-react';

import { useTranslations } from 'next-intl';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const t = useTranslations('nav');

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: t('dashboard'), href: '/dashboard' },
        { icon: <BookOpen size={20} />, label: t('myLessons'), href: '/lessons' },
        { icon: <MessageCircle size={20} />, label: t('messages'), href: '/messages' },
        { icon: <Users size={20} />, label: t('community'), href: '/community' },
        { icon: <Gamepad2 size={20} />, label: t('myAvatar'), href: '/avatar' },
        { icon: <User size={20} />, label: t('profile'), href: '/profile' },
        { icon: <Settings size={20} />, label: t('settings'), href: '/settings' },
    ];

    return (
        <div className="flex min-h-screen pt-20 gap-8 container-width relative z-10">
            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-28 space-y-6">
                    {/* User Profile Summary */}
                    <div className="glass-card p-5 mb-6 flex items-center gap-4 border-purple-100 bg-white/80 shadow-md shadow-purple-500/5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
                            ME
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-base font-bold text-gray-900 truncate">My Account</div>
                            <div className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-purple-100">PRO Plan</div>
                        </div>
                    </div>

                    <nav className="space-y-1.5">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${isActive
                                        ? 'bg-purple-50 text-purple-700 shadow-sm border border-purple-100'
                                        : 'text-gray-500 hover:text-purple-600 hover:bg-white hover:shadow-sm hover:border-transparent'
                                        }`}
                                >
                                    <span className={`transition-colors ${isActive ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-500'}`}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Quick Stats Widget */}
                    <div className="glass-card p-5 bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white mt-6 shadow-xl shadow-purple-500/20 border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500" />

                        <h4 className="text-xs font-bold text-purple-100 mb-2 uppercase tracking-wider relative z-10">Weekly Challenge 🏆</h4>
                        <p className="text-sm font-medium text-white/90 mb-4 relative z-10 leading-snug">Speak 30 mins to earn a new Badge!</p>

                        <div className="relative z-10">
                            <div className="flex justify-between text-xs font-medium text-white/80 mb-1.5">
                                <span>Progress</span>
                                <span>67%</span>
                            </div>
                            <div className="h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                                <div className="h-full bg-white w-2/3 shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
                            </div>
                            <div className="text-right text-[10px] font-medium text-purple-100 mt-1.5 opacity-80">20/30 min</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 pb-20 pt-4">
                {children}
            </main>
        </div>
    );
}
