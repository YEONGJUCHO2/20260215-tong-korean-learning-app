'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { ArrowLeft, ArrowRight, Check, Globe, Sparkles, Target, Calendar, Music, User } from 'lucide-react';

const STEPS = [
    { id: 1, label: 'Language', icon: Globe },
    { id: 2, label: 'Basic Info', icon: User },
    { id: 3, label: 'Level', icon: Sparkles },
    { id: 4, label: 'Interests', icon: Music },
    { id: 5, label: 'Goals', icon: Target },
    { id: 6, label: 'Schedule', icon: Calendar },
];

const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
    { code: 'es', label: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', label: 'French', flag: '🇫🇷' },
    { code: 'vi', label: 'Vietnamese', flag: '🇻🇳' },
    { code: 'th', label: 'Thai', flag: '🇹🇭' },
    { code: 'id', label: 'Indonesian', flag: '🇮🇩' },
];

const KPOP_ARTISTS = ['BTS', 'BLACKPINK', 'Stray Kids', 'NewJeans', 'aespa', 'TWICE', 'EXO', 'IVE', 'SEVENTEEN', 'Red Velvet', 'NCT', '(G)I-DLE'];
const KDRAMAS = ['Squid Game', 'Crash Landing on You', 'Goblin', 'Reply 1988', 'Vincenzo', 'All of Us Are Dead', 'My Love from the Star', 'Itaewon Class', 'True Beauty', 'Start-Up'];
const GOALS = ['Daily Conversation', 'Business Korean', 'K-POP Lyrics', 'K-Drama Understanding', 'Travel Korean', 'Academic Korean', 'Making Korean Friends', 'Job Interview Prep'];
const TIMESLOTS = ['Morning (6-9)', 'Late Morning (9-12)', 'Afternoon (12-15)', 'Late Afternoon (15-18)', 'Evening (18-21)', 'Night (21-24)'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function OnboardingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const arr = (prev as any)[field] as string[];
            return {
                ...prev,
                [field]: arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value],
            };
        });
    };

    const handleComplete = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userRef = doc(db, 'profiles', user.uid);
            await updateDoc(userRef, {
                ...formData,
                onboardingCompleted: true,
                updatedAt: new Date(),
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Error saving onboarding data:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, STEPS.length));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F6FA]">
            <div className="w-full md:w-[850px]">
                {/* Progress Header */}
                <div className="bg-white rounded-[2rem] p-6 mb-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center px-4 relative">
                        {/* Progress Bar Background */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0 rounded-full mx-8" />

                        {/* Active Progress Line */}
                        <div
                            className="absolute top-1/2 left-0 h-1 bg-purple-600 -z-0 rounded-full mx-8 transition-all duration-500 ease-out"
                            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 96}%` }}
                        />

                        {STEPS.map((s) => {
                            const Icon = s.icon;
                            const isActive = s.id === step;
                            const isCompleted = s.id < step;

                            return (
                                <div key={s.id} className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isActive
                                            ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200 scale-110'
                                            : isCompleted
                                                ? 'bg-purple-600 border-purple-600 text-white'
                                                : 'bg-white border-gray-200 text-gray-400'
                                            }`}
                                    >
                                        <Icon size={18} />
                                    </div>
                                    <span className={`absolute -bottom-6 text-[10px] font-bold whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-purple-600' : 'text-gray-400'
                                        }`}>
                                        {s.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Card - Fixed Height */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-purple-900/5 border border-gray-100 h-[750px] flex flex-col relative overflow-hidden transition-all duration-300">

                    <div className="flex-1 overflow-y-auto scrollbar-hide px-1">
                        {/* Step Titles */}
                        <div className="text-center mb-10">
                            {step === 1 && <h2 className="text-3xl font-extrabold text-gray-800">Which language do you speak? 🌍</h2>}
                            {step === 2 && <h2 className="text-3xl font-extrabold text-gray-800">Tell us a bit about you 👤</h2>}
                            {step === 3 && <h2 className="text-3xl font-extrabold text-gray-800">What's your Korean level? 📊</h2>}
                            {step === 4 && <h2 className="text-3xl font-extrabold text-gray-800">What do you love? 💖</h2>}
                            {step === 5 && <h2 className="text-3xl font-extrabold text-gray-800">Your Main Goal 🎯</h2>}
                            {step === 6 && <h2 className="text-3xl font-extrabold text-gray-800">When can you learn? 📅</h2>}
                            <p className="text-gray-500 mt-2 font-medium">Step {step} of {STEPS.length}</p>
                        </div>

                        {/* Step 1: Language */}
                        {step === 1 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => setFormData({ ...formData, nativeLanguage: lang.code })}
                                        className={`group relative p-6 rounded-3xl transition-all duration-300 border-2 flex flex-col items-center gap-3 ${formData.nativeLanguage === lang.code
                                            ? 'bg-purple-50 border-purple-600 shadow-xl shadow-purple-100 transform -translate-y-1'
                                            : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-lg hover:-translate-y-0.5'
                                            }`}
                                    >
                                        <span className="text-5xl drop-shadow-sm">{lang.flag}</span>
                                        <span className={`font-bold text-lg ${formData.nativeLanguage === lang.code ? 'text-purple-700' : 'text-gray-600'}`}>
                                            {lang.label.split(' ')[0]}
                                        </span>
                                        {formData.nativeLanguage === lang.code && (
                                            <div className="absolute top-3 right-3 text-purple-600 bg-white rounded-full p-1 shadow-sm">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Nationality */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">Where are you from?</label>
                                    <input
                                        type="text"
                                        value={formData.nationality}
                                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                        placeholder="e.g. South Korea"
                                        className="w-full h-16 px-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-purple-500 text-lg font-bold text-gray-900 placeholder-gray-400 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Level */}
                        {step === 3 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { level: 'beginner', emoji: '🌱', title: 'Complete Beginner', desc: 'New to Korean' },
                                    { level: 'basic', emoji: '🌿', title: 'Basic', desc: 'Can read Hangul' },
                                    { level: 'intermediate', emoji: '🌳', title: 'Intermediate', desc: 'Daily conversation' },
                                    { level: 'advanced', emoji: '🌺', title: 'Advanced', desc: 'Fluent/Native' },
                                ].map((item) => (
                                    <button
                                        key={item.level}
                                        onClick={() => setFormData({ ...formData, koreanLevel: item.level })}
                                        className={`p-6 rounded-3xl text-left transition-all duration-300 border-2 flex items-start gap-4 ${formData.koreanLevel === item.level
                                            ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-200 transform scale-[1.02]'
                                            : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-lg'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${formData.koreanLevel === item.level ? 'bg-white/20' : 'bg-green-50'
                                            }`}>
                                            {item.emoji}
                                        </div>
                                        <div>
                                            <div className={`font-bold text-lg mb-1 ${formData.koreanLevel === item.level ? 'text-white' : 'text-gray-900'}`}>{item.title}</div>
                                            <div className={`text-sm font-medium ${formData.koreanLevel === item.level ? 'text-purple-100' : 'text-gray-400'}`}>{item.desc}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 4: Interests */}
                        {step === 4 && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Favorite Artists</h3>
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                                        {KPOP_ARTISTS.map((artist) => (
                                            <button
                                                key={artist}
                                                onClick={() => toggleSelection('kpop', artist)}
                                                className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border-2 ${formData.kpop.includes(artist)
                                                    ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                                                    : 'bg-white border-gray-100 text-gray-500 hover:border-purple-200 hover:text-purple-600'
                                                    }`}
                                            >
                                                {artist}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Favorite Dramas</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {KDRAMAS.map((drama) => (
                                            <button
                                                key={drama}
                                                onClick={() => toggleSelection('kdramas', drama)}
                                                className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 truncate ${formData.kdramas.includes(drama)
                                                    ? 'bg-pink-500 border-pink-500 text-white shadow-md'
                                                    : 'bg-white border-gray-100 text-gray-500 hover:border-pink-200 hover:text-pink-500'
                                                    }`}
                                            >
                                                {drama}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Goals */}
                        {step === 5 && (
                            <div className="grid grid-cols-2 gap-4">
                                {GOALS.map((goal) => (
                                    <button
                                        key={goal}
                                        onClick={() => toggleSelection('goals', goal)}
                                        className={`p-6 rounded-3xl text-left transition-all border-2 h-auto flex flex-col justify-between ${formData.goals.includes(goal)
                                            ? 'bg-gradient-to-br from-violet-500 to-fuchsia-600 border-transparent text-white shadow-xl'
                                            : 'bg-white border-gray-100 hover:border-purple-200 text-gray-600'
                                            }`}
                                    >
                                        <div className={`mb-4 w-10 h-10 rounded-full flex items-center justify-center ${formData.goals.includes(goal) ? 'bg-white/20' : 'bg-gray-100'
                                            }`}>
                                            <Target size={20} />
                                        </div>
                                        <span className="font-bold text-lg leading-tight">{goal}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 6: Schedule */}
                        {step === 6 && (
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-4">Preferred Days</label>
                                    <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                                        {DAYS.map((day) => (
                                            <button
                                                key={day}
                                                onClick={() => toggleSelection('preferredDays', day)}
                                                className={`min-w-[50px] h-[50px] md:h-[60px] md:min-w-[60px] rounded-2xl text-sm md:text-base font-bold transition-all border-2 flex items-center justify-center ${formData.preferredDays.includes(day)
                                                    ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600'
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-4">Preferred Time</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {TIMESLOTS.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => toggleSelection('preferredTimes', time)}
                                                className={`py-4 px-4 rounded-2xl text-sm font-bold transition-all border-2 ${formData.preferredTimes.includes(time)
                                                    ? 'bg-purple-50 border-purple-600 text-purple-700 shadow-sm'
                                                    : 'bg-white border-gray-100 text-gray-500 hover:text-gray-900 hover:border-purple-200'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Navigation */}
                    <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                        {step > 1 ? (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeft size={20} /> Back
                            </button>
                        ) : (
                            <div />
                        )}

                        <button
                            onClick={step === STEPS.length ? handleComplete : nextStep}
                            disabled={loading}
                            className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold shadow-xl shadow-purple-200 transition-all hover:scale-105 active:scale-95 ${loading
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                                }`}
                        >
                            {loading ? 'Setting up...' : step === STEPS.length ? 'Start Journey 🚀' : 'Next'}
                            {!loading && step < STEPS.length && <ArrowRight size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
