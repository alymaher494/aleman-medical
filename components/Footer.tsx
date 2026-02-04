'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer({ dict, lang = 'ar' }: { dict?: any, lang?: string }) {
    const currentYear = new Date().getFullYear()
    const isRtl = lang === 'ar'

    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Column 1: Brand & About */}
                    <div className="lg:col-span-4 text-start">
                        <Link href={`/${lang}`} className="inline-block mb-8">
                            <div className="relative h-20 w-48">
                                <Image
                                    src="/logo.webp"
                                    alt="Al Eman Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-8 font-medium text-sm">
                            {dict?.description || 'الأيمان للخدمات الطبية والعلمية..'}
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                                <Linkedin size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                                <Facebook size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-span-2 text-start">
                        <h4 className="text-lg font-bold mb-8 font-cairo">
                            {dict?.quick_links || (isRtl ? 'روابط سريعة' : 'Quick Links')}
                        </h4>
                        <ul className="space-y-4">
                            {['about', 'services', 'blog', 'contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${lang}/${item === 'about' ? 'about' : item === 'services' ? 'services' : item === 'blog' ? 'blog' : 'contact'}`} className="text-gray-400 hover:text-primary-light transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary" />
                                        {dict?.items?.[item] || item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Specializations (SEO Focus) */}
                    <div className="lg:col-span-3 text-start">
                        <h4 className="text-lg font-bold mb-8 font-cairo">
                            {dict?.specializations || (isRtl ? 'تخصصاتنا' : 'Specializations')}
                        </h4>
                        <ul className="space-y-4">
                            {['chemicals', 'strains', 'equipment', 'setup'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 hover:text-primary-light transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary" />
                                        {dict?.specs?.[item] || item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="lg:col-span-3 text-start">
                        <h4 className="text-lg font-bold mb-8 font-cairo">
                            {dict?.contact_info || (isRtl ? 'معلومات التواصل' : 'Contact Info')}
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary-light flex-shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div className="text-start">
                                    <span className="block text-xs text-gray-500 font-bold uppercase mb-1">{dict?.contact?.hq_label || (isRtl ? 'المقر الرئيسي' : 'Headquarters')}</span>
                                    <span className="text-sm text-gray-300">{dict?.contact?.hq_val || 'Cairo, Egypt'}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary-light flex-shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div className="text-start">
                                    <span className="block text-xs text-gray-500 font-bold uppercase mb-1">{dict?.contact?.phone_label || (isRtl ? 'اتصل بنا' : 'Call Us')}</span>
                                    <span className="text-sm text-gray-300" dir="ltr">{dict?.contact?.phone_val || '+20 123 456 789'}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary-light flex-shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div className="text-start">
                                    <span className="block text-xs text-gray-500 font-bold uppercase mb-1">{dict?.contact?.email_label || (isRtl ? 'البريد الإلكتروني' : 'Email Us')}</span>
                                    <span className="text-sm text-gray-300">{dict?.contact?.email_val || 'sales@al-eman.com'}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
                    <div className="text-xs text-gray-500 font-medium">
                        {dict?.copyright?.replace('{year}', currentYear.toString()) || (isRtl ? `© ${currentYear} جميع الحقوق محفوظة` : `© ${currentYear} All rights reserved`)}
                    </div>
                    <div className="flex gap-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <Link href="#" className="hover:text-white transition-colors">{dict?.privacy || (isRtl ? 'الخصوصية' : 'Privacy')}</Link>
                        <Link href="#" className="hover:text-white transition-colors">{dict?.terms || (isRtl ? 'الشروط' : 'Terms')}</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}
