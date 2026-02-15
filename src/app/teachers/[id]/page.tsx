'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, MessageCircle, BookOpen, Globe, Calendar, Video, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';

// 서버 연동 전 mock 데이터
const TEACHERS: Record<string, {
    id: number; name: string; avatar: string; rating: number; reviews: number; price: number;
    tags: string[]; specialties: string[]; bio: string; students: number; lessons: number;
    responseTime: string; languages: string[]; level: string; about: string;
}> = {
    '1': { id: 1, name: 'Min-ji Kim', avatar: '👩‍🏫', rating: 4.9, reviews: 127, price: 18, tags: ['Conversation', 'K-POP', 'Beginner-Friendly'], specialties: ['K-POP Lyrics', 'Daily Conversation', 'Pronunciation'], bio: 'Certified Korean teacher with 5 years experience.', students: 89, lessons: 1240, responseTime: '< 1h', languages: ['Korean', 'English', 'Japanese'], level: 'All Levels', about: 'Hi! I\'m Min-ji 🌸 I\'ve been teaching Korean for 5 years and I absolutely love helping students learn through K-POP! I believe language learning should be fun and natural. In my classes, we sing along to the latest K-POP hits, break down lyrics, and learn grammar through real conversations. Whether you\'re a complete beginner or intermediate learner, I\'ll customize each lesson to your interests and pace.' },
    '2': { id: 2, name: 'Jun-ho Park', avatar: '👨‍🏫', rating: 4.8, reviews: 94, price: 22, tags: ['Business', 'Advanced', 'TOPIK'], specialties: ['Business Korean', 'TOPIK Prep', 'Formal Speech'], bio: 'MBA graduate, 7 years in corporate Korean training.', students: 65, lessons: 890, responseTime: '< 2h', languages: ['Korean', 'English', 'Chinese'], level: 'Intermediate+', about: 'I specialize in business Korean and TOPIK preparation. With my MBA background and 7 years of corporate training experience, I help professionals master formal Korean communication for the workplace.' },
    '3': { id: 3, name: 'Soo-young Lee', avatar: '👩‍💼', rating: 5.0, reviews: 203, price: 25, tags: ['K-Drama', 'Conversation', 'Culture'], specialties: ['K-Drama Scenes', 'Slang & Expressions', 'Cultural Context'], bio: 'Former drama scriptwriter!', students: 142, lessons: 2100, responseTime: '< 30m', languages: ['Korean', 'English'], level: 'All Levels', about: 'As a former K-Drama scriptwriter, I bring real scripts and scenes into our lessons! Learn natural Korean expressions, understand cultural nuances, and have fun discussing your favorite dramas.' },
    '4': { id: 4, name: 'Hyun-woo Choi', avatar: '🧑‍🏫', rating: 4.7, reviews: 56, price: 15, tags: ['Beginner', 'Travel', 'Hangul'], specialties: ['Hangul Basics', 'Travel Korean', 'Survival Phrases'], bio: 'Patient teacher for absolute beginners.', students: 45, lessons: 380, responseTime: '< 1h', languages: ['Korean', 'English', 'Spanish'], level: 'Beginner', about: 'If you\'re just starting your Korean journey, I\'m here to help! I specialize in teaching Hangul from scratch and building your confidence with essential survival phrases.' },
    '5': { id: 5, name: 'Yuna Kang', avatar: '👩‍🎓', rating: 4.9, reviews: 178, price: 20, tags: ['K-POP', 'Pronunciation', 'Fun'], specialties: ['K-POP Dance & Lyrics', 'Pronunciation Coach', 'Song Translation'], bio: 'Former backup dancer turned teacher!', students: 110, lessons: 1560, responseTime: '< 45m', languages: ['Korean', 'English'], level: 'All Levels', about: 'From the stage to the classroom! I combine my passion for K-POP with expert pronunciation coaching. We\'ll learn Korean through music, rhythm, and lots of fun!' },
    '6': { id: 6, name: 'Dong-hyuk Shin', avatar: '👨‍💻', rating: 4.6, reviews: 42, price: 16, tags: ['Tech', 'Gaming', 'Casual'], specialties: ['Gaming Korean', 'Tech Vocabulary', 'Internet Slang'], bio: 'Gamer & tech nerd!', students: 38, lessons: 290, responseTime: '< 2h', languages: ['Korean', 'English'], level: 'Beginner ~ Intermediate', about: 'Let\'s learn Korean through games and tech! I use game streams, memes, and Korean internet culture to make learning engaging and relevant for digital-native students.' },
};

