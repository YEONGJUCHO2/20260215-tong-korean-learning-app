'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, Chrome, User } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: account, 2: role selection
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'student' | 'teacher' | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const supabase = createClient();

    const handleGoogleSignup = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?redirect=/onboarding`,
            },
        });
        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            return;
        }

        if (!role) {
            setError('Please select your role');
            return;
        }

        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    role: role,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/onboarding');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1040 50%, #0a0a1a 100%)' }}>
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                            통
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {step === 1 ? 'Create Account' : 'Choose Your Role'}
                    </h1>
                    <p className="text-gray-400">
                        {step === 1 ? '한국어 여행을 시작해요! 🚀' : '어떤 역할로 시작할까요?'}
                    </p>
                </div>

                {/* Signup Card */}
                <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {step === 1 ? (
                        <>
                            {/* Google Signup */}
                            <button
                                onClick={handleGoogleSignup}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 mb-6"
                                style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}
                            >
                                <Chrome size={20} />
                                Continue with Google
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
                                <span className="text-gray-500 text-sm">or</span>
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
                            </div>

                            <form onSubmit={handleEmailSignup} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Min. 6 characters"
                                            minLength={6}
                                            className="w-full pl-10 pr-12 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                                            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3">{error}</div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                    style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}
                                >
                                    Next →
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Step 2: Role Selection */
                        <form onSubmit={handleEmailSignup} className="space-y-4">
                            <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-white text-sm mb-2 transition">
                                ← Back
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Student Card */}
                                <button
                                    type="button"
                                    onClick={() => setRole('student')}
                                    className={`p-6 rounded-2xl text-center transition-all ${role === 'student' ? 'ring-2 ring-purple-500' : ''
                                        }`}
                                    style={{
                                        background: role === 'student' ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.05)',
                                        border: `1px solid ${role === 'student' ? 'rgba(108,92,231,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                    }}
                                >
                                    <div className="text-4xl mb-3">📚</div>
                                    <div className="text-white font-semibold mb-1">Student</div>
                                    <div className="text-gray-400 text-xs">Learn Korean with native teachers</div>
                                </button>

                                {/* Teacher Card */}
                                <button
                                    type="button"
                                    onClick={() => setRole('teacher')}
                                    className={`p-6 rounded-2xl text-center transition-all ${role === 'teacher' ? 'ring-2 ring-purple-500' : ''
                                        }`}
                                    style={{
                                        background: role === 'teacher' ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.05)',
                                        border: `1px solid ${role === 'teacher' ? 'rgba(108,92,231,0.5)' : 'rgba(255,255,255,0.1)'}`,
                                    }}
                                >
                                    <div className="text-4xl mb-3">👩‍🏫</div>
                                    <div className="text-white font-semibold mb-1">Teacher</div>
                                    <div className="text-gray-400 text-xs">Teach Korean to global students</div>
                                </button>
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3">{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !role}
                                className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}
                            >
                                {loading ? 'Creating account...' : 'Get Started 🚀'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Login link */}
                <p className="text-center text-gray-400 mt-6 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
