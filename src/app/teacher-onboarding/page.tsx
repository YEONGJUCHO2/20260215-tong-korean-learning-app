'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth'; // Firebase Auth
import { doc, updateDoc, setDoc } from 'firebase/firestore'; // Firestore utils
import { db } from '@/lib/firebase/config'; // Firebase DB instance
import { ArrowRight, ArrowLeft, Upload, Plus, X, CheckCircle2, GraduationCap, Clock, Globe, BookOpen } from 'lucide-react';

const SPECIALTIES = ['Conversation', 'K-POP', 'K-Drama', 'Business', 'TOPIK', 'Travel', 'Hangul Basics', 'Pronunciation', 'Gaming', 'Culture', 'Academic', 'Kids'];
const TIMEZONES = ['Asia/Seoul (KST)', 'America/New_York (EST)', 'America/Los_Angeles (PST)', 'Europe/London (GMT)', 'Asia/Tokyo (JST)', 'Australia/Sydney (AEST)'];

export default function TeacherOnboardingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        displayName: '', bio: '', experience: '', education: '',
        specialties: [] as string[], languages: ['Korean', 'English'],
        timezone: 'Asia/Seoul (KST)',
        price30: '18', price50: '28',
        availMorning: false, availAfternoon: false, availEvening: false, availNight: false,
        introVideo: '',
    });

    const toggleSpecialty = (s: string) => {
        setForm(prev => ({
            ...prev,
            specialties: prev.specialties.includes(s) ? prev.specialties.filter(x => x !== s) : [...prev.specialties, s],
        }));
    };

    const addLanguage = () => {
        const lang = prompt('Enter language name:');
        if (lang && !form.languages.includes(lang)) setForm(prev => ({ ...prev, languages: [...prev.languages, lang] }));
    };

    const removeLanguage = (lang: string) => {
        if (lang === 'Korean') return;
        setForm(prev => ({ ...prev, languages: prev.languages.filter(l => l !== lang) }));
    };

    const handleSubmit = async () => {
        if (!user) return;
        setLoading(true);
        try {
            // 1. Update basic profile info
            await updateDoc(doc(db, 'profiles', user.uid), {
                displayName: form.displayName,
                role: 'teacher', // Ensure role is teacher
                onboardingCompleted: true,
                updatedAt: new Date(),
            });

            // 2. Create teacher profile in 'teachers' collection
            await setDoc(doc(db, 'teachers', user.uid), {
                uid: user.uid,
                displayName: form.displayName,
                bio: form.bio,
                experience: form.experience,
                education: form.education,
                specialties: form.specialties,
                languages: form.languages,
                timezone: form.timezone,
                pricing: {
                    min30: parseInt(form.price30) || 0,
                    min50: parseInt(form.price50) || 0,
                },
                availability: {
                    morning: form.availMorning,
                    afternoon: form.availAfternoon,
                    evening: form.availEvening,
                    night: form.availNight,
                },
                introVideo: form.introVideo,
                rating: 5.0, // Default starting rating
                reviewCount: 0,
                studentsCount: 0,
                isOnline: true,
                createdAt: new Date(),
            });

            console.log('Teacher profile created!');
            router.push('/teacher-dashboard');
        } catch (error) {
            console.error('Error creating teacher profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-12 bg-[#F5F6FA]">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Become a TONG Teacher 🎓</h1>
                    <p className="text-gray-500 text-lg">Set up your teacher profile in 4 easy steps</p>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-10 px-4">
                    {['Profile', 'Expertise', 'Schedule', 'Review'].map((label, i) => (
                        <div key={label} className="flex-1 text-center group">
                            <div className={`h-1.5 rounded-full mb-2 transition-all duration-300 ${i + 1 <= step ? 'bg-purple-600 shadow-md shadow-purple-200' : 'bg-gray-200'}`} />
                            <span className={`text-xs font-bold transition-colors ${i + 1 <= step ? 'text-purple-600' : 'text-gray-400'}`}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Step 1: Basic Profile */}
                {step === 1 && (
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-purple-900/5 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Basic Profile</h2>

                        <div className="space-y-6">
                            {/* Photo */}
                            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-white shadow-sm border border-gray-100">👩‍🏫</div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-1">Profile Photo</h3>
                                    <p className="text-xs text-gray-500 mb-3">Upload a clear photo of yourself</p>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 transition border border-purple-100">
                                        <Upload size={16} /> Upload Photo
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Display Name *</label>
                                <input type="text" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="How students will see your name" className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium" />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Bio *</label>
                                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell students about yourself, your teaching style, and what makes your lessons special..." rows={5} className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none transition-all font-medium" />
                                <div className="text-right mt-1">
                                    <span className="text-gray-400 text-xs font-medium">{form.bio.length}/500</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Teaching Experience</label>
                                    <input type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g., 5 years" className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium" />
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-700 mb-2 block">Education</label>
                                    <input type="text" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="e.g., BA in Korean" className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-2 block">Intro Video URL (optional)</label>
                                <input type="text" value={form.introVideo} onChange={(e) => setForm({ ...form, introVideo: e.target.value })} placeholder="YouTube or Vimeo link" className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium" />
                            </div>
                        </div>

                        <button onClick={() => setStep(2)} disabled={!form.displayName || !form.bio} className="w-full mt-8 py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-purple-600 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5">
                            Next: Expertise <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {/* Step 2: Expertise */}
                {step === 2 && (
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-purple-900/5 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Teaching Expertise</h2>

                        <div className="space-y-8">
                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-4 block flex items-center gap-2">
                                    <BookOpen size={18} className="text-purple-600" /> Specialties * (choose up to 5)
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {SPECIALTIES.map(s => (
                                        <button key={s} onClick={() => toggleSpecialty(s)} disabled={form.specialties.length >= 5 && !form.specialties.includes(s)}
                                            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${form.specialties.includes(s)
                                                ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-200'
                                                : 'bg-white border-gray-100 text-gray-500 hover:text-purple-600 hover:border-purple-100 hover:bg-purple-50 disabled:opacity-30'
                                                }`}>
                                            {form.specialties.includes(s) && '✓ '}{s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-4 block flex items-center gap-2">
                                    <Globe size={18} className="text-blue-500" /> Languages You Speak
                                </label>
                                <div className="flex flex-wrap gap-3 mb-2">
                                    {form.languages.map(lang => (
                                        <span key={lang} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-blue-700 bg-blue-50 border border-blue-100">
                                            {lang}
                                            {lang !== 'Korean' && <button onClick={() => removeLanguage(lang)} className="text-blue-400 hover:text-blue-600 rounded-full p-0.5 hover:bg-blue-100 transition"><X size={14} /></button>}
                                        </span>
                                    ))}
                                    <button onClick={addLanguage} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-500 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition">
                                        <Plus size={16} /> Add Language
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-4 block flex items-center gap-2">
                                    <GraduationCap size={18} className="text-green-500" /> Student Levels You Teach
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {['Absolute Beginner', 'Beginner', 'Intermediate', 'Upper Intermediate', 'Advanced', 'All Levels'].map(lvl => (
                                        <button key={lvl} className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-500 bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm transition">
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-10 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl text-gray-500 font-bold transition hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-200 hover:shadow-sm flex items-center justify-center gap-2">
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button onClick={() => setStep(3)} disabled={form.specialties.length === 0} className="flex-1 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 bg-purple-600 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5">
                                Next: Schedule <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Schedule & Pricing */}
                {step === 3 && (
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-purple-900/5 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Schedule & Pricing</h2>

                        <div className="space-y-8">
                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-3 block flex items-center gap-2">
                                    <Clock size={18} className="text-orange-500" /> Timezone
                                </label>
                                <div className="relative">
                                    <select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 appearance-none">
                                        {TIMEZONES.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 mb-3 block">Weekly Availability</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { key: 'availMorning', label: '🌅 Morning (6-12)', active: form.availMorning },
                                        { key: 'availAfternoon', label: '☀️ Afternoon (12-18)', active: form.availAfternoon },
                                        { key: 'availEvening', label: '🌆 Evening (18-22)', active: form.availEvening },
                                        { key: 'availNight', label: '🌙 Night (22-2)', active: form.availNight },
                                    ].map(slot => (
                                        <button key={slot.key} onClick={() => setForm(prev => ({ ...prev, [slot.key]: !slot.active }))}
                                            className={`p-4 rounded-2xl text-left text-sm font-bold transition-all border-2 ${slot.active
                                                ? 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-200'
                                                : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200 hover:text-purple-600 hover:bg-purple-50'
                                                }`}>
                                            <div className="flex items-center justify-between">
                                                <span>{slot.label}</span>
                                                {slot.active && <CheckCircle2 size={16} />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                                <label className="text-sm font-bold text-purple-900 mb-4 block">Lesson Pricing (USD)</label>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <span className="text-purple-600 text-xs font-bold block mb-2 uppercase tracking-wide">30 min lesson</span>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                            <input type="number" value={form.price30} onChange={(e) => setForm({ ...form, price30: e.target.value })} className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-purple-600 text-xs font-bold block mb-2 uppercase tracking-wide">50 min lesson</span>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                            <input type="number" value={form.price50} onChange={(e) => setForm({ ...form, price50: e.target.value })} className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-10 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl text-gray-500 font-bold transition hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-200 hover:shadow-sm flex items-center justify-center gap-2">
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button onClick={() => setStep(4)} className="flex-1 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 bg-purple-600 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:-translate-y-0.5">
                                Review <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-purple-900/5 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner">🎉</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Review</h2>
                            <p className="text-gray-500 text-sm">Make sure everything looks good before going live!</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="rounded-2xl p-5 bg-gray-50 border border-gray-200">
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Display Name</div>
                                <div className="text-gray-900 font-bold text-lg">{form.displayName || '(not set)'}</div>
                            </div>
                            <div className="rounded-2xl p-5 bg-gray-50 border border-gray-200">
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Bio</div>
                                <div className="text-gray-600 text-sm leading-relaxed">{form.bio || '(not set)'}</div>
                            </div>
                            <div className="rounded-2xl p-5 bg-gray-50 border border-gray-200">
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Specialties</div>
                                <div className="flex flex-wrap gap-2">{form.specialties.map(s => <span key={s} className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">{s}</span>)}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl p-5 bg-purple-50 border border-purple-100 text-center">
                                    <div className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">30 min</div>
                                    <div className="text-purple-900 font-black text-2xl">${form.price30}</div>
                                </div>
                                <div className="rounded-2xl p-5 bg-purple-50 border border-purple-100 text-center">
                                    <div className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">50 min</div>
                                    <div className="text-purple-900 font-black text-2xl">${form.price50}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-2xl text-gray-500 font-bold transition hover:bg-gray-50 border border-gray-200">Edit</button>
                            <button onClick={handleSubmit} disabled={loading} className="flex-1 py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 text-center disabled:opacity-50 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-0.5">
                                {loading ? 'Saving...' : <><CheckCircle2 size={20} /> Go Live! 🚀</>}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
