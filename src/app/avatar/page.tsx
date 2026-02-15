'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Shirt, Star, Coins, ChevronRight, Lock } from 'lucide-react';

const CATEGORIES = ['Hair', 'Face', 'Top', 'Bottom', 'Shoes', 'Accessory', 'Background', 'Pet'];

const EQUIPPED: Record<string, string> = {
    Hair: '🧑‍🎤 K-POP Idol Hair',
    Face: '😊 Happy Face',
    Top: '👘 Hanbok Top',
    Bottom: '👖 Dark Jeans',
    Shoes: '👟 White Sneakers',
    Accessory: '🎧 Headphones',
    Background: '🌸 Cherry Blossom',
    Pet: '🐱 Lucky Cat',
};

const SHOP_ITEMS = [
    { id: 1, category: 'Hair', name: 'Idol Wavy Hair', emoji: '💇', price: 200, rarity: 'Rare', owned: false, level: 0 },
    { id: 2, category: 'Hair', name: 'Samurai Topknot', emoji: '🗡️', price: 350, rarity: 'Epic', owned: false, level: 3 },
    { id: 3, category: 'Top', name: 'Dragon Hoodie', emoji: '🐉', price: 500, rarity: 'Legendary', owned: false, level: 5 },
    { id: 4, category: 'Top', name: 'School Uniform', emoji: '🎒', price: 150, rarity: 'Common', owned: true, level: 0 },
    { id: 5, category: 'Accessory', name: 'Crown of Knowledge', emoji: '👑', price: 1000, rarity: 'Legendary', owned: false, level: 7 },
    { id: 6, category: 'Accessory', name: 'Korean Flag Pin', emoji: '🇰🇷', price: 50, rarity: 'Common', owned: true, level: 0 },
    { id: 7, category: 'Pet', name: 'Baby Dragon', emoji: '🐲', price: 800, rarity: 'Epic', owned: false, level: 4 },
    { id: 8, category: 'Pet', name: 'Shiba Inu', emoji: '🐕', price: 300, rarity: 'Rare', owned: false, level: 2 },
    { id: 9, category: 'Background', name: 'Seoul Night', emoji: '🌃', price: 400, rarity: 'Rare', owned: false, level: 0 },
    { id: 10, category: 'Background', name: 'Jeju Beach', emoji: '🏖️', price: 250, rarity: 'Common', owned: true, level: 0 },
    { id: 11, category: 'Face', name: 'Cool Sunglasses', emoji: '😎', price: 100, rarity: 'Common', owned: false, level: 0 },
    { id: 12, category: 'Shoes', name: 'Hanbok Shoes', emoji: '👞', price: 180, rarity: 'Rare', owned: false, level: 1 },
];

const RARITY_COLORS: Record<string, string> = {
    Common: '#9ca3af',
    Rare: '#6C5CE7',
    Epic: '#FF6B9D',
    Legendary: '#F59E0B',
};

