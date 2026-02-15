'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Upload, Plus, X, CheckCircle2, GraduationCap, Clock, Globe, BookOpen } from 'lucide-react';

const SPECIALTIES = ['Conversation', 'K-POP', 'K-Drama', 'Business', 'TOPIK', 'Travel', 'Hangul Basics', 'Pronunciation', 'Gaming', 'Culture', 'Academic', 'Kids'];
const TIMEZONES = ['Asia/Seoul (KST)', 'America/New_York (EST)', 'America/Los_Angeles (PST)', 'Europe/London (GMT)', 'Asia/Tokyo (JST)', 'Australia/Sydney (AEST)'];

export default function TeacherOnboardingPage() {
    const [step, setStep] = useState(1);
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

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Become a TONG Teacher 🎓</h1>
                    <p className="text-gray-400">Set up your teacher profile in 4 easy steps</p>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                    {['Profile', 'Expertise', 'Schedule', 'Review'].map((label, i) => (
                        <div key={label} className="flex-1 text-center">
                            <div className="h-1.5 rounded-full mb-2 transition-all" style={{ background: i + 1 <= step ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)' }} />
                            <span className={`text-xs ${i + 1 <= step ? 'text-purple-400' : 'text-gray-600'}`}>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Step 1: Basic Profile */}
                {step === 1 && (
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h2 className="text-xl font-semibold text-white mb-6">Basic Profile</h2>

                        <div className="space-y-5">
                            {/* Photo */}
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'rgba(108,92,231,0.15)' }}>👩‍🏫</div>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-300 hover:bg-white/5 transition" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <Upload size={14} /> Upload Photo
                                </button>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Display Name *</label>
                                <input type="text" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="How students will see your name" className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Bio *</label>
                                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell students about yourself, your teaching style, and what makes your lessons special..." rows={4} className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                                <span className="text-gray-600 text-xs">{form.bio.length}/500</span>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Teaching Experience</label>
                                <input type="text" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="e.g., 5 years teaching Korean to foreigners" className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Education</label>
                                <input type="text" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} placeholder="e.g., BA in Korean Language Education" className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block">Intro Video URL (optional)</label>
                                <input type="text" value={form.introVideo} onChange={(e) => setForm({ ...form, introVideo: e.target.value })} placeholder="YouTube or Vimeo link" className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>
                        </div>

                        <button onClick={() => setStep(2)} disabled={!form.displayName || !form.bio} className="w-full mt-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                            Next: Expertise <ArrowRight size={16} />
                        </button>
                    </div>
                )}

                {/* Step 2: Expertise */}
                {step === 2 && (
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h2 className="text-xl font-semibold text-white mb-6">Teaching Expertise</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
                                    <BookOpen size={14} className="text-purple-400" /> Specialties * (choose up to 5)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {SPECIALTIES.map(s => (
                                        <button key={s} onClick={() => toggleSpecialty(s)} disabled={form.specialties.length >= 5 && !form.specialties.includes(s)} className="px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-30" style={{ background: form.specialties.includes(s) ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${form.specialties.includes(s) ? 'rgba(108,92,231,0.4)' : 'rgba(255,255,255,0.06)'}`, color: form.specialties.includes(s) ? 'white' : '#9ca3af' }}>
                                            {form.specialties.includes(s) ? '✓ ' : ''}{s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
                                    <Globe size={14} className="text-cyan-400" /> Languages You Speak
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {form.languages.map(lang => (
                                        <span key={lang} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white" style={{ background: 'rgba(108,92,231,0.15)' }}>
                                            {lang}
                                            {lang !== 'Korean' && <button onClick={() => removeLanguage(lang)} className="text-gray-400 hover:text-red-400"><X size={12} /></button>}
                                        </span>
                                    ))}
                                    <button onClick={addLanguage} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white transition" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <Plus size={12} /> Add Language
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
                                    <GraduationCap size={14} className="text-green-400" /> Student Levels You Teach
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['Absolute Beginner', 'Beginner', 'Intermediate', 'Upper Intermediate', 'Advanced', 'All Levels'].map(lvl => (
                                        <button key={lvl} className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-gray-400 font-medium transition hover:bg-white/5 flex items-center justify-center gap-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }}><ArrowLeft size={16} /> Back</button>
                            <button onClick={() => setStep(3)} disabled={form.specialties.length === 0} className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>Next: Schedule <ArrowRight size={16} /></button>
                        </div>
                    </div>
                )}

                {/* Step 3: Schedule & Pricing */}
                {step === 3 && (
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h2 className="text-xl font-semibold text-white mb-6">Schedule & Pricing</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
                                    <Clock size={14} className="text-orange-400" /> Timezone
                                </label>
                                <select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    {TIMEZONES.map(tz => <option key={tz} value={tz} style={{ background: '#1a1a3a' }}>{tz}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block">Availability</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { key: 'availMorning', label: '🌅 Morning (6-12)', active: form.availMorning },
                                        { key: 'availAfternoon', label: '☀️ Afternoon (12-18)', active: form.availAfternoon },
                                        { key: 'availEvening', label: '🌆 Evening (18-22)', active: form.availEvening },
                                        { key: 'availNight', label: '🌙 Night (22-2)', active: form.availNight },
                                    ].map(slot => (
                                        <button key={slot.key} onClick={() => setForm(prev => ({ ...prev, [slot.key]: !slot.active }))} className="p-3 rounded-xl text-left text-sm transition-all" style={{ background: slot.active ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${slot.active ? 'rgba(108,92,231,0.4)' : 'rgba(255,255,255,0.06)'}`, color: slot.active ? 'white' : '#9ca3af' }}>
                                            {slot.active ? '✓ ' : ''}{slot.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-3 block">Lesson Pricing (USD)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <span className="text-gray-500 text-xs block mb-1">30 min lesson</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input type="number" value={form.price30} onChange={(e) => setForm({ ...form, price30: e.target.value })} className="w-full pl-7 pr-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-xs block mb-1">50 min lesson</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                            <input type="number" value={form.price50} onChange={(e) => setForm({ ...form, price50: e.target.value })} className="w-full pl-7 pr-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-gray-400 font-medium transition hover:bg-white/5 flex items-center justify-center gap-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }}><ArrowLeft size={16} /> Back</button>
                            <button onClick={() => setStep(4)} className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>Review <ArrowRight size={16} /></button>
                        </div>
                    </div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="text-center mb-6">
                            <div className="text-5xl mb-3">🎉</div>
                            <h2 className="text-2xl font-bold text-white mb-2">Profile Review</h2>
                            <p className="text-gray-400 text-sm">Make sure everything looks good before going live!</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="rounded-xl p-4" style={{ background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.12)' }}>
                                <div className="text-gray-500 text-xs mb-1">Display Name</div>
                                <div className="text-white font-medium">{form.displayName || '(not set)'}</div>
                            </div>
                            <div className="rounded-xl p-4" style={{ background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.12)' }}>
                                <div className="text-gray-500 text-xs mb-1">Bio</div>
                                <div className="text-gray-300 text-sm">{form.bio || '(not set)'}</div>
                            </div>
                            <div className="rounded-xl p-4" style={{ background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.12)' }}>
                                <div className="text-gray-500 text-xs mb-1">Specialties</div>
                                <div className="flex flex-wrap gap-1.5 mt-1">{form.specialties.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs text-purple-300" style={{ background: 'rgba(108,92,231,0.2)' }}>{s}</span>)}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-xl p-4" style={{ background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.12)' }}>
                                    <div className="text-gray-500 text-xs mb-1">30 min</div>
                                    <div className="text-white font-bold text-lg">${form.price30}</div>
                                </div>
                                <div className="rounded-xl p-4" style={{ background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.12)' }}>
                                    <div className="text-gray-500 text-xs mb-1">50 min</div>
                                    <div className="text-white font-bold text-lg">${form.price50}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl text-gray-400 font-medium transition hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>Edit</button>
                            <Link href="/teacher-dashboard" className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 text-center" style={{ background: 'linear-gradient(135deg, #6C5CE7, #FF6B9D)' }}>
                                <CheckCircle2 size={16} /> Go Live! 🚀
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
