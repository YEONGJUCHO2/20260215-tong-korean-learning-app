'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, Image, Smile, Phone, Video, MoreVertical, ArrowLeft, Search, Check, CheckCheck, MessageSquarePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function MessagesPage() {
    const [activeConvo, setActiveConvo] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = useTranslations('common'); // Assuming common translatiosn exist, or just fallback

    // Empty State for now
    const CONVERSATIONS: any[] = [];
    // Example if needed: { id: 1, name: 'TONG AI', avatar: '🤖', lastMsg: '안녕하세요!', time: 'now', unread: 0, online: true }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            sender: 'me',
            text: newMessage.trim(),
            time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
            read: false,
        }]);
        setNewMessage('');
    };

    const handleFeatureNotReady = (feature: string) => {
        alert(`${feature} 기능은 준비 중입니다.\nFeature not ready yet: ${feature}`);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            alert(`사진 선택됨: ${e.target.files[0].name}\n(전송 기능은 준비 중입니다)`);
        }
    };

    const activeChat = CONVERSATIONS.find(c => c.id === activeConvo);

    return (
        <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] flex pt-20 container-width">
            {/* Note: Navbar height accounted for via pt-20 */}

            <div className="flex w-full h-full bg-white rounded-3xl shadow-2xl shadow-purple-500/10 border border-gray-100 overflow-hidden">

                {/* Sidebar */}
                <div className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-shrink-0 flex-col border-r border-gray-100 bg-gray-50/50`}>
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                            <Link href="/dashboard" className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
                                <ArrowLeft size={20} />
                            </Link>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100 border border-gray-200"
                            />
                        </div>
                    </div>

                    {/* Conversation List */}
                    <div className="flex-1 overflow-y-auto">
                        {CONVERSATIONS.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                    <MessageSquarePlus size={32} />
                                </div>
                                <h3 className="text-gray-900 font-bold mb-1">No messages yet</h3>
                                <p className="text-gray-500 text-xs">Start a conversation with a teacher or AI Tutor!</p>
                                <Link href="/teachers" className="mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition">
                                    Find Teacher
                                </Link>
                            </div>
                        ) : (
                            CONVERSATIONS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map((convo) => (
                                <button
                                    key={convo.id}
                                    onClick={() => setActiveConvo(convo.id)}
                                    className={`w-full flex items-center gap-3 p-4 text-left transition-all hover:bg-white ${activeConvo === convo.id ? 'bg-white border-l-4 border-l-purple-500 shadow-sm' : 'border-l-4 border-l-transparent'
                                        }`}
                                >
                                    <div className="relative">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl bg-purple-50 ${activeConvo === convo.id ? 'ring-2 ring-purple-100' : ''}`}>
                                            {convo.avatar}
                                        </div>
                                        {convo.online && (
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className={`text-sm font-semibold truncate ${activeConvo === convo.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {convo.name}
                                            </span>
                                            <span className="text-gray-400 text-[10px] flex-shrink-0">{convo.time}</span>
                                        </div>
                                        <p className={`text-xs truncate ${activeConvo === convo.id ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
                                            {convo.lastMsg}
                                        </p>
                                    </div>
                                    {convo.unread > 0 && (
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-md shadow-purple-200">
                                            {convo.unread}
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                {activeChat ? (
                    <div className={`${activeChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white w-full`}>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setActiveConvo(null)} className="md:hidden mr-2 text-gray-500">
                                    <ArrowLeft />
                                </button>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-purple-50">
                                    {activeChat?.avatar}
                                </div>
                                <div>
                                    <div className="text-gray-900 font-bold text-sm">{activeChat?.name}</div>
                                    <div className="text-green-500 text-xs font-medium flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        {activeChat?.online ? 'Online' : 'Offline'}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => handleFeatureNotReady('통화(Call)')} className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"><Phone size={18} /></button>
                                <button onClick={() => handleFeatureNotReady('화상채팅(Video)')} className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"><Video size={18} /></button>
                                <button className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"><MoreVertical size={18} /></button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                                    <p>No messages yet.</p>
                                    <p>Say hello! 👋</p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'me' ? 'rounded-br-sm' : 'rounded-bl-sm'
                                                }`}
                                            style={{
                                                background: msg.sender === 'me'
                                                    ? 'linear-gradient(135deg, #7C3AED, #DB2777)'
                                                    : 'white',
                                                color: msg.sender === 'me' ? 'white' : '#374151',
                                                border: msg.sender === 'me' ? 'none' : '1px solid #F3F4F6'
                                            }}
                                        >
                                            <p className="leading-relaxed">{msg.text}</p>
                                            <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end text-white/70' : 'text-gray-400'}`}>
                                                <span className="text-[10px]">{msg.time}</span>
                                                {msg.sender === 'me' && (
                                                    msg.read ? <CheckCheck size={12} /> : <Check size={12} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-200 transition-all">
                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                                <button onClick={handleImageClick} className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-white transition"><Image size={20} /></button>
                                <button onClick={() => handleFeatureNotReady('이모티콘(Emoji)')} className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-white transition"><Smile size={20} /></button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type a message..."
                                    className="flex-1 px-2 py-2 bg-transparent text-gray-900 text-sm placeholder-gray-400 focus:outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!newMessage.trim()}
                                    className="p-2.5 rounded-xl text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-md shadow-purple-500/20"
                                    style={{ background: 'linear-gradient(135deg, #7C3AED, #DB2777)' }}
                                >
                                    <Send size={18} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-white text-center p-8">
                        <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <MessageSquarePlus size={40} className="text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Conversation</h2>
                        <p className="text-gray-500 max-w-sm">Choose a thread from the sidebar to start chatting with your teachers or learning partners.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
