'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    ChevronLeft,
    Home,
    CheckCircle,
    FileText,
    Download,
    Shield,
    MessageCircle,
    ShoppingCart,
    Share2,
    ChevronRight
} from 'lucide-react'

export default function ProductClient({ product, dict, lang }: { product: any, dict: any, lang: string }) {
    const [activeTab, setActiveTab] = useState('specs')
    const [activeImage, setActiveImage] = useState(0)
    const isRtl = lang === 'ar'

    return (
        <>
            {/* Simple Breadcrumb Bar */}
            <div className="bg-gray-50 py-4 border-b border-gray-100 mt-[80px]">
                <div className="container mx-auto px-6 flex items-center gap-2 text-sm text-gray-500">
                    <Link href={`/${lang}`} className="hover:text-primary"><Home size={14} /></Link>
                    {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    <Link href={`/${lang}/products`} className="hover:text-primary">
                        {isRtl ? 'المنتجات' : 'Products'}
                    </Link>
                    {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    <span className="text-primary font-bold truncate max-w-[200px]">{product.title}</span>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">

                {/* HERO SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100 bg-gray-50/50 relative group">
                            <img
                                src={product.images[activeImage]}
                                alt={product.title}
                                className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`}>
                                {product.isCertified && (
                                    <span className="bg-white/90 backdrop-blur text-primary text-xs font-black px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-primary/10">
                                        <Shield size={12} className="fill-primary/20" />
                                        {isRtl ? 'منتج معتمد' : 'Certified Product'}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-24 h-24 rounded-2xl border-2 overflow-hidden flex-shrink-0 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary/20 ring-offset-2' : 'border-gray-100 hover:border-gray-300'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className={`flex flex-col justify-center ${isRtl ? 'text-right' : 'text-left lg:pl-10'}`}>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-lg">
                                {product.category}
                            </span>
                            <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg flex items-center gap-1.5">
                                <CheckCircle size={14} />
                                {product.stockStatus}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 font-cairo leading-tight">
                            {product.title}
                        </h1>

                        <div className="text-sm text-gray-400 font-bold mb-6 flex flex-wrap items-center gap-6">
                            <span>{isRtl ? 'الشركة المصنعة' : 'Manufacturer'}: <span className="text-gray-700">{product.brand}</span></span>
                            <span>{isRtl ? 'كود المنتج' : 'SKU'}: <span className="text-gray-700">{product.sku}</span></span>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-lg font-medium mb-10 border-b border-gray-100 pb-10">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Link
                                href={`https://wa.me/201001234567?text=${encodeURIComponent(isRtl ? `مرحباً، أريد الاستفسار عن المنتج: ${product.title}` : `Hello, I want to inquire about the product: ${product.title}`)}`}
                                target="_blank"
                                className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={20} />
                                {isRtl ? 'استفسر عبر واتساب' : 'Inquire via WhatsApp'}
                            </Link>
                            <button className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                <ShoppingCart size={20} />
                                {isRtl ? 'اطلب عرض سعر' : 'Request Quote'}
                            </button>
                        </div>

                        {/* PDF Brochure Download */}
                        {product.pdfBrochure && (
                            <Link
                                href={product.pdfBrochure}
                                target="_blank"
                                className="flex items-center justify-center gap-3 py-4 px-6 mb-6 rounded-xl border-2 border-dashed border-gray-200 text-gray-600 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                            >
                                <Download size={20} />
                                {isRtl ? 'تحميل كتالوج المنتج (PDF)' : 'Download Product Brochure (PDF)'}
                            </Link>
                        )}

                        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold cursor-pointer hover:text-primary transition-colors">
                            <Share2 size={16} />
                            {isRtl ? 'مشاركة تفاصيل المنتج' : 'Share Product Details'}
                        </div>
                    </div>
                </div>

                {/* DETAILS TABS */}
                <div className="mb-24">
                    <div className={`flex flex-wrap border-b border-gray-200 mb-10 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                        <TabButton label={isRtl ? 'الوصف والمميزات' : 'Description'} id="description" active={activeTab} onClick={setActiveTab} />
                        <TabButton label={isRtl ? 'البيانات الفنية (Specs)' : 'Technical Specs'} id="specs" active={activeTab} onClick={setActiveTab} />
                        <TabButton label={isRtl ? 'الملفات والشهادات' : 'Downloads'} id="downloads" active={activeTab} onClick={setActiveTab} />
                    </div>

                    <div className="min-h-[300px]">
                        {activeTab === 'description' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`prose max-w-none text-gray-600 font-medium ${isRtl ? 'text-right' : 'text-left'}`}>
                                <p>{isRtl ? 'هنا تفاصيل موسعة عن استخدامات المنتج، الفوائد العلمية، وطرق التحضير أو المعايرة.' : 'Detailed information about product uses, scientific benefits, and preparation or calibration methods.'}</p>
                                <ul className={isRtl ? 'list-disc list-inside' : 'list-disc list-outside ml-6'}>
                                    <li>{isRtl ? 'نقاء عالي وكفاءة مضمونة.' : 'High purity and guaranteed efficiency.'}</li>
                                    <li>{isRtl ? 'تغليف آمن يضمن سلامة العينة أثناء الشحن.' : 'Secure packaging ensures sample safety during shipping.'}</li>
                                    <li>{isRtl ? 'ملائم لجميع التطبيقات القياسية في المختبرات.' : 'Suitable for all standard laboratory applications.'}</li>
                                </ul>
                            </motion.div>
                        )}

                        {activeTab === 'specs' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-2xl border border-gray-100">
                                <table className="w-full text-start">
                                    <tbody className="divide-y divide-gray-100">
                                        {product.specs.map((row: any, idx: number) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                                                <td className={`p-5 font-bold text-gray-900 w-1/3 ${isRtl ? 'border-l' : 'border-r'} border-gray-100`}>{row.label}</td>
                                                <td className={`p-5 text-gray-600 ${isRtl ? 'dir-ltr text-right' : 'text-left'}`} dir={isRtl ? 'ltr' : 'ltr'}>{row.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}

                        {activeTab === 'downloads' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.downloads.map((file: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all group bg-white text-start">
                                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <FileText size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-bold text-gray-900 text-sm mb-1">{file.name}</h5>
                                            <span className="text-xs text-gray-400 font-bold uppercase">{file.size} - PDF</span>
                                        </div>
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                <div className={`border-t border-gray-100 pt-16 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-2xl font-black text-gray-900 font-cairo">
                            {isRtl ? 'منتجات ذات صلة' : 'Related Products'}
                        </h3>
                        <Link href={`/${lang}/products`} className="text-primary font-bold text-sm hover:underline">
                            {isRtl ? 'عرض كل المنتجات' : 'View All Products'}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {product.related.map((item: any) => (
                            <Link href={`/${lang}/products/mock-slug`} key={item.id} className="group block">
                                <div className="bg-white rounded-[30px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-square overflow-hidden bg-gray-50 relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                                    </div>
                                    <div className="p-6">
                                        <span className={`text-[10px] text-primary font-black uppercase tracking-widest mb-2 block ${isRtl ? 'text-right' : 'text-left'}`}>{item.category}</span>
                                        <h4 className="font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors font-cairo">
                                            {item.name}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

function TabButton({ label, id, active, onClick }: { label: string, id: string, active: string, onClick: (id: string) => void }) {
    return (
        <button
            onClick={() => onClick(id)}
            className={`px-8 py-4 font-bold text-sm transition-all relative ${active === id ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
        >
            {label}
            {active === id && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full"
                />
            )}
        </button>
    )
}
