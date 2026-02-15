'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Lightbulb, RotateCcw, Sparkles } from 'lucide-react';

const LEVEL_CONFIGS: Record<number, { name: string; desc: string; greeting: string }> = {
    1: { name: 'Level 1 - 입문', desc: 'Hangul & Basic Greetings', greeting: '안녕하세요! 저는 코다리예요 🐱 반가워요! (Hello! I\'m Kodari! Nice to meet you!)' },
    2: { name: 'Level 2 - 초급', desc: 'Simple Conversations', greeting: '안녕! 오늘 기분이 어때? 좋아? 나는 좋아! 😊 같이 한국어 연습하자!' },
    3: { name: 'Level 3 - 초중급', desc: 'Daily Life Topics', greeting: '안녕~ 오늘은 뭐 했어? 나는 오늘 한국 드라마 봤는데 진짜 재밌었어! 😆' },
    4: { name: 'Level 4 - 중급', desc: 'Complex Discussions', greeting: '어 왔어? 오늘 날씨 진짜 좋지 않아? 이런 날은 한강에서 치맥하고 싶다 ㅋㅋ 🍗🍺' },
    5: { name: 'Level 5 - 중고급', desc: 'Abstract Topics', greeting: '요즘 어떻게 지내? 한국어 실력이 많이 는 것 같아서 오늘은 좀 어려운 주제로 얘기해볼까?' },
};

const SAMPLE_CONVERSATIONS: Record<number, Array<{ role: 'ai' | 'user'; text: string; hint?: string }>> = {
    1: [
        { role: 'ai', text: '이름이 뭐예요? (What is your name?)', hint: '저는 ___이에요/예요' },
    ],
    2: [
        { role: 'ai', text: '오늘 뭐 먹었어? 🍜', hint: 'Try: 저는 ___을/를 먹었어요' },
    ],
    3: [
        { role: 'ai', text: '좋아하는 한국 음식이 뭐야? 나는 떡볶이를 제일 좋아해! 🌶️', hint: '저는 ___을/를 좋아해요 because...' },
    ],
};

export default function AIConversationPage() {
    const [level, setLevel] = useState(2);
    const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; text: string; hint?: string }>>([]);
    const [input, setInput] = useState('');
    const [showHint, setShowHint] = useState<number | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Init with greeting
        const config = LEVEL_CONFIGS[level];
        setMessages([{ role: 'ai', text: config.greeting }]);
    }, [level]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user' as const, text: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                { text: '오~ 잘했어! 👏 발음도 좋은 것 같아!', hint: undefined },
                { text: '맞아맞아! 그리고 "도"를 붙이면 "~도 좋아해요" 이렇게 쓸 수 있어! 😊', hint: 'Try using ~도 (also/too)' },
                { text: '재밌다! 😄 그런데 여기서 조사를 "을/를" 대신 "이/가"를 쓰면 더 자연스러워~', hint: '이/가 vs 을/를 차이 알아?' },
                { text: '대단해! 한국어 진짜 많이 늘었다! 💪 다른 표현도 써볼까?', hint: undefined },
            ];
            const resp = responses[Math.floor(Math.random() * responses.length)];
            setMessages(prev => [...prev, { role: 'ai', text: resp.text, hint: resp.hint }]);
            setIsTyping(false);
        }, 1500);
    };

    const resetConvo = () => {
        const config = LEVEL_CONFIGS[level];
        setMessages([{ role: 'ai', text: config.greeting }]);
        setShowHint(null);
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            {/* Header */}
            <div className="px-4 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(162,155,254,0.1))' }}>
                            🐱
                        </div>
                        <div>
                            <h2 className="text-white font-semibold text-sm flex items-center gap-1.5">
                                Kodari AI <Sparkles size={12} className="text-yellow-400" />
                            </h2>
                            <p className="text-gray-500 text-xs">{LEVEL_CONFIGS[level].desc}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={level}
                            onChange={(e) => setLevel(Number(e.target.value))}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 focus:outline-none"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            {Object.entries(LEVEL_CONFIGS).map(([lvl, cfg]) => (
                                <option key={lvl} value={lvl} style={{ background: '#1a1a3a' }}>{cfg.name}</option>
                            ))}
                        </select>
                        <button onClick={resetConvo} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition" title="Reset conversation">
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-2xl mx-auto space-y-4">
                    {/* Topic Suggestions */}
                    {messages.length <= 1 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {['Korean food 🍜', 'K-POP 🎵', 'Daily routine 📅', 'Travel 🗺️', 'K-Drama 📺'].map(topic => (
                                <button
                                    key={topic}
                                    onClick={() => { setInput(topic.split(' ')[0]); }}
                                    className="px-3 py-1.5 rounded-full text-xs text-gray-400 hover:text-white transition"
                                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i}>
                            <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'ai' && (
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1" style={{ background: 'rgba(108,92,231,0.15)' }}>🐱</div>
                                )}
                                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`} style={{ background: msg.role === 'user' ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.07)', color: 'white' }}>
                                    <p>{msg.text}</p>
                                </div>
                            </div>

                            {/* Hint & Actions */}
                            {msg.role === 'ai' && msg.hint && (
                                <div className="ml-10 mt-1.5">
                                    <button onClick={() => setShowHint(showHint === i ? null : i)} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition">
                                        <Lightbulb size={12} /> {showHint === i ? 'Hide hint' : 'Show hint'}
                                    </button>
                                    {showHint === i && (
                                        <div className="mt-1 px-3 py-2 rounded-lg text-xs text-yellow-300" style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.15)' }}>
                                            💡 {msg.hint}
                                        </div>
                                    )}
                                </div>
                            )}

                            {msg.role === 'ai' && (
                                <div className="ml-10 mt-1 flex gap-1">
                                    <button className="p-1 rounded text-gray-600 hover:text-gray-400 transition" title="Listen"><Volume2 size={12} /></button>
                                </div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'rgba(108,92,231,0.15)' }}>🐱</div>
                            <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: 'rgba(255,255,255,0.07)' }}>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="max-w-2xl mx-auto flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="한국어로 말해봐! (Try speaking Korean!)"
                        className="flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
                    />
                    <button onClick={handleSend} disabled={!input.trim()} className="p-3 rounded-xl text-white transition-all hover:opacity-90 disabled:opacity-40" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                        <Send size={18} />
                    </button>
                </div>
                <p className="max-w-2xl mx-auto text-gray-600 text-[10px] text-center mt-2">
                    🐱 Kodari adjusts to your level. Don&apos;t be afraid to make mistakes! +5 TP per conversation
                </p>
            </div>
        </div>
    );
}
