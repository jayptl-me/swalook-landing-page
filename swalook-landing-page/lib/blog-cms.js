/**
 * lib/blog-cms.js
 *
 * Dynamic blog data fetcher that reads from the Swalook CMS API.
 * Falls back to local JSON when the API is unreachable.
 *
 * Usage:
 *   import { getPublicPosts, getPublicPost } from '@/lib/blog-cms';
 *   const posts = await getPublicPosts();
 */

const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Fallback local data (the current blogs.json)
let fallbackPosts = null;
let fallbackCategories = null;

async function loadFallback() {
    if (!fallbackPosts) {
        try {
            const postsModule = await import("@/data/blogs.json");
            fallbackPosts = postsModule.default?.posts || [];
        } catch {
            fallbackPosts = [];
        }
    }
    if (!fallbackCategories) {
        try {
            const configModule = await import("@/data/blog-config.json");
            const posts = fallbackPosts || [];
            const seen = new Set();
            fallbackCategories = [{ label: "All Posts", slug: "all-posts" }];
            for (const post of posts) {
                if (!seen.has(post.category)) {
                    seen.add(post.category);
                    fallbackCategories.push({
                        label: post.category,
                        slug: post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
                    });
                }
            }
        } catch {
            fallbackCategories = [{ label: "All Posts", slug: "all-posts" }];
        }
    }
}

function mapPost(post) {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        category: post.categories?.[0]?.name || "Uncategorized",
        tags: post.tags || [],
        author: post.author?.name || "Swalook Editorial",
        authorSlug: post.author?.name?.toLowerCase().replace(/\s+/g, "-") || "swalook-editorial",
        publishedAt: post.publishedAt || post.createdAt,
        updatedAt: post.updatedAt || post.createdAt,
        coverImage: post.heroMedia?.publicUrl || "/images/og-image.png",
        coverImageAlt: post.heroMedia?.altText || post.title,
        readTime: post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : "5 min read",
        blocks: post.contentBlocks || [],
        summary: post.excerpt || "",
        highlights: [],
        primaryCta: { label: "Explore CRM Features", href: "/salon-crm-features" },
        secondaryCta: { label: "Book Free Demo", href: "/book-demo" },
        accent: "Emerald",
        icon: "Key",
        eyebrow: post.contentType === "guide" ? "Guide" : "Article",
        seo: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt || "",
            ogImage: post.heroMedia?.publicUrl || "/images/og-image.png",
        },
    };
}

/**
 * Fetch published blog posts from the CMS API.
 * Falls back to local JSON if the API is down.
 */
export async function getPublicPosts(params = {}) {
    try {
        const searchParams = new URLSearchParams();
        if (params.limit) searchParams.set("limit", String(params.limit));
        if (params.page) searchParams.set("page", String(params.page));
        if (params.category) searchParams.set("category", params.category);
        if (params.tag) searchParams.set("tag", params.tag);

        const query = searchParams.toString();
        const res = await fetch(`${API_ROOT}/api/v1/public/blog/posts${query ? `?${query}` : ""}`, {
            next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
        });

        if (res.ok) {
            const data = await res.json();
            if (data.success && data.data?.items) {
                return {
                    posts: data.data.items.map(mapPost),
                    total: data.data.total || data.data.items.length,
                    page: data.data.page || { limit: 20 },
                };
            }
        }
    } catch {
        // API unreachable — fall through to local fallback
        console.warn("[blog-cms] API unreachable, using local fallback data");
    }

    // Fallback to local JSON
    await loadFallback();
    let posts = [...fallbackPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    if (params.category && params.category !== "all-posts") {
        posts = posts.filter((p) => {
            const catSlug = p.category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            return catSlug === params.category;
        });
    }

    return {
        posts,
        total: posts.length,
        page: { limit: 20 },
    };
}

/**
 * Fetch a single published post by slug from the CMS API.
 */
export async function getPublicPost(slug) {
    try {
        const res = await fetch(`${API_ROOT}/api/v1/public/blog/posts/${encodeURIComponent(slug)}`, {
            next: { revalidate: 300 },
        });

        if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
                return mapPost(data.data);
            }
        }
    } catch {
        console.warn(`[blog-cms] API unreachable for slug "${slug}", using local fallback`);
    }

    // Fallback to local JSON
    await loadFallback();
    const localPost = fallbackPosts.find((p) => p.slug === slug);
    if (!localPost) return null;
    return localPost;
}

/**
 * Get categories from the CMS API.
 */
export async function getPublicCategories() {
    try {
        const res = await fetch(`${API_ROOT}/api/v1/public/blog/categories`, {
            next: { revalidate: 600 },
        });

        if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
                return [
                    { label: "All Posts", slug: "all-posts" },
                    ...data.data.map((c) => ({ label: c.name, slug: c.slug })),
                ];
            }
        }
    } catch {
        // fall through
    }

    await loadFallback();
    return fallbackCategories;
}

/**
 * Get related posts for a given post.
 */
export async function getRelatedPosts(currentSlug, limit = 3) {
    const { posts } = await getPublicPosts({ limit: limit + 10 });
    return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

/**
 * Search blog posts via the public API.
 * Falls back to client-side filtering on local data.
 */
export async function searchPublicPosts(query) {
    try {
        const res = await fetch(
            `${API_ROOT}/api/v1/public/blog/posts?q=${encodeURIComponent(query)}&limit=20`,
            { next: { revalidate: 300 } }
        );

        if (res.ok) {
            const data = await res.json();
            if (data.success && data.data?.items) {
                return data.data.items.map(mapPost);
            }
        }
    } catch {
        // fall through
    }

    await loadFallback();
    const q = query.toLowerCase();
    return fallbackPosts.filter(
        (p) =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
    );
}
