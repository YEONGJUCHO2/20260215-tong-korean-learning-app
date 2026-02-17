'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/firebase/auth'; // Firebase Auth
import { db } from '@/lib/firebase/config'; // Firebase DB
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send, Image, Smile, TrendingUp } from 'lucide-react';

const TABS = ['All', 'K-POP', 'K-Drama', 'Daily Life', 'Questions', 'Study Tips'];

export default function CommunityPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('All');
    const [posts, setPosts] = useState<any[]>([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

    // Real-time listener for posts
    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postsData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleCreatePost = async () => {
        if (!newPost.trim() || !user) return;

        try {
            await addDoc(collection(db, 'posts'), {
                authorId: user.uid,
                authorName: user.displayName || 'Anonymous',
                authorAvatar: user.photoURL || '👤', // Default avatar needs better handling
                text: newPost,
                tab: activeTab === 'All' ? 'Daily Life' : activeTab, // Default tag
                likes: [],
                comments: [],
                createdAt: serverTimestamp(),
            });
            setNewPost('');
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to post. Please try again.");
        }
    };

    const toggleLike = async (postId: string, currentLikes: string[]) => {
        if (!user) return;
        const postRef = doc(db, 'posts', postId);
        if (currentLikes.includes(user.uid)) {
            await updateDoc(postRef, { likes: arrayRemove(user.uid) });
        } else {
            await updateDoc(postRef, { likes: arrayUnion(user.uid) });
        }
    };

    // Toggle comments visibility (local state)
    const toggleComments = (id: string) => {
        const next = new Set(expandedComments);
        next.has(id) ? next.delete(id) : next.add(id);
        setExpandedComments(next);
    };

    const filteredPosts = activeTab === 'All' ? posts : posts.filter(p => p.tab === activeTab);

    return (
        <div className="min-h-screen px-4 pb-20 bg-[#F5F6FA]">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pt-4">
                    <h1 className="text-3xl font-bold text-gray-900">Community 🌍</h1>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                        <TrendingUp size={14} className="text-green-500" />
                        <span>Online Learners</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${activeTab === tab
                                ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200'
                                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* New Post Input */}
                <div className="bg-white rounded-3xl p-6 mb-8 border border-gray-100 shadow-sm">
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder={user ? `What's on your mind, ${user.displayName}?` : "Log in to share..."}
                        className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-base resize-none focus:outline-none min-h-[80px]"
                        disabled={!user}
                    />
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                        <div className="flex gap-2">
                            <button className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"><Image size={20} /></button>
                            <button className="p-2 rounded-xl text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"><Smile size={20} /></button>
                        </div>
                        <button
                            onClick={handleCreatePost}
                            disabled={!newPost.trim() || !user}
                            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-md shadow-purple-200 bg-gradient-to-r from-violet-600 to-purple-600"
                        >
                            Post
                        </button>
                    </div>
                </div>

                {/* Posts List */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-400 text-sm">Loading community...</p>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <MessageCircle size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No posts yet</h3>
                            <p className="text-gray-500 text-sm">Be the first to share something in {activeTab}!</p>
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                {/* Post Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl bg-purple-50 border border-purple-100 text-purple-600 font-bold">
                                        {post.authorName?.[0] || 'A'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-900 font-bold text-base">{post.authorName}</span>
                                            {/* Dummy Level Badge for now as it's not in post data usually */}
                                            <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-green-50 text-green-600 border border-green-100">Level 1 🌱</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mt-0.5">
                                            <span>{post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                                            <span>•</span>
                                            <span className="text-purple-500">{post.tab}</span>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-full transition"><MoreHorizontal size={20} /></button>
                                </div>

                                {/* Post Content */}
                                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-6 font-medium">{post.text}</p>

                                {/* Actions */}
                                <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                                    <button
                                        onClick={() => toggleLike(post.id, post.likes || [])}
                                        className={`flex items-center gap-2 text-sm font-bold transition-colors ${post.likes?.includes(user?.uid) ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                                    >
                                        <Heart size={20} className={post.likes?.includes(user?.uid) ? 'fill-pink-500' : ''} />
                                        {post.likes?.length || 0}
                                    </button>
                                    <button
                                        onClick={() => toggleComments(post.id)}
                                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-purple-600 transition-colors"
                                    >
                                        <MessageCircle size={20} />
                                        {post.comments?.length || 0}
                                    </button>
                                    <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors ml-auto">
                                        <Share2 size={20} />
                                    </button>
                                </div>

                                {/* Comments Section */}
                                {expandedComments.has(post.id) && (
                                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-4 animate-in fade-in slide-in-from-top-2">
                                        {post.comments && post.comments.length > 0 ? (
                                            post.comments.map((comment: any, index: number) => (
                                                <div key={index} className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                                                        {comment.authorName?.[0] || 'U'}
                                                    </div>
                                                    <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-2">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs font-bold text-gray-900">{comment.authorName}</span>
                                                            <span className="text-[10px] text-gray-400">Just now</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{comment.text}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-400 text-center py-4 italic">No comments yet. Be the first to reply!</p>
                                        )}

                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 flex-shrink-0">
                                                {user?.displayName?.[0] || 'ME'}
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Write a comment..."
                                                className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