const DURATIONS = [
    { min: 10, price: 5, label: '10 min', desc: 'Quick chat' },
    { min: 20, price: 10, label: '20 min', desc: 'Focus session' },
    { min: 30, price: 18, label: '30 min', desc: 'Standard' },
    { min: 50, price: 28, label: '50 min', desc: 'Deep dive' },
];

const REVIEW_SAMPLES = [
    { name: 'Sarah M.', rating: 5, date: '2 days ago', text: 'Amazing lesson! We practiced ordering food and it was so natural and fun.' },
    { name: 'James K.', rating: 5, date: '1 week ago', text: 'Best Korean teacher I\'ve had. The K-POP lyrics method really works!' },
    { name: 'Yuki T.', rating: 4, date: '2 weeks ago', text: 'Very patient and encouraging. Good for beginners who are nervous.' },
];

function generateCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
}

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '19:00', '19:30', '20:00', '20:30'];

export default function TeacherDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const teacher = TEACHERS[id];
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDuration, setSelectedDuration] = useState(30);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [bookingStep, setBookingStep] = useState(1); // 1: calendar, 2: confirm

    if (!teacher) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a1a' }}>
                <div className="text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h2 className="text-xl font-bold text-white mb-2">Teacher not found</h2>
                    <Link href="/teachers" className="text-purple-400 hover:text-purple-300 transition">← Back to teachers</Link>
                </div>
            </div>
        );
    }

    const calendarDays = generateCalendarDays(currentYear, currentMonth);
    const today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // 가용 시간 (더미: 짝수 일만 가능)
    const isAvailable = (day: number) => {
        const d = new Date(currentYear, currentMonth, day);
        return d >= today && day % 2 === 0; // mock
    };

    const durationData = DURATIONS.find(d => d.min === selectedDuration) || DURATIONS[2];

    return (
        <div className="min-h-screen px-4 py-8" style={{ background: 'linear-gradient(180deg, #0d0d2b 0%, #0a0a1a 100%)' }}>
            <div className="max-w-6xl mx-auto">
                {/* Back */}
                <Link href="/teachers" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition">
                    <ArrowLeft size={16} /> Back to teachers
                </Link>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Teacher Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.2), rgba(162,155,254,0.1))' }}>
                                    {teacher.avatar}
                                </div>
                                <h1 className="text-2xl font-bold text-white">{teacher.name}</h1>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-white font-medium">{teacher.rating}</span>
                                    <span className="text-gray-500 text-sm">({teacher.reviews} reviews)</span>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-400"><span>🎓 Level</span><span className="text-white">{teacher.level}</span></div>
                                <div className="flex justify-between text-gray-400"><span>📚 Lessons</span><span className="text-white">{teacher.lessons}</span></div>
                                <div className="flex justify-between text-gray-400"><span>👥 Students</span><span className="text-white">{teacher.students}</span></div>
                                <div className="flex justify-between text-gray-400"><span>⚡ Response</span><span className="text-white">{teacher.responseTime}</span></div>
                                <div className="flex justify-between text-gray-400"><span>🌐 Languages</span><span className="text-white">{teacher.languages.join(', ')}</span></div>
                            </div>

                            <div className="flex gap-2 mt-5">
                                <Link href="/messages" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-300 transition hover:bg-white/5" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <MessageCircle size={16} /> Message
                                </Link>
                                <button className="p-2.5 rounded-xl text-gray-400 hover:text-pink-400 transition" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Heart size={18} />
                                </button>
                            </div>
                        </div>

                        {/* About */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{teacher.about}</p>
                        </div>

                        {/* Specialties */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="text-lg font-semibold text-white mb-3">Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                                {teacher.specialties.map(s => (
                                    <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(108,92,231,0.15)', color: '#A29BFE' }}>{s}</span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 className="text-lg font-semibold text-white mb-4">Reviews</h3>
                            <div className="space-y-4">
                                {REVIEW_SAMPLES.map((r, i) => (
                                    <div key={i} className="pb-4" style={{ borderBottom: i < REVIEW_SAMPLES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-white text-sm font-medium">{r.name}</span>
                                            <span className="text-gray-500 text-xs">{r.date}</span>
                                        </div>
                                        <div className="flex gap-0.5 mb-2">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star key={j} size={12} className={j < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                                            ))}
                                        </div>
                                        <p className="text-gray-400 text-sm">{r.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl p-6 sticky top-24" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <Calendar size={20} className="text-purple-400" />
                                Book a Lesson
                            </h2>

                            {bookingStep === 1 ? (
                                <div className="space-y-6">
                                    {/* Duration */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-300 mb-3 block">Lesson Duration</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {DURATIONS.map(d => (
                                                <button
                                                    key={d.min}
                                                    onClick={() => setSelectedDuration(d.min)}
                                                    className="p-3 rounded-xl text-center transition-all"
                                                    style={{
                                                        background: selectedDuration === d.min ? 'rgba(108,92,231,0.2)' : 'rgba(255,255,255,0.04)',
                                                        border: `1px solid ${selectedDuration === d.min ? 'rgba(108,92,231,0.5)' : 'rgba(255,255,255,0.06)'}`,
                                                    }}
                                                >
                                                    <div className="text-white font-bold">{d.label}</div>
                                                    <div className="text-gray-500 text-xs">${d.price}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Calendar */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <button onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); } else setCurrentMonth(m => m - 1); }} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 transition">
                                                <ChevronLeft size={18} />
                                            </button>
                                            <span className="text-white font-medium">{monthNames[currentMonth]} {currentYear}</span>
                                            <button onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); } else setCurrentMonth(m => m + 1); }} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 transition">
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                                <div key={d} className="text-center text-gray-500 text-xs py-2">{d}</div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {calendarDays.map((day, i) => (
                                                <button
                                                    key={i}
                                                    disabled={!day || !isAvailable(day)}
                                                    onClick={() => day && setSelectedDate(day)}
                                                    className={`aspect-square rounded-lg text-sm font-medium transition-all ${!day ? 'invisible' :
                                                            selectedDate === day ? 'text-white' :
                                                                isAvailable(day) ? 'text-gray-300 hover:bg-white/5' :
                                                                    'text-gray-700 cursor-not-allowed'
                                                        }`}
                                                    style={{
                                                        background: selectedDate === day ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' :
                                                            day && isAvailable(day) ? 'rgba(255,255,255,0.03)' : 'transparent',
                                                    }}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    {selectedDate && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-300 mb-3 block">
                                                Available Times — {monthNames[currentMonth]} {selectedDate}
                                            </label>
                                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                                {TIME_SLOTS.map(time => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className="py-2.5 rounded-lg text-sm font-medium transition-all"
                                                        style={{
                                                            background: selectedTime === time ? 'linear-gradient(135deg, #6C5CE7, #A29BFE)' : 'rgba(255,255,255,0.04)',
                                                            border: `1px solid ${selectedTime === time ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
                                                            color: selectedTime === time ? 'white' : '#9ca3af',
                                                        }}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Book Button */}
                                    <button
                                        disabled={!selectedDate || !selectedTime}
                                        onClick={() => setBookingStep(2)}
                                        className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                                        style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}
                                    >
                                        Continue to Confirm
                                    </button>
                                </div>
                            ) : (
                                /* Confirmation Step */
                                <div className="space-y-6">
                                    <button onClick={() => setBookingStep(1)} className="text-gray-400 hover:text-white text-sm transition">← Change time</button>

                                    <div className="rounded-xl p-5 space-y-4" style={{ background: 'rgba(108,92,231,0.1)', border: '1px solid rgba(108,92,231,0.15)' }}>
                                        <h3 className="text-white font-semibold">Booking Summary</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between text-gray-400"><span>Teacher</span><span className="text-white">{teacher.name}</span></div>
                                            <div className="flex justify-between text-gray-400"><span>Date</span><span className="text-white">{monthNames[currentMonth]} {selectedDate}, {currentYear}</span></div>
                                            <div className="flex justify-between text-gray-400"><span>Time</span><span className="text-white">{selectedTime}</span></div>
                                            <div className="flex justify-between text-gray-400"><span>Duration</span><span className="text-white">{durationData.label}</span></div>
                                            <div className="flex justify-between text-gray-400 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}><span className="font-medium">Total</span><span className="text-white font-bold text-lg">${durationData.price}</span></div>
                                        </div>
                                    </div>

                                    <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(0,210,211,0.1)', border: '1px solid rgba(0,210,211,0.15)' }}>
                                        <Video size={18} className="text-cyan-400 flex-shrink-0" />
                                        <p className="text-gray-300 text-sm">A Google Meet link will be auto-generated and shared with you and the teacher.</p>
                                    </div>

                                    <button
                                        className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
                                        style={{ background: 'linear-gradient(135deg, #6C5CE7, #FF6B9D)' }}
                                        onClick={() => alert('Booking confirmed! 🎉 (Demo)')}
                                    >
                                        <Check size={18} /> Confirm Booking — ${durationData.price}
                                    </button>

                                    <p className="text-gray-500 text-xs text-center">Free cancellation up to 2 hours before the lesson</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
