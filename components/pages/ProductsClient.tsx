'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import { Search, Filter, ChevronDown, Check, X, ArrowLeft } from 'lucide-react'

export default function ProductsClient({ dict, lang, products }: { dict: any, lang: string, products: any[] }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const isRtl = lang === 'ar'

    const categories = [
        isRtl ? 'السلالات المرجعية' : 'Reference Strains',
        isRtl ? 'الأجهزة والمعدات' : 'Equipment',
        isRtl ? 'الكيماويات والكواشف' : 'Chemicals',
        isRtl ? 'المستهلكات المخبرية' : 'Consumables',
        isRtl ? 'الأثاث المخبري' : 'Lab Furniture'
    ]

    const brands = ['ATCC', 'Sigma-Aldrich', 'Merck', 'Thermo Fisher', 'Mettler Toledo', 'Olympus', 'Memmert']

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.slug.includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
        return matchesSearch && matchesCategory && matchesBrand
    })

    return (
        <main className="bg-gray-50 min-h-screen">
            <Header lang={lang} navigation={dict?.navigation} header={dict?.header} />
            <PageHeader
                title={dict?.products_section?.title || 'كتالوج المنتجات'}
                subtitle={dict?.products_section?.description || 'تصفح مجموعتنا...'}
                breadcrumb={[{ label: dict?.products_section?.title || 'المنتجات' }]}
                lang={lang}
            />

            <div className="container mx-auto px-6 py-12">
                <div className={`flex flex-col lg:flex-row gap-8`}>

                    {/* SIDEBAR FILTERS */}
                    <aside className={`lg:w-1/4 ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}`}>
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <div className="flex items-center justify-between lg:hidden mb-6">
                                <h2 className="text-xl font-bold font-cairo">{isRtl ? 'تصفية المنتجات' : 'Filter Products'}</h2>
                                <button onClick={() => setShowFilters(false)}><X /></button>
                            </div>

                            <div className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                                <h3 className="font-bold text-gray-900 mb-4 font-cairo text-lg border-b border-gray-100 pb-2">{isRtl ? 'التصنيفات' : 'Categories'}</h3>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat} className={`flex items-center gap-3 cursor-pointer group ${isRtl ? 'flex-row' : 'flex-row'}`}>
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-primary border-primary text-white' : 'border-gray-300 group-hover:border-primary'}`}>
                                                {selectedCategories.includes(cat) && <Check size={14} />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => {
                                                    if (selectedCategories.includes(cat)) setSelectedCategories(prev => prev.filter(c => c !== cat))
                                                    else setSelectedCategories(prev => [...prev, cat])
                                                }}
                                            />
                                            <span className={`text-sm font-medium transition-colors ${selectedCategories.includes(cat) ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                                <h3 className="font-bold text-gray-900 mb-4 font-cairo text-lg border-b border-gray-100 pb-2">{isRtl ? 'العلامة التجارية' : 'Brands'}</h3>
                                <div className="space-y-3">
                                    {brands.map(brand => (
                                        <label key={brand} className={`flex items-center gap-3 cursor-pointer group ${isRtl ? 'flex-row' : 'flex-row'}`}>
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-primary border-primary text-white' : 'border-gray-300 group-hover:border-primary'}`}>
                                                {selectedBrands.includes(brand) && <Check size={14} />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => {
                                                    if (selectedBrands.includes(brand)) setSelectedBrands(prev => prev.filter(b => b !== brand))
                                                    else setSelectedBrands(prev => [...prev, brand])
                                                }}
                                            />
                                            <span className={`text-sm font-medium transition-colors ${selectedBrands.includes(brand) ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="flex-1">
                        <div className={`bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row items-center gap-4`}>
                            <button className={`lg:hidden flex items-center gap-2 text-gray-600 font-bold bg-gray-50 px-4 py-2 rounded-xl`} onClick={() => setShowFilters(true)}>
                                <Filter size={18} /> {isRtl ? 'تصفية' : 'Filter'}
                            </button>

                            <div className="flex-1 w-full relative">
                                <input
                                    type="text"
                                    placeholder={isRtl ? "ابحث باسم المنتج..." : "Search for products..."}
                                    className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm focus:outline-none focus:border-primary focus:border-opacity-50 transition-all font-medium text-start`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
                            </div>

                            <div className={`flex items-center gap-3 w-full md:w-auto ${isRtl ? 'flex-row' : 'flex-row'}`}>
                                <span className="text-sm font-bold text-gray-500 whitespace-nowrap hidden md:block">{isRtl ? 'ترتيب حسب:' : 'Sort by:'}</span>
                                <div className="relative w-full md:w-48">
                                    <select className={`w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl py-3 ${isRtl ? 'pr-4 pl-10' : 'pl-4 pr-10'} text-sm font-bold text-gray-700 focus:outline-none focus:border-primary cursor-pointer text-start`}>
                                        <option>{isRtl ? 'الأحدث مضافاً' : 'Latest'}</option>
                                        <option>{isRtl ? 'الاسم (أ-ي)' : 'Name (A-Z)'}</option>
                                    </select>
                                    <ChevronDown className={`absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none`} size={16} />
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 animate-pulse">
                                        <div className="bg-gray-200 h-48 rounded-2xl mb-4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                                        <div className="h-10 bg-gray-200 rounded-xl" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence mode='popLayout'>
                                    {filteredProducts.map(product => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-white rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl hover:translate-y-[-5px] transition-all group overflow-hidden"
                                        >
                                            <Link href={`/${lang}/products/${product.slug}`} className="block h-full flex flex-col">
                                                <div className="aspect-square bg-gray-50 p-6 relative overflow-hidden">
                                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                                    <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`}>
                                                        <span className="bg-white/90 backdrop-blur border border-primary/10 text-primary-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                                            {product.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={`p-6 flex flex-col flex-grow ${isRtl ? 'text-right' : 'text-left'}`}>
                                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{product.brand}</span>
                                                    <h3 className="text-gray-900 font-bold text-lg mb-4 line-clamp-2 leading-tight font-cairo group-hover:text-primary transition-colors">{product.title}</h3>
                                                    <div className="mt-auto flex items-center justify-between">
                                                        <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">{product.price}</span>
                                                        <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                            <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400"><Search size={32} /></div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">{isRtl ? 'لم يتم العثور على منتجات' : 'No products found'}</h3>
                                <button onClick={() => { setSearchQuery(''); setSelectedCategories([]); setSelectedBrands([]); }} className="mt-6 text-primary font-bold hover:underline">{isRtl ? 'مسح جميع الفلاتر' : 'Clear all filters'}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer dict={dict?.footer} lang={lang} />
        </main>
    )
}
