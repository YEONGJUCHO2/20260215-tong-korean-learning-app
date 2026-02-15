'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, Image, Smile, TrendingUp, Award } from 'lucide-react';

const TABS = ['All', 'K-POP', 'K-Drama', 'Daily Life', 'Questions', 'Study Tips'];

const POSTS = [
    {
        id: 1, author: 'Sarah M.', avatar: '🧑‍🎓', level: 'Level 2 🌿', time: '2h ago', tab: 'K-POP',
        text: "오늘 BTS 'Butter' 가사에서 배운 표현! \"smooth like butter\" = 버터처럼 부드러운 🧈 한국어에서는 '매끄럽다'라고도 할 수 있대요!",
        likes: 24, comments: 8, saved: false, liked: false,
        commentList: [
            { author: 'Min-ji Kim 👩‍🏫', text: '맞아요! "매끈하다"도 비슷한 표현이에요 😊', time: '1h ago' },
            { author: 'James K.', text: '오 이거 몰랐다! 감사합니다 🙏', time: '45m ago' },
        ],
    },
    {
        id: 2, author: 'Yuki T.', avatar: '👩‍💻', level: 'Level 1 🌱', time: '5h ago', tab: 'Questions',
        text: "여러분 질문이요! 😅 '먹다' vs '들다' vs '드시다' 차이가 뭐예요? 존댓말이 너무 어려워요...",
        likes: 31, comments: 12, saved: false, liked: true,
        commentList: [
            { author: 'Jun-ho Park 👨‍🏫', text: '좋은 질문! 먹다(casual) → 드시다(honorific). "들다"는 좀 다른 뜻이에요!', time: '4h ago' },
            { author: 'Carlos R.', text: '나도 이거 헷갈렸어!! ㅋㅋ', time: '3h ago' },
        ],
    },
    {
        id: 3, author: 'Carlos R.', avatar: '🧑‍🎤', level: 'Level 2 🌿', time: '1d ago', tab: 'Daily Life',
        text: "오늘 편의점에서 처음으로 한국어로 주문했어요! '삼각김밥 하나 주세요' 😭🎉 직원분이 알아들었다!! 이런 작은 성공이 행복하네요 💪",
        likes: 89, comments: 23, saved: true, liked: true,
        commentList: [
            { author: 'Emma L.', text: '축하해요!! 🎊 작은 성공이 큰 자신감! 다음엔 "데워주세요"도 해봐!', time: '22h ago' },
            { author: 'Soo-young Lee 👩‍💼', text: '좋아요! 편의점은 한국어 실전 연습 최고의 장소 👍', time: '20h ago' },
        ],
    },
    {
        id: 4, author: 'Emma L.', avatar: '👩‍🎓', level: 'Level 4 🌸', time: '2d ago', tab: 'K-Drama',
        text: "이번 주 숙제: 드라마 '사랑의 불시착' 3화 보면서 새 표현 5개 적기 ✍️\n\n1. 미모가 돋보인다 = Your beauty stands out\n2. 눈치 없다 = No social awareness\n3. 설마 = No way / Don't tell me\n4. 어이없다 = Ridiculous/Absurd\n5. 찐이다 = It's real/genuine\n\n다들 아는 표현 있어요?",
        likes: 56, comments: 15, saved: true, liked: false,
        commentList: [
            { author: 'Sarah M.', text: '"설마" 맨날 쓰는데 정확한 뜻 몰랐어!! 고마워 🙏', time: '1d ago' },
        ],
    },
    {
        id: 5, author: 'Min-ji Kim', avatar: '👩‍🏫', level: 'Teacher ⭐', time: '3d ago', tab: 'Study Tips',
        text: "📚 한국어 공부 팁!\n\n매일 5분이라도 좋으니까 꾸준히 하는 게 제일 중요해요!\n\n추천 루틴:\n• 아침: 단어 5개 외우기 📝\n• 점심: K-POP 1곡 가사 읽기 🎵\n• 저녁: 드라마 10분 보기 📺\n• 자기 전: 오늘 배운 것 3줄 일기 ✍️\n\n이렇게만 해도 한 달이면 엄청 늘어요! 화이팅! 💪",
        likes: 142, comments: 34, saved: true, liked: true,
        commentList: [
            { author: 'Carlos R.', text: '이 루틴 따라해볼게요!! 감사합니다 선생님 🙇‍♂️', time: '2d ago' },
        ],
    },
];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [posts, setPosts] = useState(POSTS);
    const [newPost, setNewPost] = useState('');
    const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

    const toggleLike = (id: number) => {
        setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
    };

    const toggleSave = (id: number) => {
        setPosts(posts.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
    };

    const toggleComments = (id: number) => {
        const next = new Set(expandedComments);
        next.has(id) ? next.delete(id) : next.add(id);
        setExpandedComments(next);
    };

    const filteredPosts = activeTab === 'All' ? posts : posts.filter(p => p.tab === activeTab);

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">Community 🌍</h1>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <TrendingUp size={16} className="text-green-400" />
                        <span>423 learners online</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                            style={{
                                background: activeTab === tab ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)',
                                border: `1px solid ${activeTab === tab ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                                color: activeTab === tab ? 'white' : '#9ca3af',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* New Post */}
                <div className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Share something with the community... 💬"
                        className="w-full bg-transparent text-white placeholder-gray-500 text-sm resize-none focus:outline-none min-h-[60px]"
                    />
                    <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex gap-2">
                            <button className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition"><Image size={16} /></button>
                            <button className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition"><Smile size={16} /></button>
                        </div>
                        <button
                            disabled={!newPost.trim()}
                            className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-40"
                            style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}
                        >
                            Post
                        </button>
                    </div>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            {/* Post Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(108,92,231,0.15)' }}>
                                    {post.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium text-sm">{post.author}</span>
                                        <span className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(108,92,231,0.15)', color: '#A29BFE' }}>{post.level}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                        <span>{post.time}</span>
                                        <span>•</span>
                                        <span>{post.tab}</span>
                                    </div>
                                </div>
                                <button className="p-1 text-gray-500 hover:text-white transition"><MoreHorizontal size={16} /></button>
                            </div>

                            {/* Post Content */}
                            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-line mb-4">{post.text}</p>

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 text-sm transition ${post.liked ? 'text-pink-400' : 'text-gray-500 hover:text-pink-400'}`}>
                                    <Heart size={16} className={post.liked ? 'fill-pink-400' : ''} /> {post.likes}
                                </button>
                                <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-cyan-400 transition">
                                    <MessageCircle size={16} /> {post.comments}
                                </button>
                                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition">
                                    <Share2 size={16} />
                                </button>
                                <button onClick={() => toggleSave(post.id)} className={`ml-auto text-sm transition ${post.saved ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}>
                                    <Bookmark size={16} className={post.saved ? 'fill-yellow-400' : ''} />
                                </button>
                            </div>

                            {/* Comments */}
                            {expandedComments.has(post.id) && (
                                <div className="mt-4 space-y-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    {post.commentList.map((c, i) => (
                                        <div key={i} className="flex gap-2.5">
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{ background: 'rgba(108,92,231,0.1)' }}>
                                                {c.author[0]}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white text-xs font-medium">{c.author}</span>
                                                    <span className="text-gray-600 text-[10px]">{c.time}</span>
                                                </div>
                                                <p className="text-gray-400 text-xs mt-0.5">{c.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            className="flex-1 px-3 py-2 rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                                        />
                                        <button className="p-2 rounded-lg text-purple-400 hover:bg-purple-500/10 transition"><Send size={14} /></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
