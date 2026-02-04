// WordPress GraphQL endpoint - MUST be defined in .env.local
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

if (!WORDPRESS_API_URL) {
    console.warn('⚠️ NEXT_PUBLIC_WORDPRESS_API_URL is not defined. Using fallback static data.')
}

// GraphQL Queries
const GET_POSTS_QUERY = `
    query GetPosts($language: LanguageCodeFilterEnum) {
        posts(where: { language: $language }, first: 6) {
            nodes {
                id
                title
                excerpt
                slug
                date
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                categories {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`

const GET_SERVICES_QUERY = `
    query GetServices($language: LanguageCodeFilterEnum) {
        allServices(where: { language: $language }, first: 10) {
            nodes {
                id
                title
                content
                slug
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                serviceFields {
                    description
                    icon
                }
            }
        }
    }
`

const GET_CLIENTS_QUERY = `
    query GetClients($language: LanguageCodeFilterEnum) {
        allClientsPartners(where: { language: $language }, first: 20) {
            nodes {
                id
                title
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                clientFields {
                    logo
                    companyName
                }
            }
        }
    }
`

const GET_SERVICE_BY_SLUG = `
    query GetServiceBySlug($id: ID!, $idType: ServiceIdType!) {
        service(id: $id, idType: $idType) {
            id
            title
            content
            slug
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
            serviceFields {
                description
                icon
            }
        }
    }
`

const GET_POST_BY_SLUG = `
    query GetPostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
            id
            title
            content
            date
            slug
            excerpt
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
            author {
                node {
                    name
                }
            }
            categories {
                nodes {
                    name
                }
            }
        }
    }
`

// Sanitize HTML content from WordPress
export function sanitizeHTML(html: string): string {
    if (!html) return ''
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/g, '')
        .replace(/on\w+='[^']*'/g, '')
        .trim()
}

// Fetch data from WordPress using fetch API with ISR
async function fetchWordPressData(query: string, variables = {}) {
    if (!WORDPRESS_API_URL) return null

    try {
        const response = await fetch(WORDPRESS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            next: { revalidate: 60 } // Reduced to 1 minute for testing
        })

        if (!response.ok) {
            console.error(`❌ WP API Response Error: ${response.status}`)
            return null
        }

        const json = await response.json()
        if (json.errors) {
            console.error('❌ GraphQL Errors:', JSON.stringify(json.errors, null, 2))
            return null
        }
        return json.data
    } catch (error) {
        console.error('❌ Error fetching WordPress data:', error)
        return null
    }
}

export async function fetchServiceBySlug(slug: string) {
    try {
        const data = await fetchWordPressData(GET_SERVICE_BY_SLUG, { id: slug, idType: 'SLUG' })
        if (!data?.service) {
            console.log(`ℹ️ Service with slug "${slug}" not found in WP.`)
            return null
        }
        return {
            ...data.service,
            content: sanitizeHTML(data.service.content || ''),
            serviceFields: {
                ...data.service.serviceFields,
                description: sanitizeHTML(data.service.serviceFields?.description || ''),
            }
        }
    } catch (error) {
        return null
    }
}

export async function fetchPostBySlug(slug: string) {
    try {
        const data = await fetchWordPressData(GET_POST_BY_SLUG, { id: slug, idType: 'SLUG' })
        if (!data?.post) return null
        return {
            ...data.post,
            content: sanitizeHTML(data.post.content || ''),
        }
    } catch (error) {
        return null
    }
}

export async function fetchPosts(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_POSTS_QUERY, { language })
        if (!data?.posts?.nodes) return []
        return data.posts.nodes.map((post: any) => ({
            ...post,
            excerpt: sanitizeHTML(post.excerpt || ''),
        }))
    } catch (error) {
        return []
    }
}

export async function fetchServices(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_SERVICES_QUERY, { language })
        if (!data?.allServices?.nodes) return []
        return data.allServices.nodes.map((service: any) => ({
            ...service,
            content: sanitizeHTML(service.content || ''),
            serviceFields: {
                ...service.serviceFields,
                description: sanitizeHTML(service.serviceFields?.description || ''),
            },
        }))
    } catch (error) {
        return []
    }
}

export async function fetchClients(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_CLIENTS_QUERY, { language })
        if (!data?.allClientsPartners?.nodes) return []
        console.log(`✅ Fetched ${data.allClientsPartners.nodes.length} clients from WP`)
        return data.allClientsPartners.nodes
    } catch (error) {
        return []
    }
}

export interface WordPressClient {
    id: string
    title: string
    featuredImage?: {
        node: {
            sourceUrl: string
            altText?: string
        }
    }
    clientFields?: {
        logo?: string
        companyName?: string
    }
}
