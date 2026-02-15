'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, ChevronRight } from 'lucide-react';

const STEPS = [
    { id: 1, label: 'Basic Info', emoji: '👤' },
    { id: 2, label: 'Korean Level', emoji: '📊' },
    { id: 3, label: 'K-Culture', emoji: '🎵' },
    { id: 4, label: 'Goals', emoji: '🎯' },
    { id: 5, label: 'Schedule', emoji: '📅' },
];

const KPOP_ARTISTS = ['BTS', 'BLACKPINK', 'Stray Kids', 'NewJeans', 'aespa', 'TWICE', 'EXO', 'IVE', 'SEVENTEEN', 'Red Velvet', 'NCT', '(G)I-DLE'];
const KDRAMAS = ['Squid Game', 'Crash Landing on You', 'Goblin', 'Reply 1988', 'Vincenzo', 'All of Us Are Dead', 'My Love from the Star', 'Itaewon Class', 'True Beauty', 'Start-Up'];
const INTERESTS = ['Korean Food 🍜', 'Fashion 👗', 'Gaming 🎮', 'Travel ✈️', 'History 📜', 'Movies 🎬', 'Sports ⚽', 'Tech 💻'];
const GOALS = ['Daily Conversation', 'Business Korean', 'K-POP Lyrics', 'K-Drama Understanding', 'Travel Korean', 'Academic Korean', 'Making Korean Friends', 'Job Interview Prep'];
const STYLES = ['Free Conversation', 'Role Play', 'Topic Discussion', 'Shadowing', 'Textbook Study'];
const TIMESLOTS = ['Morning (6-9)', 'Late Morning (9-12)', 'Afternoon (12-15)', 'Late Afternoon (15-18)', 'Evening (18-21)', 'Night (21-24)'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nationality: '',
        nativeLanguage: '',
        koreanLevel: '',
        kpop: [] as string[],
        kdramas: [] as string[],
        otherInterests: [] as string[],
        goals: [] as string[],
        learningStyle: '',
        preferredDays: [] as string[],
        preferredTimes: [] as string[],
    });

    const toggleSelection = (field: string, value: string) => {
        setFormData((prev) => {
            const arr = prev[field as keyof typeof prev] as string[];
            return {
                ...prev,
                [field]: arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value],
            };
        });
    };

    const handleComplete = () => {
        // TODO: Supabase에 프로필 저장
        console.log('Onboarding data:', formData);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1040 50%, #0a0a1a 100%)' }}>
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400 text-sm">Step {step} of {STEPS.length}</span>
                        <span className="text-purple-400 text-sm font-medium">{Math.round((step / STEPS.length) * 100)}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${(step / STEPS.length) * 100}%`, background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }}
                        />
                    </div>
                    {/* Step Indicators */}
                    <div className="flex justify-between mt-4">
                        {STEPS.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-1">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${s.id < step
                                            ? 'text-white'
                                            : s.id === step
                                                ? 'text-white ring-2 ring-purple-500'
                                                : 'text-gray-600'
                                        }`}
                                    style={{
                                        background:
                                            s.id < step
                                                ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)'
                                                : s.id === step
                                                    ? 'rgba(108,92,231,0.3)'
                                                    : 'rgba(255,255,255,0.05)',
                                    }}
                                >
                                    {s.id < step ? <Check size={14} /> : s.emoji}
                                </div>
                                <span className={`text-xs hidden sm:block ${s.id === step ? 'text-purple-400' : 'text-gray-600'}`}>
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">About You 👤</h2>
                                <p className="text-gray-400">Tell us a bit about yourself</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nationality</label>
                                <input
                                    type="text"
                                    value={formData.nationality}
                                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                    placeholder="e.g. United States"
                                    className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Native Language</label>
                                <select
                                    value={formData.nativeLanguage}
                                    onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                    <option value="">Select language</option>
                                    <option value="en">English</option>
                                    <option value="zh">Chinese (中文)</option>
                                    <option value="ja">Japanese (日本語)</option>
                                    <option value="es">Spanish (Español)</option>
                                    <option value="fr">French (Français)</option>
                                    <option value="vi">Vietnamese (Tiếng Việt)</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Korean Level */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Your Korean Level 📊</h2>
                                <p className="text-gray-400">We&apos;ll personalize your experience</p>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { level: 'beginner', emoji: '🌱', title: 'Complete Beginner', desc: 'I know little to no Korean' },
                                    { level: 'basic', emoji: '🌿', title: 'Basic', desc: 'I can read Hangul and say simple phrases' },
                                    { level: 'intermediate', emoji: '🌳', title: 'Intermediate', desc: 'I can have simple daily conversations' },
                                    { level: 'advanced', emoji: '🌸', title: 'Advanced', desc: 'I can discuss most topics comfortably' },
                                    { level: 'fluent', emoji: '⭐', title: 'Near-Fluent', desc: 'I want to refine and perfect my Korean' },
                                ].map((item) => (
                                    <button
                                        key={item.level}
                                        onClick={() => setFormData({ ...formData, koreanLevel: item.level })}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${formData.koreanLevel === item.level ? 'ring-2 ring-purple-500' : ''
                                            }`}
                                        style={{
                                            background: formData.koreanLevel === item.level ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.05)',
                                            border: `1px solid ${formData.koreanLevel === item.level ? 'rgba(108,92,231,0.5)' : 'rgba(255,255,255,0.08)'}`,
                                        }}
                                    >
                                        <span className="text-2xl">{item.emoji}</span>
                                        <div>
                                            <div className="text-white font-semibold">{item.title}</div>
                                            <div className="text-gray-400 text-sm">{item.desc}</div>
                                        </div>
                                        {formData.koreanLevel === item.level && (
                                            <Check className="text-purple-400 ml-auto" size={20} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: K-Culture Interests */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">K-Culture Interests 🎵</h2>
                                <p className="text-gray-400">We&apos;ll use these to personalize your lessons!</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Favorite K-POP Artists</label>
                                <div className="flex flex-wrap gap-2">
                                    {KPOP_ARTISTS.map((artist) => (
                                        <button
                                            key={artist}
                                            onClick={() => toggleSelection('kpop', artist)}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                                            style={{
                                                background: formData.kpop.includes(artist) ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.07)',
                                                border: `1px solid ${formData.kpop.includes(artist) ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                                                color: formData.kpop.includes(artist) ? 'white' : '#9ca3af',
                                            }}
                                        >
                                            {formData.kpop.includes(artist) && '✓ '}{artist}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Favorite K-Dramas</label>
                                <div className="flex flex-wrap gap-2">
                                    {KDRAMAS.map((drama) => (
                                        <button
                                            key={drama}
                                            onClick={() => toggleSelection('kdramas', drama)}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                                            style={{
                                                background: formData.kdramas.includes(drama) ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.07)',
                                                border: `1px solid ${formData.kdramas.includes(drama) ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                                                color: formData.kdramas.includes(drama) ? 'white' : '#9ca3af',
                                            }}
                                        >
                                            {formData.kdramas.includes(drama) && '✓ '}{drama}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Other Interests</label>
                                <div className="flex flex-wrap gap-2">
                                    {INTERESTS.map((interest) => (
                                        <button
                                            key={interest}
                                            onClick={() => toggleSelection('otherInterests', interest)}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                                            style={{
                                                background: formData.otherInterests.includes(interest) ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.07)',
                                                border: `1px solid ${formData.otherInterests.includes(interest) ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                                                color: formData.otherInterests.includes(interest) ? 'white' : '#9ca3af',
                                            }}
                                        >
                                            {formData.otherInterests.includes(interest) && '✓ '}{interest}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Learning Goals */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Learning Goals 🎯</h2>
                                <p className="text-gray-400">What do you want to achieve?</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Goals (select all that apply)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {GOALS.map((goal) => (
                                        <button
                                            key={goal}
                                            onClick={() => toggleSelection('goals', goal)}
                                            className="px-4 py-3 rounded-xl text-sm font-medium text-left transition-all"
                                            style={{
                                                background: formData.goals.includes(goal) ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${formData.goals.includes(goal) ? 'rgba(108,92,231,0.5)' : 'rgba(255,255,255,0.08)'}`,
                                                color: formData.goals.includes(goal) ? '#A29BFE' : '#9ca3af',
                                            }}
                                        >
                                            {formData.goals.includes(goal) && '✓ '}{goal}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Learning Style</label>
                                <div className="flex flex-wrap gap-2">
                                    {STYLES.map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => setFormData({ ...formData, learningStyle: style })}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                                            style={{
                                                background: formData.learningStyle === style ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.07)',
                                                border: `1px solid ${formData.learningStyle === style ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                                                color: formData.learningStyle === style ? 'white' : '#9ca3af',
                                            }}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Schedule */}
                    {step === 5 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Your Schedule 📅</h2>
                                <p className="text-gray-400">When are you available for lessons?</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Days</label>
                                <div className="flex gap-2">
                                    {DAYS.map((day) => (
                                        <button
                                            key={day}
                                            onClick={() => toggleSelection('preferredDays', day)}
                                            className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                background: formData.preferredDays.includes(day) ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${formData.preferredDays.includes(day) ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                                                color: formData.preferredDays.includes(day) ? 'white' : '#9ca3af',
                                            }}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Time</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {TIMESLOTS.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => toggleSelection('preferredTimes', time)}
                                            className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                                            style={{
                                                background: formData.preferredTimes.includes(time) ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${formData.preferredTimes.includes(time) ? 'rgba(108,92,231,0.5)' : 'rgba(255,255,255,0.08)'}`,
                                                color: formData.preferredTimes.includes(time) ? '#A29BFE' : '#9ca3af',
                                            }}
                                        >
                                            {formData.preferredTimes.includes(time) && '✓ '}{time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {step > 1 ? (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl text-gray-400 hover:text-white transition-all"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < STEPS.length ? (
                            <button
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                                style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}
                            >
                                Next <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleComplete}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                                style={{ background: 'linear-gradient(135deg, #6C5CE7, #FF6B9D)' }}
                            >
                                Start Learning 🚀
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
