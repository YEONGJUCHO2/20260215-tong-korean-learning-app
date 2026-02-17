'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, Filter, ChevronDown, Clock, MessageCircle, CheckCircle, MapPin, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Dummy Data matching the design
const TEACHERS = [
    {
        id: 1,
        name: 'Ji-won Kim',
        avatar: '/avatars/teacher1.jpg', // Placeholder, using emoji/color in UI
        emoji: '👩‍🏫',
        location: 'Seoul',
        price: 25000,
        rating: 4.9,
        reviews: 128,
        bio: "I specialize in natural conversation and business Korean for professionals.",
        tags: ['Business', 'K-Drama Fan'],
        badge: 'VERIFIED PRO',
        isPopular: false
    },
    {
        id: 2,
        name: 'Min-ho Park',
        avatar: '/avatars/teacher2.jpg',
        emoji: '👨‍🏫',
        location: 'Busan',
        price: 18000,
        rating: 4.8,
        reviews: 95,
        bio: "Learn Korean through K-Pop lyrics and pop culture! Fun and interactive.",
        tags: ['K-POP', 'Beginners'],
        badge: '', // No badge
        isPopular: false
    },
    {
        id: 3,
        name: 'Seo-yeon Lee',
        avatar: '/avatars/teacher3.jpg',
        emoji: '👩‍💼',
        location: 'Seoul',
        price: 35000,
        rating: 5.0,
        reviews: 342,
        bio: "Experienced TOPIK examiner. I will help you pass your exams with high scores.",
        tags: ['TOPIK', 'Academic'],
        badge: 'POPULAR',
        isPopular: true
    },
    {
        id: 4,
        name: 'Tae-hyung Kang',
        avatar: '/avatars/teacher4.jpg',
        emoji: '👨‍💻',
        location: 'Incheon',
        price: 22000,
        rating: 4.7,
        reviews: 56,
        bio: "Focus on practical phrases for travelers and expats living in South Korea.",
        tags: ['Travel', 'Expat Life'],
        badge: '',
        isPopular: false
    },
    {
        id: 5,
        name: 'Hye-jin Choi',
        avatar: '/avatars/teacher5.jpg',
        emoji: '👩‍🎨',
        location: 'Jeju',
        price: 28000,
        rating: 4.9,
        reviews: 210,
        bio: "Grammar doesn't have to be boring! Let's master Korean structure together.",
        tags: ['Grammar', 'Kids'],
        badge: '', // 
        isPopular: false
    },
    {
        id: 6,
        name: 'Do-yun Jung',
        avatar: '/avatars/teacher6.jpg',
        emoji: '🙋‍♂️',
        location: 'Seoul',
        price: 20000,
        rating: 4.6,
        reviews: 42,
        bio: "Casual speaking practice and slang. Learn how young Koreans actually speak.",
        tags: ['Slang', 'Conversation'],
        badge: '',
        isPopular: false
    }
];

export default function TeachersPage() {
    const t = useTranslations('teachers');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState(50000);
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');

    const specialties = ['Conversation', 'K-POP', 'Business', 'TOPIK', 'Travel', 'Kids'];

    const filteredTeachers = TEACHERS.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.bio.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialty = selectedSpecialty === 'All' || teacher.tags.includes(selectedSpecialty);
        const matchesPrice = teacher.price <= priceRange;
        return matchesSearch && matchesSpecialty && matchesPrice;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 font-sans text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('title')}</h1>
                    <p className="text-gray-600 text-lg">{t('subtitle')}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar (Filters) */}
                    <div className="w-full lg:w-72 flex-shrink-0 space-y-8">

                        {/* Search */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Search</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder={t('search')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all"
                                />
                            </div>
                        </div>

                        {/* Specialties */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedSpecialty('All')}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedSpecialty === 'All' ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    All
                                </button>
                                {specialties.map(spec => (
                                    <button
                                        key={spec}
                                        onClick={() => setSelectedSpecialty(spec)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedSpecialty === spec ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {spec}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Price Range</h3>
                                <span className="text-sm font-medium text-purple-600">₩{priceRange.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="10000"
                                max="100000"
                                step="1000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700"
                            />
                            <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                                <span>₩10k</span>
                                <span>₩100k+</span>
                            </div>
                        </div>

                        {/* Clear Filters Button */}
                        <button
                            onClick={() => { setSearchQuery(''); setPriceRange(100000); setSelectedSpecialty('All'); }}
                            className="w-full py-3 rounded-xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            Clear All Filters
                        </button>

                    </div>

                    {/* Right Grid (Results) */}
                    <div className="flex-1">
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredTeachers.map((teacher) => (
                                <div key={teacher.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full group">

                                    {/* Card Header (Image & Badge) */}
                                    <div className="h-32 bg-gray-50 relative flex items-center justify-center overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 pattern-grid opacity-50" />
                                        <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center text-5xl relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                            {teacher.emoji}
                                        </div>

                                        {teacher.badge && (
                                            <div className={`absolute top-4 left-4 px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white/80 backdrop-blur-sm shadow-sm ${teacher.badge === 'POPULAR' ? 'text-purple-600' : 'text-blue-600'}`}>
                                                {teacher.badge}
                                            </div>
                                        )}

                                        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-md shadow-purple-500/20">
                                            <Star size={12} fill="currentColor" /> {teacher.rating}
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-900">{teacher.name}</h3>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 font-medium">
                                                    <span className="flex items-center gap-0.5"><MapPin size={12} /> Native Speaker • {teacher.location}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-purple-600">₩{teacher.price.toLocaleString()}</div>
                                                <div className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">per 30 min</div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">"{teacher.bio}"</p>

                                        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                            {teacher.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <Link href={`/teachers/${teacher.id}`} className="w-full btn-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                                            {t('bookNow') || 'Book a Lesson'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredTeachers.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <Search size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No teachers found</h3>
                                <p className="text-gray-500 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setPriceRange(100000); setSelectedSpecialty('All'); }}
                                    className="mt-6 text-purple-600 font-bold hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination (Visual Only) */}
                        {filteredTeachers.length > 0 && (
                            <div className="flex justify-center mt-12 gap-2">
                                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"><ChevronDown className="rotate-90" size={16} /></button>
                                <button className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/30">1</button>
                                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">2</button>
                                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">3</button>
                                <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                                <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"><ChevronDown className="-rotate-90" size={16} /></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
