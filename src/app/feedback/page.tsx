'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Star, ThumbsUp, BookOpen, MessageCircle, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

const SKILLS = ['Speaking', 'Listening', 'Reading', 'Writing', 'Vocabulary', 'Grammar', 'Pronunciation'];
const HOMEWORK_TYPES = ['Watch K-Drama clip', 'Practice conversation', 'Write diary entry', 'Review vocabulary', 'Listen to podcast'];

export default function FeedbackPage() {
    const [step, setStep] = useState(1); // 1: rating, 2: details, 3: homework, 4: done
    const [timer, setTimer] = useState(600); // 10 min in seconds
    const [rating, setRating] = useState(0);
    const [skills, setSkills] = useState<Record<string, number>>({});
    const [strengths, setStrengths] = useState('');
    const [improvements, setImprovements] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedHomework, setSelectedHomework] = useState<string[]>([]);
    const [homeworkNote, setHomeworkNote] = useState('');

    useEffect(() => {
        if (timer <= 0 || step === 4) return;
        const interval = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer, step]);

    const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const timerColor = timer > 300 ? '#22c55e' : timer > 60 ? '#f59e0b' : '#ef4444';

    const toggleSkill = (skill: string, value: number) => {
        setSkills(prev => ({ ...prev, [skill]: value }));
    };

    const toggleHomework = (hw: string) => {
        setSelectedHomework(prev => prev.includes(hw) ? prev.filter(h => h !== hw) : [...prev, hw]);
    };

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-2xl mx-auto">
                {/* Timer Bar */}
                <div className="flex items-center justify-between mb-6 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3">
                        <Clock size={18} style={{ color: timerColor }} />
                        <div>
                            <span className="text-white text-sm font-medium">Post-Lesson Feedback</span>
                            <span className="text-gray-500 text-xs ml-2">Sarah M. · K-POP Lyrics</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-mono font-bold" style={{ color: timerColor }}>{formatTime(timer)}</span>
                        {timer <= 60 && <AlertTriangle size={14} className="text-red-400 animate-pulse" />}
                    </div>
                </div>

                {/* Progress */}
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: s <= step ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)' }} />
                    ))}
                </div>

                {/* Step 1: Overall Rating */}
                {step === 1 && (
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h2 className="text-2xl font-bold text-white mb-2">How was the lesson? ⭐</h2>
                        <p className="text-gray-400 text-sm mb-8">Rate the overall student performance</p>

                        {/* Star Rating */}
                        <div className="flex justify-center gap-3 mb-8">
                            {[1, 2, 3, 4, 5].map(i => (
                                <button key={i} onClick={() => setRating(i)} className="transition-transform hover:scale-110">
                                    <Star size={40} className={`transition-colors ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'}`} />
                                </button>
                            ))}
                        </div>

                        {/* Skill Breakdown */}
                        <h3 className="text-white font-medium mb-4">Skills Assessment</h3>
                        <div className="space-y-3 mb-8">
                            {SKILLS.map(skill => (
                                <div key={skill} className="flex items-center gap-3">
                                    <span className="text-gray-400 text-sm w-28">{skill}</span>
                                    <div className="flex gap-1.5 flex-1">
                                        {[1, 2, 3, 4, 5].map(v => (
                                            <button
                                                key={v}
                                                onClick={() => toggleSkill(skill, v)}
                                                className="flex-1 h-8 rounded-lg text-xs font-medium transition-all"
                                                style={{
                                                    background: (skills[skill] || 0) >= v ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.04)',
                                                    border: `1px solid ${(skills[skill] || 0) >= v ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
                                                    color: (skills[skill] || 0) >= v ? 'white' : '#6b7280',
                                                }}
                                            >
                                                {v}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setStep(2)} disabled={rating === 0} className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                            Next <ArrowRight size={16} />
                        </button>
                    </div>
                )}

                {/* Step 2: Detailed Feedback */}
                {step === 2 && (
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h2 className="text-2xl font-bold text-white mb-2">Detailed Feedback 📝</h2>
                        <p className="text-gray-400 text-sm mb-6">Help the student improve!</p>

                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block flex items-center gap-2">
                                    <ThumbsUp size={14} className="text-green-400" /> Strengths
                                </label>
                                <textarea value={strengths} onChange={(e) => setStrengths(e.target.value)} placeholder="What did the student do well?" className="w-full p-3 rounded-xl text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 min-h-[80px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block flex items-center gap-2">
                                    <BookOpen size={14} className="text-orange-400" /> Areas to Improve
                                </label>
                                <textarea value={improvements} onChange={(e) => setImprovements(e.target.value)} placeholder="What should the student focus on next?" className="w-full p-3 rounded-xl text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 min-h-[80px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-300 mb-2 block flex items-center gap-2">
                                    <MessageCircle size={14} className="text-cyan-400" /> Notes / Key Expressions
                                </label>
                                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="New vocabulary, grammar points, cultural notes..." className="w-full p-3 rounded-xl text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 min-h-[80px]" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-gray-400 font-medium transition hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>Back</button>
                            <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>Next <ArrowRight size={16} /></button>
                        </div>
                    </div>
                )}

                {/* Step 3: Homework */}
                {step === 3 && (
                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h2 className="text-2xl font-bold text-white mb-2">Assign Homework 📚</h2>
                        <p className="text-gray-400 text-sm mb-6">Select homework for the next lesson (optional)</p>

                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {HOMEWORK_TYPES.map(hw => (
                                <button key={hw} onClick={() => toggleHomework(hw)} className="p-3 rounded-xl text-left text-sm transition-all" style={{ background: selectedHomework.includes(hw) ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${selectedHomework.includes(hw) ? 'rgba(108,92,231,0.4)' : 'rgba(255,255,255,0.06)'}`, color: selectedHomework.includes(hw) ? 'white' : '#9ca3af' }}>
                                    {selectedHomework.includes(hw) ? '✅ ' : ''}{hw}
                                </button>
                            ))}
                        </div>

                        <textarea value={homeworkNote} onChange={(e) => setHomeworkNote(e.target.value)} placeholder="Additional homework instructions..." className="w-full p-3 rounded-xl text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500 min-h-[60px] mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />

                        <div className="flex gap-3">
                            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-gray-400 font-medium transition hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>Back</button>
                            <button onClick={() => setStep(4)} className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #6C5CE7, #FF6B9D)' }}>
                                <CheckCircle2 size={16} /> Submit Feedback
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Done */}
                {step === 4 && (
                    <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="text-5xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-white mb-2">Feedback Submitted!</h2>
                        <p className="text-gray-400 text-sm mb-6">Your feedback has been sent to Sarah M. Great job! (+30 TP)</p>

                        <div className="rounded-xl p-4 mb-6 inline-flex items-center gap-3" style={{ background: 'rgba(108,92,231,0.1)', border: '1px solid rgba(108,92,231,0.15)' }}>
                            <span className="text-purple-400 font-bold text-lg">+30 TP</span>
                            <span className="text-gray-400 text-sm">earned for completing feedback on time!</span>
                        </div>

                        <div className="flex gap-3 justify-center">
                            <Link href="/teacher-dashboard" className="px-6 py-3 rounded-xl font-medium text-gray-300 transition hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                                Dashboard
                            </Link>
                            <Link href="/messages" className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                Message Student
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
