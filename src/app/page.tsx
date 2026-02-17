'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, Music, MessageCircle, Gamepad2, Brain, Star, Globe, BookOpen, Crown } from 'lucide-react';

export default function LandingPage() {
  const t = useTranslations('landing');

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#F5F6FA] font-sans text-gray-900">

      {/* Navbar Placeholder (Navbar is fixed, so we just need padding) */}
      <div className="h-20" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center relative container-width pt-10 pb-20 md:pt-20">

        {/* Background Decorative Circles */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] border border-gray-200 rounded-full opacity-50 pointer-events-none hidden md:block translate-x-1/3" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] border border-gray-200 rounded-full opacity-50 pointer-events-none hidden md:block translate-x-1/3" />

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Column: Text */}
          <div className="max-w-2xl animate-fade-in-up">

            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wider uppercase mb-8 shadow-sm">
              <Music size={14} className="fill-purple-700" />
              {t('newFeatureBadge')}
            </div>

            {/* Hero Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-8">
              <span className="block text-gray-900">{t('heroTitle1')}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500 mt-2">
                {t('heroTitle2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
              {t('heroSubtitle')}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-1 text-center">
                {t('heroCta')}
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 font-bold rounded-2xl transition-all hover:bg-gray-50 text-center">
                {t('howItWorks')}
              </Link>
            </div>



          </div>

          {/* Right Column: 3D Visuals */}
          <div className="relative h-[600px] flex items-center justify-center animate-float hidden md:flex">

            {/* Main Phone Card */}
            <div className="relative w-80 h-[480px] bg-gradient-to-br from-violet-500 to-purple-600 rounded-[40px] shadow-2xl shadow-purple-500/30 flex flex-col items-center justify-center text-white z-20 overflow-hidden border-8 border-white/20">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 border border-white/30 shadow-inner">
                <span className="text-4xl font-black tracking-tighter">통</span>
              </div>

              <h2 className="text-3xl font-extrabold mb-2 tracking-tight">TONG</h2>
              <p className="text-white/80 text-center text-sm px-8 leading-relaxed">
                The new standard for <br /> modern Korean fluency.
              </p>

              {/* Decorative app UI elements */}
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Card: Conversation */}
            <div className="absolute top-20 right-12 bg-white p-4 rounded-2xl shadow-lg shadow-gray-200/50 flex items-center gap-4 animate-bounce-slow z-30">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <MessageCircle size={24} className="fill-green-600/20" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Mode</div>
                <div className="font-bold text-gray-900">{t('feature1Title')}</div>
              </div>
            </div>

            {/* Floating Card: K-POP */}
            <div className="absolute top-40 left-0 bg-white p-4 rounded-2xl shadow-lg shadow-gray-200/50 flex items-center gap-4 animate-bounce-reverse z-30 transform -translate-x-8">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                <Music size={24} className="fill-pink-600/20" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Library</div>
                <div className="font-bold text-gray-900">{t('feature3Title')}</div>
              </div>
            </div>

            {/* Floating Card: AI Materials */}
            <div className="absolute bottom-20 left-10 bg-white p-4 rounded-2xl shadow-lg shadow-gray-200/50 flex items-center gap-4 animate-bounce-slow z-30 delay-700">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                <Brain size={24} className="fill-purple-600/20" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Smart Tech</div>
                <div className="font-bold text-gray-900">{t('feature2Title')}</div>
              </div>
            </div>

            {/* Floating Card: RPG Avatar */}
            <div className="absolute bottom-40 right-10 bg-white p-4 rounded-2xl shadow-lg shadow-gray-200/50 flex items-center gap-4 animate-bounce-reverse z-30 transform translate-x-8">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Gamepad2 size={24} className="fill-blue-600/20" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Feature</div>
                <div className="font-bold text-gray-900">{t('feature4Title')}</div>
              </div>
            </div>

          </div>
        </div>
      </main>



    </div>
  );
}