export default function AvatarPage() {
    const [activeTab, setActiveTab] = useState<'customize' | 'shop'>('customize');
    const [activeCategory, setActiveCategory] = useState('Hair');
    const [tp] = useState(1250);
    const [playerLevel] = useState(3);

    const filteredItems = SHOP_ITEMS.filter(item => item.category === activeCategory);

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">RPG Avatar Hub <Sparkles size={24} className="text-yellow-400" /></h1>
                        <p className="text-gray-400 mt-1">Customize your learning avatar!</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(108,92,231,0.15)', border: '1px solid rgba(108,92,231,0.2)' }}>
                            <Shield size={16} className="text-purple-400" />
                            <span className="text-white font-bold text-sm">Lvl {playerLevel}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.2)' }}>
                            <Coins size={16} className="text-yellow-400" />
                            <span className="text-white font-bold text-sm">{tp.toLocaleString()} TP</span>
                        </div>
                    </div>
                </div>

                {/* Tab Toggle */}
                <div className="flex gap-2 mb-6">
                    <button onClick={() => setActiveTab('customize')} className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ background: activeTab === 'customize' ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)', color: activeTab === 'customize' ? 'white' : '#9ca3af' }}>
                        🎨 Customize
                    </button>
                    <button onClick={() => setActiveTab('shop')} className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all" style={{ background: activeTab === 'shop' ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.06)', color: activeTab === 'shop' ? 'white' : '#9ca3af' }}>
                        🛒 Point Shop
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Avatar Preview */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl p-6 sticky top-24" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="text-center mb-6">
                                <div className="w-48 h-48 mx-auto rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.15), rgba(162,155,254,0.1))' }}>
                                    <div className="text-7xl" style={{ filter: 'drop-shadow(0 0 20px rgba(108,92,231,0.3))' }}>🧑‍🎤</div>
                                    <div className="absolute bottom-2 right-2 text-2xl">🐱</div>
                                    <div className="absolute top-2 left-2 text-lg">🎧</div>
                                </div>
                                <h3 className="text-white font-bold text-lg mt-4">Korean Explorer</h3>
                                <p className="text-gray-500 text-xs">Level 3 · Intermediate Learner</p>
                            </div>

                            {/* XP Progress */}
                            <div className="mb-5">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">XP to Level 4</span>
                                    <span className="text-purple-400 font-medium">720 / 1000</span>
                                </div>
                                <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                    <div className="h-full rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg, #6C5CE7, #A29BFE)' }} />
                                </div>
                            </div>

                            {/* Equipped Items */}
                            <h4 className="text-white text-sm font-medium mb-3">Equipped</h4>
                            <div className="space-y-2">
                                {Object.entries(EQUIPPED).map(([slot, item]) => (
                                    <div key={slot} className="flex items-center justify-between py-1.5 text-xs">
                                        <span className="text-gray-500">{slot}</span>
                                        <span className="text-white">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Category Tabs */}
                        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all" style={{ background: activeCategory === cat ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${activeCategory === cat ? 'rgba(108,92,231,0.3)' : 'rgba(255,255,255,0.06)'}`, color: activeCategory === cat ? '#A29BFE' : '#9ca3af' }}>
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'customize' ? (
                            /* Customize Grid */
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {filteredItems.map(item => (
                                    <div key={item.id} className="rounded-xl p-4 text-center transition-all hover:scale-[1.02] cursor-pointer group" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${item.owned ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                                        <div className="text-4xl mb-3">{item.emoji}</div>
                                        <div className="text-white text-sm font-medium mb-1">{item.name}</div>
                                        <div className="text-xs font-medium mb-2" style={{ color: RARITY_COLORS[item.rarity] }}>{item.rarity}</div>
                                        {item.owned ? (
                                            <button className="w-full py-1.5 rounded-lg text-xs font-medium text-purple-300 transition" style={{ background: 'rgba(108,92,231,0.15)' }}>Equip</button>
                                        ) : item.level > playerLevel ? (
                                            <div className="flex items-center justify-center gap-1 text-gray-600 text-xs"><Lock size={10} /> Lvl {item.level} req.</div>
                                        ) : (
                                            <button className="w-full py-1.5 rounded-lg text-xs font-medium text-white transition hover:opacity-90" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                                <Coins size={10} className="inline mr-1" /> {item.price} TP
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Shop View */
                            <div>
                                {/* TP Earning Guide */}
                                <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.15)' }}>
                                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><Coins size={16} className="text-yellow-400" /> How to Earn TP</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        {[
                                            { action: 'Complete a lesson', tp: '+50 TP' },
                                            { action: 'Finish homework', tp: '+30 TP' },
                                            { action: 'Community post', tp: '+10 TP' },
                                            { action: '7-day streak', tp: '+100 TP' },
                                            { action: 'Write a review', tp: '+20 TP' },
                                            { action: 'Level up', tp: '+200 TP' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between text-gray-400">
                                                <span>{item.action}</span>
                                                <span className="text-yellow-400 font-medium">{item.tp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* All Items */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {filteredItems.map(item => (
                                        <div key={item.id} className="rounded-xl p-4 text-center transition-all hover:scale-[1.02] cursor-pointer" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.06)` }}>
                                            <div className="text-4xl mb-3">{item.emoji}</div>
                                            <div className="text-white text-sm font-medium mb-1">{item.name}</div>
                                            <div className="text-xs font-medium mb-2" style={{ color: RARITY_COLORS[item.rarity] }}>{item.rarity}</div>
                                            {item.owned ? (
                                                <span className="text-green-400 text-xs font-medium">✅ Owned</span>
                                            ) : item.level > playerLevel ? (
                                                <div className="flex items-center justify-center gap-1 text-gray-600 text-xs"><Lock size={10} /> Unlock at Lvl {item.level}</div>
                                            ) : tp >= item.price ? (
                                                <button className="w-full py-2 rounded-lg text-xs font-medium text-white transition hover:opacity-90" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                                    Buy — {item.price} TP
                                                </button>
                                            ) : (
                                                <span className="text-red-400 text-xs">Need {item.price - tp} more TP</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
