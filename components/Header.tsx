'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header({
    lang = 'ar',
    navigation,
    header
}: {
    lang?: string,
    navigation?: any,
    header?: any
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()
    const isRtl = lang === 'ar'

    // Check if we're on the homepage (only /ar or /en)
    const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`

    // Only apply dark header styling (white text/logo) on internal pages when not scrolled
    const useDarkHeader = !isHomePage && !isScrolled

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: navigation?.home || (isRtl ? 'الرئيسية' : 'Home'), href: `/${lang}` },
        { name: navigation?.about || (isRtl ? 'من نحن' : 'About Us'), href: `/${lang}/about` },
        { name: navigation?.services || (isRtl ? 'خدماتنا' : 'Services'), href: `/${lang}/services` },
        { name: navigation?.products || (isRtl ? 'المنتجات' : 'Products'), href: `/${lang}/products` },
        { name: navigation?.blog || (isRtl ? 'المدونة' : 'Blog'), href: `/${lang}/blog` },
        { name: navigation?.contact || (isRtl ? 'تواصل معنا' : 'Contact Us'), href: `/${lang}/contact` },
    ]

    const redirectedPathName = (locale: string) => {
        if (!pathname) return '/'
        const segments = pathname.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    const targetLang = lang === 'ar' ? 'en' : 'ar'
    const targetLabel = lang === 'ar' ? 'English' : 'العربية'

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">

                    <Link href={`/${lang}`} className="flex items-center">
                        <img
                            src="/logo.webp"
                            alt="Al Eman Logo"
                            className={`h-14 md:h-16 w-auto object-contain transition-all duration-300 ${useDarkHeader ? 'brightness-0 invert' : ''}`}
                        />
                    </Link>

                    {/* Center Navigation (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-medium transition-colors text-sm ${useDarkHeader ? 'text-white hover:text-white/80' : 'text-gray-600 hover:text-primary'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        <Link href={redirectedPathName(targetLang)} className={`hidden md:flex items-center gap-2 font-medium text-sm transition-colors px-3 py-2 rounded-full ${useDarkHeader ? 'text-white hover:text-white/80 hover:bg-white/10' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>
                            <Globe size={16} />
                            <span>{targetLabel}</span>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all"
                        >
                            {header?.get_quote || 'ابدأ الآن'}
                        </motion.button>

                        {/* Mobile Toggle */}
                        <button
                            className={`lg:hidden p-2 transition-colors ${useDarkHeader ? 'text-white' : 'text-gray-600'}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-50 overflow-hidden"
                    >
                        <div className={`container mx-auto px-6 py-8 flex flex-col gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-700 hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                                <Link href={redirectedPathName(targetLang)} className="flex items-center gap-2 text-gray-600">
                                    <Globe size={18} />
                                    <span>{targetLabel === 'English' ? 'English Version' : 'النسخة العربية'}</span>
                                </Link>
                                <button className="bg-primary text-white py-4 rounded-2xl font-bold shadow-lg">
                                    {header?.get_quote || 'ابدأ الآن'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
