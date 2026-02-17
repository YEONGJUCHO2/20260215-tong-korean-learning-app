'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Mail, Lock, Eye, EyeOff, Chrome, User, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { user, signUpWithEmail, signInWithGoogle } = useAuth();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'student' | 'teacher' | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [googleSignedUp, setGoogleSignedUp] = useState(false);

    // Auto-redirect when user is detected after signup
    useEffect(() => {
        if (user && googleSignedUp) {
            router.push('/onboarding');
        }
    }, [user, googleSignedUp, router]);

    const handleGoogleSignup = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            setGoogleSignedUp(true);
            // useEffect will handle redirect once user state updates
        } catch (err: unknown) {
            console.error('Google signup error:', err);
            const message = err instanceof Error ? err.message : 'Google signup failed';
            if (message.includes('popup-closed-by-user')) {
                setError('로그인 창이 닫혔습니다. 다시 시도해주세요.');
            } else if (message.includes('popup-blocked')) {
                setError('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
            } else {
                setError(message);
            }
        } finally {
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
            setError('역할을 선택해주세요.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await signUpWithEmail(email, password, name);
            // Wait for auth state to update and profile to be created
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Update the role in the profile
            const { auth } = await import('@/lib/firebase/config');
            if (auth.currentUser) {
                await updateDoc(doc(db, 'profiles', auth.currentUser.uid), { role });
            }
            router.push(role === 'teacher' ? '/teacher-onboarding' : '/onboarding');
        } catch (err: unknown) {
            console.error('Signup error:', err);
            const message = err instanceof Error ? err.message : 'Signup failed';
            if (message.includes('email-already-in-use')) {
                setError('이미 가입된 이메일입니다. 로그인해주세요.');
            } else if (message.includes('weak-password')) {
                setError('비밀번호는 최소 6자 이상이어야 합니다.');
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md animate-fade-in-up px-4">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block transition-transform hover:scale-105">
                        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-tr from-violet-600 to-fuchsia-600 shadow-xl shadow-purple-500/30">
                            통
                        </div>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                        {step === 1 ? 'Create Account' : 'Choose Your Role'}
                    </h1>
                    <p className="text-gray-500 font-medium">
                        {step === 1 ? '한국어 여행을 시작해요! 🚀' : '어떤 역할로 시작할까요?'}
                    </p>
                </div>

                <div className="w-full">
                    {step === 1 ? (
                        <>
                            <button
                                onClick={handleGoogleSignup}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-medium transition-all hover:bg-gray-50 border border-gray-200 text-gray-700 disabled:opacity-50 mb-6 group bg-white"
                            >
                                <Chrome size={20} className="text-gray-500 group-hover:text-blue-500 transition-colors" />
                                Continue with Google
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-gray-400 text-sm font-medium">or</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            <form onSubmit={handleEmailSignup} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Min. 6 characters"
                                            minLength={6}
                                            className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2">
                                        <span className="mt-0.5">⚠️</span> {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl font-bold text-white transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 bg-purple-600"
                                >
                                    Next →
                                </button>
                            </form>
                        </>
                    ) : (
                        <form onSubmit={handleEmailSignup} className="space-y-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-gray-500 hover:text-gray-900 text-sm mb-2 transition flex items-center gap-1 font-medium"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setRole('student')}
                                    className={`p-6 rounded-2xl text-center transition-all border-2 ${role === 'student' ? 'border-purple-500 bg-purple-50 shadow-md transform -translate-y-1' : 'border-gray-100 bg-gray-50 hover:border-purple-200 hover:bg-white text-gray-400'}`}
                                >
                                    <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">📚</div>
                                    <div className={`font-bold mb-1 ${role === 'student' ? 'text-purple-700' : 'text-gray-700'}`}>Student</div>
                                    <div className="text-gray-500 text-xs font-medium">Learn Korean</div>
                                </button>

                                <button type="button" onClick={() => setRole('teacher')}
                                    className={`p-6 rounded-2xl text-center transition-all border-2 ${role === 'teacher' ? 'border-purple-500 bg-purple-50 shadow-md transform -translate-y-1' : 'border-gray-100 bg-gray-50 hover:border-purple-200 hover:bg-white text-gray-400'}`}
                                >
                                    <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">👩‍🏫</div>
                                    <div className={`font-bold mb-1 ${role === 'teacher' ? 'text-purple-700' : 'text-gray-700'}`}>Teacher</div>
                                    <div className="text-gray-500 text-xs font-medium">Teach Korean</div>
                                </button>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2">
                                    <span className="mt-0.5">⚠️</span> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || !role}
                                className="w-full py-4 rounded-xl font-bold text-white transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 bg-purple-600"
                            >
                                {loading ? 'Creating account...' : 'Get Started 🚀'}
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-gray-500 mt-8 text-sm font-medium">
                    Already have an account?{' '}
                    <Link href="/login" className="text-purple-600 hover:text-purple-700 font-bold transition hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
