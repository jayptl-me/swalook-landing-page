/**
 * lib/blog-public.js
 * ─────────────────────────────────────────────────────────────
 * Public-facing blog API client for the Swalook landing page.
 * API-first with in-memory caching and retry logic.
 * Static JSON fallback is used ONLY at build time via generateStaticParams.
 */
const API_ROOT = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const FETCH_TIMEOUT = 5000;
const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 1000;

// ─── In-memory cache ─────────────────────────────────────────────────────────
const cache = new Map();

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

function cacheSet(key, value, ttlMs) {
  cache.set(key, { value, expiresAt: Date.now() + ttlMs });
  // Evict old entries if cache grows large
  if (cache.size > 100) {
    const oldest = cache.entries().next().value;
    if (oldest) cache.delete(oldest[0]);
  }
}

function cacheKey(endpoint, params) {
  return `${endpoint}?${JSON.stringify(params || {})}`;
}

// ─── Fetch with timeout, retry, and cache ────────────────────────────────────
async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      if (!res.ok) {
        // Don't retry 4xx errors
        if (res.status >= 400 && res.status < 500) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    } catch (err) {
      clearTimeout(id);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        continue;
      }
      return null;
    }
  }
  return null;
}

// ─── Public API functions ────────────────────────────────────────────────────

export async function fetchPublishedPosts(params = {}) {
  const search = new URLSearchParams();
  if (params.search) search.set("search", params.search);
  if (params.category) search.set("category", params.category);
  if (params.tag) search.set("tag", params.tag);
  if (params.featured) search.set("featured", "true");
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));

  const query = search.toString();
  const url = `${API_ROOT}/api/v1/public/blog/posts${query ? `?${query}` : ""}`;
  const key = cacheKey("posts", params);
  const cached = cacheGet(key);
  if (cached) return cached;

  const json = await fetchWithRetry(url);
  if (!json || !json.success) {
    return { posts: [], total: 0, page: 1, totalPages: 0 };
  }

  const items = Array.isArray(json.data) ? json.data : json.data?.items || [];
  const meta = json.meta || {};
  const result = {
    posts: items,
    total: meta.total || items.length,
    page: meta.page || 1,
    totalPages: meta.totalPages || 1,
  };

  cacheSet(key, result, 60_000); // cache for 60s
  return result;
}

/**
 * Fetch a single published post by slug.
 * Returns `{ post, apiReached }` — `post` is the post object or null,
 * `apiReached` is true if the API was contacted (even for 404).
 */
export async function fetchPostBySlug(slug) {
  const url = `${API_ROOT}/api/v1/public/blog/posts/${encodeURIComponent(slug)}`;
  const key = cacheKey("post", { slug });
  const cached = cacheGet(key);
  if (cached) return { post: cached, apiReached: true };

  let apiReached = false;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    apiReached = true;
    if (res.status === 404) {
      return { post: null, apiReached: true };
    }
    if (!res.ok) {
      return { post: null, apiReached: true };
    }
    const json = await res.json();
    if (!json || !json.success) {
      return { post: null, apiReached: true };
    }
    cacheSet(key, json.data, 300_000); // cache for 5 min
    return { post: json.data || null, apiReached: true };
  } catch {
    clearTimeout(id);
    return { post: null, apiReached };
  }
}

export async function fetchCategories() {
  const url = `${API_ROOT}/api/v1/public/blog/categories`;
  const key = "categories";
  const cached = cacheGet(key);
  if (cached) return cached;

  const json = await fetchWithRetry(url);
  if (!json || !json.success) return [];

  cacheSet(key, json.data, 120_000); // cache for 2 min
  return json.data || [];
}

/**
 * Clear the in-memory cache. Called by the revalidation webhook
 * to ensure fresh data is fetched immediately after publish/update/delete.
 */
export function clearBlogCache() {
  cache.clear();
}
