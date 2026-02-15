'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, Filter, ChevronDown, Clock, MessageCircle, BookOpen, Globe, Music, Briefcase, Plane, GraduationCap, Heart } from 'lucide-react';

const TEACHERS = [
    {
        id: 1, name: 'Min-ji Kim', avatar: '👩‍🏫', rating: 4.9, reviews: 127, price: 18,
        tags: ['Conversation', 'K-POP', 'Beginner-Friendly'],
        specialties: ['K-POP Lyrics', 'Daily Conversation', 'Pronunciation'],
        bio: 'Certified Korean teacher with 5 years experience. I love using K-POP to make learning fun! 🎵',
        students: 89, lessons: 1240, responseTime: '< 1h',
        languages: ['Korean', 'English', 'Japanese'],
        availability: 'Morning / Evening',
        level: 'All Levels',
    },
    {
        id: 2, name: 'Jun-ho Park', avatar: '👨‍🏫', rating: 4.8, reviews: 94, price: 22,
        tags: ['Business', 'Advanced', 'TOPIK'],
        specialties: ['Business Korean', 'TOPIK Prep', 'Formal Speech'],
        bio: 'MBA graduate, 7 years in corporate Korean training. Perfect for professionals! 💼',
        students: 65, lessons: 890, responseTime: '< 2h',
        languages: ['Korean', 'English', 'Chinese'],
        availability: 'Afternoon / Evening',
        level: 'Intermediate+',
    },
    {
        id: 3, name: 'Soo-young Lee', avatar: '👩‍💼', rating: 5.0, reviews: 203, price: 25,
        tags: ['K-Drama', 'Conversation', 'Culture'],
        specialties: ['K-Drama Scenes', 'Slang & Expressions', 'Cultural Context'],
        bio: 'Former drama scriptwriter! Learn natural Korean through your favorite shows 🎬',
        students: 142, lessons: 2100, responseTime: '< 30m',
        languages: ['Korean', 'English'],
        availability: 'Flexible',
        level: 'All Levels',
    },
    {
        id: 4, name: 'Hyun-woo Choi', avatar: '🧑‍🏫', rating: 4.7, reviews: 56, price: 15,
        tags: ['Beginner', 'Travel', 'Hangul'],
        specialties: ['Hangul Basics', 'Travel Korean', 'Survival Phrases'],
        bio: 'Patient and encouraging! Specialized in absolute beginners. Let\'s start from 가나다! ✨',
        students: 45, lessons: 380, responseTime: '< 1h',
        languages: ['Korean', 'English', 'Spanish'],
        availability: 'Morning / Afternoon',
        level: 'Beginner',
    },
    {
        id: 5, name: 'Yuna Kang', avatar: '👩‍🎓', rating: 4.9, reviews: 178, price: 20,
        tags: ['K-POP', 'Pronunciation', 'Fun'],
        specialties: ['K-POP Dance & Lyrics', 'Pronunciation Coach', 'Song Translation'],
        bio: 'Former backup dancer turned Korean teacher! Learn Korean through music & dance 🎤💃',
        students: 110, lessons: 1560, responseTime: '< 45m',
        languages: ['Korean', 'English'],
        availability: 'Evening / Night',
        level: 'All Levels',
    },
    {
        id: 6, name: 'Dong-hyuk Shin', avatar: '👨‍💻', rating: 4.6, reviews: 42, price: 16,
        tags: ['Tech', 'Gaming', 'Casual'],
        specialties: ['Gaming Korean', 'Tech Vocabulary', 'Internet Slang'],
        bio: 'Gamer & tech nerd! Learn Korean through games, memes, and Korean internet culture 🎮',
        students: 38, lessons: 290, responseTime: '< 2h',
        languages: ['Korean', 'English'],
        availability: 'Night',
        level: 'Beginner ~ Intermediate',
    },
];

const FILTER_TAGS = [
    { label: 'All', icon: <Globe size={14} /> },
    { label: 'Conversation', icon: <MessageCircle size={14} /> },
    { label: 'K-POP', icon: <Music size={14} /> },
    { label: 'Business', icon: <Briefcase size={14} /> },
    { label: 'Travel', icon: <Plane size={14} /> },
    { label: 'TOPIK', icon: <GraduationCap size={14} /> },
    { label: 'K-Drama', icon: <BookOpen size={14} /> },
];

