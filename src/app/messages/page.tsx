'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, Image, Smile, Phone, Video, MoreVertical, ArrowLeft, Search, Check, CheckCheck } from 'lucide-react';

const CONVERSATIONS = [
    { id: 1, name: 'Min-ji Kim', avatar: '👩‍🏫', lastMsg: '네, 다음 수업에서 그 표현 연습해요! 😊', time: '2:30 PM', unread: 2, online: true },
    { id: 2, name: 'Jun-ho Park', avatar: '👨‍🏫', lastMsg: 'TOPIK 기출문제 공유해드릴게요', time: '11:00 AM', unread: 0, online: false },
    { id: 3, name: 'Soo-young Lee', avatar: '👩‍💼', lastMsg: '이번 주 드라마 숙제 확인했어요?', time: 'Yesterday', unread: 1, online: true },
    { id: 4, name: 'TONG AI 🤖', avatar: '🤖', lastMsg: '안녕하세요! 오늘도 한국어 연습할까요?', time: 'Yesterday', unread: 0, online: true },
];

const MESSAGES = [
    { id: 1, sender: 'teacher', text: '안녕하세요 Sarah! 오늘 수업 준비됐어요? 🎵', time: '2:10 PM', read: true },
    { id: 2, sender: 'me', text: '네! 오늘은 뭐 배워요?', time: '2:11 PM', read: true },
    { id: 3, sender: 'teacher', text: '오늘은 BTS "Butter" 가사로 영어식 발음 vs 한국어 발음 차이 배울 거예요!', time: '2:12 PM', read: true },
    { id: 4, sender: 'me', text: '오 재밌겠다! 🤩', time: '2:13 PM', read: true },
    { id: 5, sender: 'teacher', text: '먼저 이 표현 알아요? "Side step, right-left, to my beat"', time: '2:15 PM', read: true },
    { id: 6, sender: 'me', text: '음... 옆으로 걸어가는 거 아닌가요?', time: '2:18 PM', read: true },
    { id: 7, sender: 'teacher', text: '맞아요!! "사이드 스텝" 이라고 발음해요. 한국어에서는 영어 단어를 좀 다르게 발음하는데...', time: '2:20 PM', read: true },
    { id: 8, sender: 'teacher', text: '예를 들어 "버터" (Butter) → 영어: /bʌtər/ 한국어: /beo-teo/ 느낌이 다르죠?', time: '2:21 PM', read: true },
    { id: 9, sender: 'me', text: '아!! 그래서 한국 사람들이 butter를 "버러"라고 안 하고 "버터"라고 하는 거구나', time: '2:25 PM', read: true },
    { id: 10, sender: 'teacher', text: '정확해요! 👏 한국어에는 영어의 /r/ 발음이 없어서 "ㅓ"로 바꿔요', time: '2:26 PM', read: true },
    { id: 11, sender: 'teacher', text: '네, 다음 수업에서 그 표현 연습해요! 😊', time: '2:30 PM', read: false },
];

export default function MessagesPage() {
    const [activeConvo, setActiveConvo] = useState(1);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState(MESSAGES);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, {
            id: messages.length + 1,
            sender: 'me',
            text: newMessage.trim(),
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            read: false,
        }]);
        setNewMessage('');
    };

    const activeChat = CONVERSATIONS.find(c => c.id === activeConvo);

    return (
        <div className="h-[calc(100vh-64px)] flex" style={{ background: '#0a0a1a' }}>
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 flex flex-col" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                {/* Header */}
                <div className="p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <h2 className="text-lg font-bold text-white mb-3">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search conversations..."
                            className="w-full pl-9 pr-3 py-2 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((convo) => (
                        <button
                            key={convo.id}
                            onClick={() => setActiveConvo(convo.id)}
                            className={`w-full flex items-center gap-3 p-4 text-left transition-all hover:bg-white/5 ${activeConvo === convo.id ? 'bg-white/5' : ''
                                }`}
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                        >
                            <div className="relative">
                                <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(108,92,231,0.15)' }}>
                                    {convo.avatar}
                                </div>
                                {convo.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500" style={{ border: '2px solid #0a0a1a' }} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-white text-sm font-medium truncate">{convo.name}</span>
                                    <span className="text-gray-500 text-xs flex-shrink-0">{convo.time}</span>
                                </div>
                                <p className="text-gray-500 text-xs truncate mt-0.5">{convo.lastMsg}</p>
                            </div>
                            {convo.unread > 0 && (
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                    {convo.unread}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: 'rgba(108,92,231,0.15)' }}>
                            {activeChat?.avatar}
                        </div>
                        <div>
                            <div className="text-white font-semibold text-sm">{activeChat?.name}</div>
                            <div className="text-green-400 text-xs">{activeChat?.online ? 'Online' : 'Offline'}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"><Phone size={18} /></button>
                        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"><Video size={18} /></button>
                        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"><MoreVertical size={18} /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'me' ? 'rounded-br-sm' : 'rounded-bl-sm'
                                    }`}
                                style={{
                                    background: msg.sender === 'me'
                                        ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)'
                                        : 'rgba(255,255,255,0.07)',
                                    color: 'white',
                                }}
                            >
                                <p>{msg.text}</p>
                                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                                    <span className="text-[10px] opacity-60">{msg.time}</span>
                                    {msg.sender === 'me' && (
                                        msg.read ? <CheckCheck size={12} className="opacity-60" /> : <Check size={12} className="opacity-60" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"><Image size={18} /></button>
                        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"><Smile size={18} /></button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!newMessage.trim()}
                            className="p-2.5 rounded-xl text-white transition-all hover:opacity-90 disabled:opacity-40"
                            style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
