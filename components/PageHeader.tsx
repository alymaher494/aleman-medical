'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, Home } from 'lucide-react'

interface PageHeaderProps {
    title: string
    subtitle?: string
    breadcrumb: Array<{ label: string; href?: string }>
    lang?: string
}

export default function PageHeader({ title, subtitle, breadcrumb, lang = 'ar' }: PageHeaderProps) {
    const isRtl = lang === 'ar'

    return (
        <div className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-dark to-primary opacity-95" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385180-1ea55f6196e1?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Breadcrumb */}
                    <nav className="flex items-center justify-center gap-2 text-sm font-medium text-gray-300 mb-6">
                        <Link href={`/${lang}`} className="hover:text-white transition-colors flex items-center gap-1">
                            <Home size={14} />
                            {isRtl ? 'الرئيسية' : 'Home'}
                        </Link>
                        {breadcrumb.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <ChevronLeft size={14} className={`text-gray-500 ${isRtl ? '' : 'rotate-180'}`} />
                                {item.href ? (
                                    <Link href={item.href} className="hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-primary-light">{item.label}</span>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-black text-white font-cairo mb-4 drop-shadow-lg">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