export default function TeachersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('recommended');
    const [showSortMenu, setShowSortMenu] = useState(false);

    const filteredTeachers = TEACHERS.filter((t) => {
        const matchesSearch =
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter =
            activeFilter === 'All' || t.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase()));
        return matchesSearch && matchesFilter;
    }).sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviews - a.reviews;
        return b.rating * b.reviews - a.rating * a.reviews; // recommended
    });

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Find Your Perfect Teacher 🎓</h1>
                    <p className="text-gray-400">Browse native Korean teachers specializing in K-Culture</p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search teachers, topics, specialties..."
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                        />
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-gray-300 text-sm font-medium transition hover:bg-white/5"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <Filter size={16} />
                            {sortBy === 'recommended' ? 'Recommended' : sortBy === 'price-low' ? 'Price: Low' : sortBy === 'price-high' ? 'Price: High' : sortBy === 'rating' ? 'Top Rated' : 'Most Reviews'}
                            <ChevronDown size={14} />
                        </button>
                        {showSortMenu && (
                            <div className="absolute top-full mt-2 right-0 w-48 rounded-xl p-2 z-20" style={{ background: '#1a1a3a', border: '1px solid rgba(255,255,255,0.1)' }}>
                                {[
                                    { value: 'recommended', label: 'Recommended' },
                                    { value: 'price-low', label: 'Price: Low to High' },
                                    { value: 'price-high', label: 'Price: High to Low' },
                                    { value: 'rating', label: 'Top Rated' },
                                    { value: 'reviews', label: 'Most Reviews' },
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${sortBy === opt.value ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {FILTER_TAGS.map((tag) => (
                        <button
                            key={tag.label}
                            onClick={() => setActiveFilter(tag.label)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                            style={{
                                background: activeFilter === tag.label ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)',
                                border: `1px solid ${activeFilter === tag.label ? 'transparent' : 'rgba(255,255,255,0.08)'}`,
                                color: activeFilter === tag.label ? 'white' : '#9ca3af',
                            }}
                        >
                            {tag.icon}
                            {tag.label}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-400 text-sm">
                        <span className="text-white font-medium">{filteredTeachers.length}</span> teachers found
                    </p>
                </div>

                {/* Teacher Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredTeachers.map((teacher) => (
                        <Link
                            key={teacher.id}
                            href={`/teachers/${teacher.id}`}
                            className="group rounded-2xl p-6 transition-all hover:scale-[1.02] hover:border-purple-500/30"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            {/* Top Row */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(162,155,254,0.1))' }}>
                                    {teacher.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold text-lg group-hover:text-purple-300 transition">{teacher.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-white text-sm font-medium">{teacher.rating}</span>
                                        </div>
                                        <span className="text-gray-600 text-xs">({teacher.reviews} reviews)</span>
                                        <span className="text-gray-600 text-xs">•</span>
                                        <span className="text-gray-500 text-xs">{teacher.level}</span>
                                    </div>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-white/5 transition text-gray-500 hover:text-pink-400" onClick={(e) => e.preventDefault()}>
                                    <Heart size={18} />
                                </button>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{teacher.bio}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {teacher.tags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: 'rgba(108,92,231,0.15)', color: '#A29BFE' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Stats Row */}
                            <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><BookOpen size={12} /> {teacher.lessons} lessons</span>
                                <span className="flex items-center gap-1"><MessageCircle size={12} /> {teacher.responseTime}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {teacher.availability}</span>
                            </div>

                            {/* Bottom: Price + Book */}
                            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <div>
                                    <span className="text-2xl font-bold text-white">${teacher.price}</span>
                                    <span className="text-gray-500 text-sm"> / 30 min</span>
                                </div>
                                <span className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all group-hover:opacity-100 opacity-80" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                    Book Now
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTeachers.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No teachers found</h3>
                        <p className="text-gray-400">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
