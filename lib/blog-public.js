const API_ROOT = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const FETCH_TIMEOUT = 5000;

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) return null;
    return res.json();
  } catch {
    clearTimeout(id);
    return null;
  }
}

export async function fetchPublishedPosts(params = {}) {
  const search = new URLSearchParams();
  if (params.search) search.set("search", params.search);
  if (params.category) search.set("category", params.category);
  if (params.tag) search.set("tag", params.tag);
  if (params.featured) search.set("featured", "true");
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));

  const query = search.toString();
  const json = await fetchWithTimeout(
    `${API_ROOT}/api/v1/public/blog/posts${query ? `?${query}` : ""}`
  );
  if (!json || !json.success) return { posts: [], total: 0, page: 1, totalPages: 0 };
  return {
    posts: json.data.items || [],
    total: json.data.total || 0,
    page: json.data.page || 1,
    totalPages: json.data.totalPages || 0,
  };
}

export async function fetchPostBySlug(slug) {
  const json = await fetchWithTimeout(
    `${API_ROOT}/api/v1/public/blog/posts/${encodeURIComponent(slug)}`
  );
  if (!json || !json.success) return null;
  return json.data || null;
}

export async function fetchCategories() {
  const json = await fetchWithTimeout(
    `${API_ROOT}/api/v1/public/blog/categories`
  );
  if (!json || !json.success) return [];
  return json.data || [];
}
