'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth';
import { Mail, Lock, Eye, EyeOff, Chrome, ArrowLeft } from 'lucide-react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';
    const { user, signInWithEmail, signInWithGoogle } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Auto-redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push(redirect);
        }
    }, [user, router, redirect]);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmail(email, password);
            // Auth state listener will detect login and redirect via useEffect
        } catch (err: unknown) {
            console.error('Login error:', err);
            const message = err instanceof Error ? err.message : 'Login failed';
            if (message.includes('invalid-credential') || message.includes('user-not-found') || message.includes('wrong-password')) {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            } else if (message.includes('too-many-requests')) {
                setError('너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.');
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            // Auth state listener will detect login and redirect via useEffect
        } catch (err: unknown) {
            console.error('Google login error:', err);
            const message = err instanceof Error ? err.message : 'Google login failed';
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

    return (
        <div className="w-full max-w-md animate-fade-in-up px-4">
            <div className="text-center mb-8">
                <Link href="/" className="inline-block transition-transform hover:scale-105">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-tr from-violet-600 to-fuchsia-600 shadow-xl shadow-purple-500/30">
                        통
                    </div>
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-500">다시 만나서 반가워요! 🎉</p>
            </div>

            <div className="w-full">
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-medium transition-all hover:bg-gray-50 border border-gray-200 text-gray-700 disabled:opacity-50 mb-6 group bg-white"
                >
                    <Chrome size={20} className="text-gray-500 group-hover:text-blue-500 transition-colors" /> Continue with Google
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-gray-400 text-sm font-medium">or</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-4">
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
                                placeholder="••••••••"
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
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <Link href="/forgot-password" className="text-purple-600 hover:text-purple-700 font-semibold transition hover:underline">
                        Forgot password?
                    </Link>
                </div>
            </div>

            <p className="text-center text-gray-500 mt-8 text-sm font-medium">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-bold transition hover:underline">
                    Sign Up Free
                </Link>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Suspense fallback={<div className="text-purple-600 font-medium">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
