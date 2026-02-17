'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth';
import { Mail, Lock, Eye, EyeOff, Chrome } from 'lucide-react';

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
                setError('Invalid email or password');
            } else if (message.includes('too-many-requests')) {
                setError('Too many attempts. Please try again later.');
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
                setError('Popup was closed. Please try again.');
            } else if (message.includes('popup-blocked')) {
                setError('Popup was blocked. Please allow popups for this site.');
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link href="/" className="inline-block">
                    <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>통</div>
                </Link>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400">다시 만나서 반가워요! 🎉</p>
            </div>

            <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium transition-all hover:opacity-90 disabled:opacity-50 mb-6" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <Chrome size={20} /> Continue with Google
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                    <span className="text-gray-500 text-sm">or</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }} required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }} required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    {error && <div className="text-red-400 text-sm bg-red-400/10 rounded-lg p-3">{error}</div>}
                    <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-400">
                    <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300 transition">Forgot password?</Link>
                </div>
            </div>

            <p className="text-center text-gray-400 mt-6 text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition">Sign Up Free</Link>
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1040 50%, #0a0a1a 100%)' }}>
            <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
