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
    const days: (string | number | null)[] = []; // Changed type to allow string for days
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
            <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
                <div className="text-center">
                    <div className="text-5xl mb-4">🔍</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Teacher not found</h2>
                    <Link href="/teachers" className="text-purple-600 hover:text-purple-700 transition font-medium">← Back to teachers</Link>
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
        <div className="min-h-screen px-4 py-8 bg-white relative">

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Back */}
                <Link href="/teachers" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 text-sm mb-6 transition font-medium group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to teachers
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Teacher Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 rounded-2xl mx-auto mb-4 flex items-center justify-center text-5xl bg-gradient-to-tr from-purple-100 to-indigo-50 shadow-inner">
                                    {teacher.avatar}
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">{teacher.name}</h1>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-gray-900 font-bold">{teacher.rating}</span>
                                    <span className="text-gray-400 text-sm">({teacher.reviews} reviews)</span>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm border-t border-gray-100 pt-5">
                                <div className="flex justify-between text-gray-500"><span>🎓 Level</span><span className="text-gray-900 font-medium">{teacher.level}</span></div>
                                <div className="flex justify-between text-gray-500"><span>📚 Lessons</span><span className="text-gray-900 font-medium">{teacher.lessons}</span></div>
                                <div className="flex justify-between text-gray-500"><span>👥 Students</span><span className="text-gray-900 font-medium">{teacher.students}</span></div>
                                <div className="flex justify-between text-gray-500"><span>⚡ Response</span><span className="text-gray-900 font-medium">{teacher.responseTime}</span></div>
                                <div className="flex justify-between text-gray-500"><span>🌐 Languages</span><span className="text-gray-900 font-medium">{teacher.languages.join(', ')}</span></div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <Link href="/messages" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 transition border border-purple-100">
                                    <MessageCircle size={18} /> Message
                                </Link>
                                <button className="p-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition border border-gray-100">
                                    <Heart size={20} />
                                </button>
                            </div>
                        </div>

                        {/* About */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <BookOpen size={18} className="text-purple-500" /> About
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{teacher.about}</p>
                        </div>

                        {/* Specialties */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Star size={18} className="text-purple-500" /> Specialties
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {teacher.specialties.map(s => (
                                    <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-3xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews</h3>
                            <div className="space-y-4">
                                {REVIEW_SAMPLES.map((r, i) => (
                                    <div key={i} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-gray-900 text-sm font-bold">{r.name}</span>
                                            <span className="text-gray-400 text-xs">{r.date}</span>
                                        </div>
                                        <div className="flex gap-0.5 mb-2">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star key={j} size={12} className={j < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-snug">{r.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                    <Calendar size={20} />
                                </span>
                                Book a Lesson
                            </h2>

                            {bookingStep === 1 ? (
                                <div className="space-y-8">
                                    {/* Duration */}
                                    <div>
                                        <label className="text-sm font-bold text-gray-700 mb-3 block">Lesson Duration</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {DURATIONS.map(d => (
                                                <button
                                                    key={d.min}
                                                    onClick={() => setSelectedDuration(d.min)}
                                                    className={`p-4 rounded-2xl text-center transition-all border-2 ${selectedDuration === d.min
                                                        ? 'border-purple-600 bg-purple-50 ring-4 ring-purple-100'
                                                        : 'border-gray-100 bg-white hover:border-purple-200 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className={`font-bold text-lg mb-1 ${selectedDuration === d.min ? 'text-purple-700' : 'text-gray-700'}`}>
                                                        {d.label}
                                                    </div>
                                                    <div className={`text-sm ${selectedDuration === d.min ? 'text-purple-600' : 'text-gray-500'}`}>
                                                        ${d.price}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Calendar */}
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); } else setCurrentMonth(m => m - 1); }}
                                                className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <span className="text-gray-900 font-bold text-lg">{monthNames[currentMonth]} {currentYear}</span>
                                            <button
                                                onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); } else setCurrentMonth(m => m + 1); }}
                                                className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                                <div key={d} className="text-center text-gray-400 text-xs font-bold py-2 uppercase tracking-wide">{d}</div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-7 gap-2">
                                            {calendarDays.map((day, i) => (
                                                <button
                                                    key={i}
                                                    disabled={!day || (typeof day === 'number' && !isAvailable(day))}
                                                    onClick={() => typeof day === 'number' && setSelectedDate(day)}
                                                    className={`aspect-square rounded-xl text-sm font-bold transition-all relative ${!day ? 'invisible' :
                                                        selectedDate === day ? 'text-white bg-purple-600 shadow-md transform scale-105' :
                                                            (typeof day === 'number' && isAvailable(day)) ? 'text-gray-700 hover:bg-purple-50 hover:text-purple-600' :
                                                                'text-gray-300 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {day}
                                                    {typeof day === 'number' && isAvailable(day) && selectedDate !== day && (
                                                        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full"></span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Time Slots */}
                                    {selectedDate && (
                                        <div className="animate-fade-in-up">
                                            <label className="text-sm font-bold text-gray-700 mb-3 block">
                                                Available Times — {monthNames[currentMonth]} {selectedDate}
                                            </label>
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                {TIME_SLOTS.map(time => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-3 rounded-xl text-sm font-semibold transition-all border ${selectedTime === time
                                                            ? 'bg-gray-900 text-white border-gray-900 shadow-lg transform -translate-y-0.5'
                                                            : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-600'
                                                            }`}
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
                                        className="w-full py-4 rounded-2xl font-bold text-white transition-all hover:bg-purple-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 bg-purple-600 text-lg mt-4"
                                    >
                                        Continue to Confirm
                                    </button>
                                </div>
                            ) : (
                                /* Confirmation Step */
                                <div className="space-y-8 animate-fade-in-up">
                                    <button onClick={() => setBookingStep(1)} className="text-gray-500 hover:text-gray-900 text-sm transition font-medium flex items-center gap-1">
                                        <ArrowLeft size={14} /> Change time
                                    </button>

                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                                        <h3 className="text-gray-900 font-bold text-lg">Booking Summary</h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between items-center"><span className="text-gray-500">Teacher</span><span className="text-gray-900 font-semibold">{teacher.name}</span></div>
                                            <div className="flex justify-between items-center"><span className="text-gray-500">Date</span><span className="text-gray-900 font-semibold">{monthNames[currentMonth]} {selectedDate}, {currentYear}</span></div>
                                            <div className="flex justify-between items-center"><span className="text-gray-500">Time</span><span className="text-gray-900 font-semibold">{selectedTime}</span></div>
                                            <div className="flex justify-between items-center"><span className="text-gray-500">Duration</span><span className="text-gray-900 font-semibold">{durationData.label}</span></div>
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-200"><span className="font-bold text-gray-900">Total</span><span className="text-purple-600 font-bold text-xl">${durationData.price}</span></div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3 border border-blue-100">
                                        <Video size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-blue-700 text-sm font-medium leading-relaxed">A Google Meet link will be auto-generated and shared with you and the teacher via email and dashboard.</p>
                                    </div>

                                    <button
                                        className="w-full py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
                                        style={{ background: 'linear-gradient(135deg, #6C5CE7, #8e44ad)' }}
                                        onClick={() => alert('Booking confirmed! 🎉 (Demo)')}
                                    >
                                        <Check size={20} /> Confirm Booking — ${durationData.price}
                                    </button>

                                    <p className="text-gray-400 text-xs text-center font-medium">Free cancellation up to 2 hours before the lesson</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
