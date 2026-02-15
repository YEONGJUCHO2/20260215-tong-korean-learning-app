import Link from 'next/link';
import { Mic, Music, Bot, Gamepad2, MessageCircle, Globe, BookOpen, Users, Sparkles, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#0a0a1a]">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1040 40%, #0d0d2b 100%)' }}>
        {/* BG Glow */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: '#6C5CE7' }} />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: '#FF6B9D' }} />

        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: 'rgba(108,92,231,0.15)', border: '1px solid rgba(108,92,231,0.3)', color: '#A29BFE' }}>
              🎵 K-POP · K-Drama · Korean Culture
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Speak Korean.
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #6C5CE7, #A29BFE, #FF6B9D)' }}>
                말이 통하다.
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              Learn Korean through K-Culture with native teachers. Conversation-focused lessons, RPG gamification, and AI-powered materials.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)', boxShadow: '0 8px 32px rgba(108,92,231,0.4)' }}
              >
                Start Learning — 50% Off First Class
                <ArrowRight size={20} />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:bg-white/10"
                style={{ color: '#A29BFE', border: '1px solid rgba(108,92,231,0.4)' }}
              >
                How It Works
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {['🧑‍🎓', '👩‍💼', '🧑‍💻', '👩‍🎤'].map((emoji, i) => (
                  <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(108,92,231,0.3)', border: '2px solid #1a1040' }}>
                    {emoji}
                  </div>
                ))}
              </div>
              <div className="text-gray-400 text-sm">
                Join <span className="text-white font-semibold">500+</span> learners
                <span className="text-yellow-400 ml-2">⭐ 4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right - Floating Card */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl p-8 animate-float" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(162,155,254,0.1))', border: '1px solid rgba(108,92,231,0.3)', backdropFilter: 'blur(20px)' }}>
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">통</div>
                <div className="text-2xl font-bold text-white">TONG</div>
                <div className="text-gray-400 text-sm">말이 통하다 · Language connects</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎤', label: 'Conversation' },
                  { icon: '🎵', label: 'K-POP' },
                  { icon: '🎮', label: 'RPG Avatar' },
                  { icon: '🤖', label: 'AI Materials' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-sm font-bold text-white animate-pulse" style={{ background: 'linear-gradient(135deg, #FF6B9D, #FF8E53)' }}>
              🔥 NEW
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 px-6" style={{ background: '#0d0d1f' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why TONG?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to speak Korean naturally — powered by culture and technology.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Mic className="text-purple-400" size={28} />, title: 'Conversation-First', desc: 'No boring textbooks. Learn through real conversations with native teachers.' },
              { icon: <Music className="text-pink-400" size={28} />, title: 'Learn with K-Culture', desc: 'K-POP lyrics, K-Drama scenes, and trending cultural content as learning material.' },
              { icon: <Bot className="text-cyan-400" size={28} />, title: 'AI-Powered Materials', desc: 'Custom lesson materials generated from your favorite K-Culture interests.' },
              { icon: <Gamepad2 className="text-orange-400" size={28} />, title: 'RPG Avatar System', desc: 'Earn points, level up avatars, and collect items. Learning = playing! 🎮' },
              { icon: <MessageCircle className="text-green-400" size={28} />, title: 'Real-Time Messenger', desc: 'Chat with teachers anytime. Practice Korean between lessons.' },
              { icon: <Globe className="text-blue-400" size={28} />, title: 'Global Community', desc: 'Connect with learners worldwide. Share, learn, grow together.' },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl transition-all hover:scale-[1.02] hover:border-purple-500/50 group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(108,92,231,0.1)' }}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #0d0d1f 0%, #0a0a1a 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Start speaking Korean in 3 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Create Your Profile', desc: 'Tell us your Korean level and K-Culture interests. We personalize your learning journey.', emoji: '✍️' },
              { num: '02', title: 'Book a Lesson', desc: 'Browse native teachers, pick your time slot, and book in seconds. Google Meet link auto-generated.', emoji: '📅' },
              { num: '03', title: 'Start Speaking', desc: 'Have fun conversations, earn points, level up your avatar, and track your progress!', emoji: '🗣️' },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                  {step.num}
                </div>
                <div className="text-3xl mb-3">{step.emoji}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-purple-500/30">
                    <ArrowRight size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6" style={{ background: '#0d0d1f' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-gray-400 text-lg">Pay per lesson. No hidden fees. Cancel anytime.</p>
          </div>

          {/* Per-lesson rates */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto">
            {[
              { duration: '10 min', price: '$5', desc: 'Quick chat', color: 'rgba(108,92,231,0.1)' },
              { duration: '20 min', price: '$10', desc: 'Focus session', color: 'rgba(108,92,231,0.1)' },
              { duration: '30 min', price: '$18', desc: 'Most popular', color: 'rgba(108,92,231,0.25)', popular: true },
              { duration: '50 min', price: '$28', desc: 'Deep dive', color: 'rgba(108,92,231,0.1)' },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl text-center relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
                style={{ background: plan.color, border: `1px solid ${plan.popular ? 'rgba(108,92,231,0.5)' : 'rgba(255,255,255,0.08)'}` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                    POPULAR
                  </div>
                )}
                <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                <div className="text-purple-300 font-medium">{plan.duration}</div>
                <div className="text-gray-500 text-xs mt-1">{plan.desc}</div>
              </div>
            ))}
          </div>

          {/* Membership tiers */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                desc: 'Get started',
                features: ['Community access', 'Browse teachers', 'Basic avatar', 'First lesson 50% off'],
                cta: 'Start Free',
                style: { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
              },
              {
                name: 'Basic',
                price: '$9.99',
                period: '/mo',
                desc: 'For active learners',
                features: ['Everything in Free', 'AI avatar chat (10/day)', 'Micro-learning quizzes', 'Recent 5 lesson archives', 'Points & badges'],
                cta: 'Get Basic',
                popular: true,
                style: { bg: 'rgba(108,92,231,0.15)', border: 'rgba(108,92,231,0.4)' },
              },
              {
                name: 'Premium',
                price: '$19.99',
                period: '/mo',
                desc: 'Unlimited everything',
                features: ['Everything in Basic', 'Unlimited AI chat', 'Full lesson archive', 'AI pronunciation check', 'Group lesson 10% off', 'Priority teacher matching'],
                cta: 'Go Premium',
                style: { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)' },
              },
            ].map((tier, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl relative ${tier.popular ? 'ring-2 ring-purple-500' : ''}`}
                style={{ background: tier.style.bg, border: `1px solid ${tier.style.border}` }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #6C5CE7, #FF6B9D)' }}>
                    ⭐ MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  {tier.period && <span className="text-gray-400 text-sm">{tier.period}</span>}
                </div>
                <p className="text-gray-400 text-sm mb-6">{tier.desc}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all hover:opacity-90 ${tier.popular ? 'text-white' : 'text-purple-300'
                    }`}
                  style={{
                    background: tier.popular ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(108,92,231,0.15)',
                    border: tier.popular ? 'none' : '1px solid rgba(108,92,231,0.3)',
                  }}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #6C5CE7 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to make<br />
            <span className="opacity-90">말이 통하다?</span>
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Your first lesson is 50% off. Start speaking Korean today.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{ background: 'white', color: '#6C5CE7' }}
          >
            Get Started Free 🚀
          </Link>
        </div>
      </section>
    </div>
  );
}
