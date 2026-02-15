'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth';
import { Menu, X, Bell, MessageCircle, User, ChevronDown, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const isLoggedIn = !loading && !!user;

  const publicLinks = [
    { label: 'Find Teachers', href: '/teachers' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Community', href: '/community' },
    { label: 'Pricing', href: '/#pricing' },
  ];

  const loggedInLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Teachers', href: '/teachers' },
    { label: 'Community', href: '/community' },
    { label: 'AI Chat', href: '/ai-chat' },
  ];

  const userMenuLinks = [
    { label: '📊 Dashboard', href: '/dashboard' },
    { label: '🎮 Avatar', href: '/avatar' },
    { label: '🏆 Badges', href: '/badges' },
    { label: '📈 Levels', href: '/levels' },
    { label: '💬 Messages', href: '/messages' },
    { label: '⚙️ Settings', href: '/settings' },
  ];

  const navLinks = isLoggedIn ? loggedInLinks : publicLinks;

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    router.push('/');
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16" style={{ background: 'rgba(10,10,26,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-extrabold" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
            통
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">TONG</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <Link href="/notifications" className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
                <Bell size={18} />
              </Link>

              {/* Messages */}
              <Link href="/messages" className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
                <MessageCircle size={18} />
              </Link>

              {/* User Menu */}
              <div className="relative ml-2">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/5 transition">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                      {avatarLetter}
                    </div>
                  )}
                  <span className="text-sm text-gray-300 max-w-[100px] truncate hidden lg:block">{displayName}</span>
                  <ChevronDown size={12} className="text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute top-full mt-2 right-0 w-52 rounded-xl p-2 z-50" style={{ background: '#1a1a3a', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="px-3 py-2 mb-1">
                      <div className="text-white text-sm font-medium truncate">{displayName}</div>
                      <div className="text-gray-500 text-xs truncate">{user?.email}</div>
                    </div>
                    <hr className="border-white/5 my-1" />
                    {userMenuLinks.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setShowUserMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
                        {item.label}
                      </Link>
                    ))}
                    <hr className="border-white/5 my-1" />
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition flex items-center gap-2">
                      <LogOut size={14} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-white/5">
                Log In
              </Link>
              <Link href="/signup" className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 p-6 space-y-4" style={{ background: 'rgba(10,10,26,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="block text-gray-300 hover:text-white text-base font-medium py-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          {isLoggedIn && (
            <>
              <hr className="border-white/5" />
              {userMenuLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block text-gray-300 hover:text-white text-sm py-1.5 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </>
          )}
          <div className="flex gap-3 pt-4">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex-1 text-center py-2.5 rounded-xl text-red-300 font-medium flex items-center justify-center gap-2" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
                <LogOut size={16} /> Log Out
              </button>
            ) : (
              <>
                <Link href="/login" className="flex-1 text-center py-2.5 rounded-xl text-gray-300 font-medium" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  Log In
                </Link>
                <Link href="/signup" className="flex-1 text-center py-2.5 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
