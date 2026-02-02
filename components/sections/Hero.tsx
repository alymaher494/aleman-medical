'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MoveRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function Hero({ lang, dict }: { lang: string, dict: any }) {
    const isRtl = lang === 'ar'

    const images = [
        { src: 'https://images.unsplash.com/photo-1579154273821-ad99159ad503?q=80&w=1920&auto=format&fit=crop', alt: 'Pharmaceutical Laboratory' },
        { src: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1920&auto=format&fit=crop', alt: 'Laboratory Scientist' },
        { src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1920&auto=format&fit=crop', alt: 'Medical Specialist' },
        { src: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=1920&auto=format&fit=crop', alt: 'Pharmacy Production' },
        { src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1920&auto=format&fit=crop', alt: 'Biotechnology Research' },
    ]

    return (
        <section className="relative pt-32 pb-20 md:pt-10 md:pb-32 overflow-hidden bg-gradient-to-b from-brand-bg to-white">

            {/* Content Layer */}
            <div className="container mx-auto px-6 relative z-10 py-16">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

                    {/* Top Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {dict?.badge || (lang === 'ar' ? 'نخدم القطاع الطبي والدوائي منذ 1995' : 'Serving Medical & Pharma Sectors Since 1995')}
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.3] tracking-tight bg-gradient-to-l from-primary to-primary-light bg-clip-text text-transparent"
                    >
                        {dict?.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-500 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
                    >
                        {dict?.subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Link href={`/${lang}/products`}>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-10 py-4.5 bg-primary text-white rounded-2xl font-bold flex items-center gap-3 shadow-2xl shadow-primary/20 transition-all font-cairo"
                            >
                                {dict?.cta_primary}
                                <ArrowLeft size={20} className={isRtl ? '' : 'rotate-180'} />
                            </motion.button>
                        </Link>
                        <Link href={`/${lang}/contact`}>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-10 py-4 bg-primary-light hover:bg-primary text-white rounded-full font-bold flex items-center gap-3 shadow-xl shadow-blue-100 transition-all text-lg font-cairo"
                            >
                                {dict?.cta_secondary}
                                <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* High-End Slider Layer */}
            <div className="w-full relative px-0 group">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    centeredSlides={true}
                    loop={true}
                    spaceBetween={40}
                    slidesPerView={1.25}
                    speed={800}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-drag-btn',
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 1.15,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 1.25,
                            spaceBetween: 40,
                        },
                    }}
                    className="hero-full-slider !overflow-visible"
                >
                    {images.map((img, idx) => (
                        <SwiperSlide key={idx} className="transition-all duration-700 ease-in-out">
                            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[40px] md:rounded-[60px] shadow-2xl shadow-black/10">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    priority={idx === 0}
                                    quality={90}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 85vw"
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Drag Indicator */}
                <button
                    className={`swiper-drag-btn absolute ${isRtl ? 'left-[12%] md:left-[15%]' : 'right-[12%] md:right-[15%]'} top-1/2 -translate-y-1/2 z-30 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white rounded-full shadow-2xl text-gray-900 hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer`}
                    aria-label="Next slide"
                >
                    <MoveRight size={32} className={isRtl ? 'rotate-180' : ''} />
                </button>
            </div>

        </section>
    )
}
