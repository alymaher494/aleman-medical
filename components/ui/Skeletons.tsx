export function ServiceCardSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-8">
                {/* Title */}
                <div className="h-7 bg-gray-200 rounded-lg mb-4 w-3/4" />

                {/* Description lines */}
                <div className="space-y-2 mb-8">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>

                {/* Button */}
                <div className="h-5 bg-gray-200 rounded w-24" />
            </div>
        </div>
    )
}

export function BlogCardSkeleton() {
    return (
        <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="h-56 bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-8">
                {/* Date */}
                <div className="h-3 bg-gray-200 rounded w-32 mb-4" />

                {/* Title */}
                <div className="h-6 bg-gray-200 rounded mb-4 w-5/6" />

                {/* Excerpt lines */}
                <div className="space-y-2 mb-6">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>

                {/* Read More */}
                <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
        </div>
    )
}

export function ClientLogoSkeleton() {
    return (
        <div className="flex flex-col items-center justify-center min-w-[260px] md:min-w-[340px] animate-pulse">
            <div className="h-32 w-full bg-gray-200 rounded-[35px]" />
            <div className="mt-5 h-3 bg-gray-200 rounded w-32" />
        </div>
    )
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm animate-pulse">
            {/* Image Skeleton */}
            <div className="h-72 bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-6">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded mb-3 w-4/5" />

                {/* Price */}
                <div className="h-8 bg-gray-200 rounded w-32" />
            </div>
        </div>
    )
}

export function HeroSkeleton() {
    return (
        <div className="relative h-screen bg-gray-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6 px-6">
                    <div className="h-16 bg-gray-300 rounded-lg w-96 mx-auto" />
                    <div className="h-6 bg-gray-300 rounded w-64 mx-auto" />
                    <div className="flex gap-4 justify-center">
                        <div className="h-12 bg-gray-300 rounded-full w-32" />
                        <div className="h-12 bg-gray-300 rounded-full w-32" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Generic Section Skeleton
export function SectionSkeleton({ cards = 3 }: { cards?: number }) {
    return (
        <div className="py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Header Skeleton */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-full max-w-2xl mx-auto animate-pulse" />
                </div>

                {/* Cards Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: cards }).map((_, idx) => (
                        <ServiceCardSkeleton key={idx} />
                    ))}
                </div>
            </div>
        </div>
    )
}
