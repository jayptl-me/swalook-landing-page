import { cache } from 'react';
import blogsData from '@/data/blogs.json';
import authorsData from '@/data/authors.json';

const posts = blogsData.posts;
const authors = authorsData.authors;

export const getAllPosts = cache(() => {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
});

export const getPostBySlug = cache((slug) => {
  return posts.find((p) => p.slug === slug);
});

export const getRelatedPosts = cache((currentSlug, limit = 3) => {
  return posts
    .filter((p) => p.slug !== currentSlug)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
});

export const getCategories = cache(() => {
  const seen = new Set();
  const categories = [];

  categories.push({ label: 'All Posts', slug: 'all-posts' });

  for (const post of posts) {
    if (!seen.has(post.category)) {
      seen.add(post.category);
      categories.push({
        label: post.category,
        slug: post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      });
    }
  }

  return categories;
});

export const getPostsByCategory = cache((category) => {
  if (category === 'all-posts' || category === 'All Posts') {
    return getAllPosts();
  }

  const match = posts.find(
    (p) =>
      p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === category
  );

  const label = match?.category ?? category;

  return posts
    .filter((p) => p.category === label)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
});

export function calculateReadTime(content) {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 250));
  return `${minutes} min read`;
}

export const getAuthor = cache((slug) => {
  return authors.find((a) => a.slug === slug);
});

export function getAllTags() {
  return [...new Set(posts.map((p) => p.category))];
}

export { posts, authors };
