'use client';

import Link from 'next/link';
import { Shield, Star, BookOpen, ChevronRight, Lock, CheckCircle2, Trophy, Flame, Target } from 'lucide-react';

const LEVELS = [
    { level: 1, name: '입문 (Introduction)', emoji: '🌱', color: '#22c55e', desc: 'Hangul, basic greetings, numbers', xpReq: 0, xpMax: 500, topics: ['Hangul 자모', 'Basic greetings', 'Numbers 1-100', 'Self-introduction'], testAfter: 5 },
    { level: 2, name: '초급 (Beginner)', emoji: '🌿', color: '#6C5CE7', desc: 'Simple sentences, daily life', xpReq: 500, xpMax: 1200, topics: ['Present tense', 'Past tense', 'Object particles', 'Daily vocabulary'], testAfter: 5 },
    { level: 3, name: '초중급 (Pre-Intermediate)', emoji: '🌳', color: '#00D2D3', desc: 'Conversations, opinions, feelings', xpReq: 1200, xpMax: 2500, topics: ['Connective endings', 'Expressing opinions', 'Korean food culture', 'K-POP lyrics'], testAfter: 5 },
    { level: 4, name: '중급 (Intermediate)', emoji: '🌸', color: '#FF6B9D', desc: 'Complex grammar, abstract topics', xpReq: 2500, xpMax: 4000, topics: ['Indirect speech', 'Passive/Causative', 'News articles', 'K-Drama dialogue'], testAfter: 5 },
    { level: 5, name: '중고급 (Upper-Intermediate)', emoji: '🔥', color: '#F59E0B', desc: 'Nuanced expression, formal/informal', xpReq: 4000, xpMax: 6000, topics: ['Advanced grammar', 'Business Korean', 'Essay writing', 'Debate & discussion'], testAfter: 5 },
    { level: 6, name: '고급 (Advanced)', emoji: '💎', color: '#A855F7', desc: 'Professional, academic Korean', xpReq: 6000, xpMax: 9000, topics: ['Academic writing', 'Literature analysis', 'Translation practice', 'TOPIK 6급 prep'], testAfter: 5 },
    { level: 7, name: '마스터 (Master)', emoji: '👑', color: '#EF4444', desc: 'Near-native fluency', xpReq: 9000, xpMax: 15000, topics: ['Dialects', 'Historical Korean', 'Creative writing', 'Professional interpreting'], testAfter: 5 },
];

const CURRENT_LEVEL = 3;
const CURRENT_XP = 1800;
const LESSONS_SINCE_TEST = 3;

export default function LevelsPage() {
    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Korean Level System 🏔️</h1>
                    <p className="text-gray-400">7 levels from 입문 to 마스터. Level up by completing lessons!</p>
                </div>

                {/* Current Level Card */}
                <div className="rounded-2xl p-6 mb-8" style={{ background: `linear-gradient(135deg, ${LEVELS[CURRENT_LEVEL - 1].color}15, ${LEVELS[CURRENT_LEVEL - 1].color}05)`, border: `1px solid ${LEVELS[CURRENT_LEVEL - 1].color}30` }}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl">{LEVELS[CURRENT_LEVEL - 1].emoji}</div>
                        <div>
                            <div className="text-white font-bold text-xl">Level {CURRENT_LEVEL}: {LEVELS[CURRENT_LEVEL - 1].name}</div>
                            <div className="text-gray-400 text-sm">{LEVELS[CURRENT_LEVEL - 1].desc}</div>
                        </div>
                    </div>

                    {/* XP Progress */}
                    <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">XP Progress</span>
                            <span style={{ color: LEVELS[CURRENT_LEVEL - 1].color }}>{CURRENT_XP} / {LEVELS[CURRENT_LEVEL].xpReq} XP</span>
                        </div>
                        <div className="w-full h-3 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${((CURRENT_XP - LEVELS[CURRENT_LEVEL - 1].xpReq) / (LEVELS[CURRENT_LEVEL].xpReq - LEVELS[CURRENT_LEVEL - 1].xpReq)) * 100}%`, background: `linear-gradient(90deg, ${LEVELS[CURRENT_LEVEL - 1].color}, ${LEVELS[CURRENT_LEVEL - 1].color}80)` }} />
                        </div>
                    </div>

                    {/* Test Progress */}
                    <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <Target size={18} className="text-orange-400" />
                        <div className="flex-1">
                            <div className="text-white text-sm font-medium">Level Test available after {LEVELS[CURRENT_LEVEL - 1].testAfter} lessons</div>
                            <div className="text-gray-500 text-xs">{LESSONS_SINCE_TEST} / {LEVELS[CURRENT_LEVEL - 1].testAfter} lessons completed</div>
                        </div>
                        <div className="flex gap-1">
                            {Array.from({ length: LEVELS[CURRENT_LEVEL - 1].testAfter }).map((_, i) => (
                                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: i < LESSONS_SINCE_TEST ? LEVELS[CURRENT_LEVEL - 1].color : 'rgba(255,255,255,0.1)' }} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Flame size={18} className="text-orange-400 mx-auto mb-1" />
                        <div className="text-white font-bold">14</div>
                        <div className="text-gray-500 text-xs">Day Streak</div>
                    </div>
                    <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <BookOpen size={18} className="text-purple-400 mx-auto mb-1" />
                        <div className="text-white font-bold">42</div>
                        <div className="text-gray-500 text-xs">Lessons</div>
                    </div>
                    <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Trophy size={18} className="text-yellow-400 mx-auto mb-1" />
                        <div className="text-white font-bold">1,800</div>
                        <div className="text-gray-500 text-xs">Total XP</div>
                    </div>
                </div>

                {/* Level Roadmap */}
                <h2 className="text-lg font-semibold text-white mb-4">Level Roadmap</h2>
                <div className="space-y-3">
                    {LEVELS.map((lvl, i) => {
                        const status = lvl.level < CURRENT_LEVEL ? 'completed' : lvl.level === CURRENT_LEVEL ? 'current' : 'locked';
                        return (
                            <div key={lvl.level} className={`rounded-xl p-4 transition-all ${status === 'locked' ? 'opacity-50' : ''}`} style={{ background: status === 'current' ? `${lvl.color}10` : 'rgba(255,255,255,0.02)', border: `1px solid ${status === 'current' ? `${lvl.color}30` : 'rgba(255,255,255,0.04)'}` }}>
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl w-10 text-center">{status === 'locked' ? '🔒' : lvl.emoji}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-medium text-sm">Level {lvl.level}: {lvl.name}</span>
                                            {status === 'completed' && <CheckCircle2 size={14} className="text-green-500" />}
                                            {status === 'current' && <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{ background: lvl.color }}>CURRENT</span>}
                                        </div>
                                        <p className="text-gray-500 text-xs mt-0.5">{lvl.desc}</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {lvl.topics.map(t => (
                                                <span key={t} className="px-2 py-0.5 rounded text-[10px]" style={{ background: 'rgba(255,255,255,0.05)', color: status === 'locked' ? '#4b5563' : '#9ca3af' }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div className="text-xs text-gray-500">{lvl.xpReq.toLocaleString()} XP</div>
                                        {status === 'current' && (
                                            <Link href="#" className="text-xs font-medium mt-1 inline-flex items-center gap-1 transition" style={{ color: lvl.color }}>
                                                Take Test <ChevronRight size={10} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
