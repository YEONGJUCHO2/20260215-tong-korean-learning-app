import Link from 'next/link';

export default function Footer() {
    const footerLinks = {
        'For Students': [
            { label: 'Find Teachers', href: '/teachers' },
            { label: 'How It Works', href: '/#how-it-works' },
            { label: 'Pricing', href: '/#pricing' },
            { label: 'Community', href: '/community' },
            { label: 'RPG Avatar', href: '/avatar' },
        ],
        'For Teachers': [
            { label: 'Start Teaching', href: '/signup' },
            { label: 'Teacher Dashboard', href: '/dashboard' },
            { label: 'Resources', href: '#' },
            { label: 'FAQ', href: '#' },
        ],
        'Company': [
            { label: 'About TONG', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Contact', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
        ],
    };

    return (
        <footer style={{ background: '#07071a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-extrabold" style={{ background: 'linear-gradient(135deg, #6C5CE7, #A29BFE)' }}>
                                통
                            </div>
                            <span className="text-xl font-extrabold text-white tracking-tight">TONG</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Speak Korean. 말이 통하다.<br />
                            Learn through K-Culture with native teachers.
                        </p>
                        <div className="flex gap-3 text-gray-500">
                            {['𝕏', 'in', 'IG'].map((icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-white text-sm font-semibold mb-4">{title}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-gray-500 hover:text-purple-400 text-sm transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="text-gray-600 text-sm">© 2026 TONG (통). All rights reserved.</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <span>🌐</span>
                        <select className="bg-transparent text-gray-500 text-sm outline-none cursor-pointer">
                            <option>English</option>
                            <option>한국어</option>
                        </select>
                    </div>
                </div>
            </div>
        </footer>
    );
}
