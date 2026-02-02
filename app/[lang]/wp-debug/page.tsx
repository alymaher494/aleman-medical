import { fetchServices, fetchClients, fetchPosts } from '@/lib/wordpress'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function WPDebugPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as Locale)
    const wpLanguage = lang.toUpperCase() as 'AR' | 'EN'

    let results: any = {
        api_url: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'NOT_DEFINED',
        services: { status: 'pending', count: 0, data: null },
        clients: { status: 'pending', count: 0, data: null },
        posts: { status: 'pending', count: 0, data: null },
    }

    try {
        const [services, clients, posts] = await Promise.all([
            fetchServices(wpLanguage).catch(e => ({ error: e.message })),
            fetchClients(wpLanguage).catch(e => ({ error: e.message })),
            fetchPosts(wpLanguage).catch(e => ({ error: e.message })),
        ])

        results.services = {
            status: Array.isArray(services) && services.length > 0 ? 'success' : 'empty/error',
            count: Array.isArray(services) ? services.length : 0,
            data: services
        }
        results.clients = {
            status: Array.isArray(clients) && clients.length > 0 ? 'success' : 'empty/error',
            count: Array.isArray(clients) ? clients.length : 0,
            data: clients
        }
        results.posts = {
            status: Array.isArray(posts) && posts.length > 0 ? 'success' : 'empty/error',
            count: Array.isArray(posts) ? posts.length : 0,
            data: posts
        }
    } catch (e: any) {
        results.global_error = e.message
    }

    return (
        <main className="bg-gray-50 min-h-screen pb-20">
            <Header lang={lang} navigation={dict.navigation} header={dict.header} />

            <div className="container mx-auto px-6 pt-32">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                    <h1 className="text-3xl font-black mb-6 font-cairo text-primary">WordPress Connection Diagnostic</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <section className="p-6 bg-gray-900 text-green-400 rounded-2xl overflow-hidden">
                            <h2 className="text-white font-bold mb-2">Environment Check</h2>
                            <p className="text-sm opacity-80 mb-4">Checking if .env.local is correctly loaded.</p>
                            <code className="block bg-black/30 p-4 rounded-lg break-all">
                                NEXT_PUBLIC_WORDPRESS_API_URL: {results.api_url}
                            </code>
                        </section>

                        <section className="p-6 bg-white border border-gray-100 rounded-2xl">
                            <h2 className="text-gray-900 font-bold mb-2">Technical Summary</h2>
                            <ul className="space-y-2">
                                <li className="flex justify-between">
                                    <span>Services:</span>
                                    <span className={results.services.status === 'success' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                                        {results.services.status} ({results.services.count})
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Clients:</span>
                                    <span className={results.clients.status === 'success' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                                        {results.clients.status} ({results.clients.count})
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Posts:</span>
                                    <span className={results.posts.status === 'success' ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                                        {results.posts.status} ({results.posts.count})
                                    </span>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-cairo">Raw Data Response</h2>
                        <div className="bg-gray-100 p-6 rounded-2xl overflow-auto max-h-[500px]">
                            <pre className="text-xs text-gray-800">
                                {JSON.stringify(results, null, 2)}
                            </pre>
                        </div>
                    </section>

                    <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl text-blue-800">
                        <h3 className="font-bold mb-2">How to Use This Info:</h3>
                        <p className="text-sm">
                            If status is <strong>"empty/error"</strong>:
                            <br />1. Check if WordPress is running.
                            <br />2. Verify WPGraphQL plugin is active.
                            <br />3. Ensure Custom Post Types (Service, Client) are created.
                            <br />4. Ensure Polylang content exists for the current language ({wpLanguage}).
                        </p>
                    </div>
                </div>
            </div>

            <Footer dict={dict.footer} lang={lang} />
        </main>
    )
}
