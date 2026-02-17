'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth';
import { Menu, X, Bell, MessageCircle, ChevronDown, LogOut, User as UserIcon, Globe, Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale();
  const t = useTranslations('nav');

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
      router.push('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isLoggedIn = !loading && !!user;
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Learner';
  // Check for landing page (root or locale roots), handling potential trailing slashes
  const isLandingPage = !pathname || pathname === '/' ||
    pathname === '/en' || pathname === '/ko' ||
    pathname === '/en/' || pathname === '/ko/';

  const navLinks = isLoggedIn ? [
    { label: t('dashboard'), href: '/dashboard' },
    { label: t('findTeachers'), href: '/teachers' },
    { label: t('community'), href: '/community' },
    { label: t('aiChat'), href: '/messages' },
  ] : isLandingPage ? [] : [
    { label: t('findTeachers'), href: '/teachers' },
    { label: t('howItWorks'), href: '/#how-it-works' },
    { label: t('community'), href: '/community' },
    { label: t('pricing'), href: '/#pricing' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">


          {/* Logo */}

          {/* Logo */}
          <div
            onClick={() => {
              console.log('Logo clicked');
              router.push(isLoggedIn ? '/dashboard' : '/');
            }}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 z-50 pointer-events-auto"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30">
              T
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">TONG</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200 hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 bg-gray-100/50 hover:bg-gray-100 rounded-full px-3 py-1.5 border border-transparent hover:border-purple-200 transition-all cursor-pointer group/lang"
              >
                <Globe size={16} className="text-gray-500 group-hover/lang:text-purple-600" />
                <span className="text-xs font-bold text-gray-700 group-hover/lang:text-purple-700 uppercase">{currentLocale}</span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl shadow-purple-500/10 border border-gray-100 overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between group transition-colors"
                  >
                    <span className={`font-medium group-hover:text-purple-700 ${currentLocale === 'en' ? 'text-purple-700 font-bold' : 'text-gray-700'}`}>English</span>
                    {currentLocale === 'en' && <Check size={14} className="text-purple-600" />}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('ko')}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50 hover:text-purple-700 flex items-center justify-between group transition-colors"
                  >
                    <span className={`font-medium group-hover:text-purple-700 ${currentLocale === 'ko' ? 'text-purple-700 font-bold' : 'text-gray-700'}`}>한국어</span>
                    {currentLocale === 'ko' && <Check size={14} className="text-purple-600" />}
                  </button>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-2">
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <Link href="/messages" className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all">
                    <MessageCircle size={20} />
                  </Link>
                </div>

                {/* User Menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 bg-white border border-gray-200 rounded-full hover:shadow-md hover:border-purple-200 transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-gray-100 overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                        <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <Link href="/profile" className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors">
                        <UserIcon size={16} /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors border-t border-gray-50"
                      >
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1"
            >
              <span className="text-xs font-bold text-gray-700">{currentLocale.toUpperCase()}</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl animate-in fade-in slide-in-from-top-5">
          <div className="px-4 py-6 space-y-4">

            {/* Mobile Language Menu (If opened) */}
            {isLangMenuOpen && (
              <div className="mb-4 bg-gray-50 rounded-xl p-2 flex gap-2">
                <button onClick={() => handleLanguageChange('en')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${currentLocale === 'en' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500'}`}>English</button>
                <button onClick={() => handleLanguageChange('ko')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${currentLocale === 'ko' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500'}`}>한국어</button>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-sm">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{displayName}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-2 flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} /> Sign out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center px-4 py-3 rounded-xl border border-gray-200 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-center items-center px-4 py-3 rounded-xl bg-gray-900 text-white text-base font-semibold hover:bg-gray-800 shadow-lg shadow-purple-500/20 transition-all"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
