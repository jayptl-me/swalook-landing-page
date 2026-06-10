import { Suspense } from 'react';
import { getPublicPosts, getPublicCategories } from '@/lib/blog-cms';
import { getCategories, getAllPosts } from '@/lib/blog';
import blogConfig from '@/data/blog-config.json';
import BlogsClient from '@/components/blog/BlogsClient';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata = {
  title: 'Swalook Blog — Salon CRM Insights, Marketing Guides & Growth Strategies',
  description:
    'Practical CRM, marketing, and growth guidance for salon owners who want more repeat clients, cleaner operations, and stronger revenue.',
  openGraph: {
    title: 'Swalook Blog — Salon CRM Insights & Growth Strategies',
    description:
      'Practical CRM, marketing, and growth guidance for salon owners.',
    url: 'https://swalook.in/blogs',
    siteName: 'Swalook',
  },
  alternates: {
    canonical: 'https://swalook.in/blogs',
  },
};

async function fetchBlogData() {
  try {
    // Try CMS API first
    const [postsData, categoriesData] = await Promise.all([
      getPublicPosts({ limit: 50 }),
      getPublicCategories(),
    ]);

    if (postsData.posts?.length > 0) {
      const posts = postsData.posts.map((post) => ({
        ...post,
        href: `/blogs/${post.slug}`,
      }));
      const totalApiPosts = postsData.total || posts.length;
      return {
        posts,
        categories: categoriesData || [],
        source: 'cms',
        totalPosts: totalApiPosts,
      };
    }
  } catch {
    // Fall through to local JSON
    console.warn('[blogs/page] CMS API unreachable, using local fallback');
  }

  // Fallback to local JSON
  const localPosts = getAllPosts().map((post) => ({
    ...post,
    href: `/blogs/${post.slug}`,
  }));
  const localCategories = getCategories();
  return {
    posts: localPosts,
    categories: localCategories,
    source: 'local',
    totalPosts: localPosts.length,
  };
}

export default async function BlogsPage() {
  const { posts, categories, totalPosts } = await fetchBlogData();

  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading articles…</p>
        </div>
      }
    >
      <BlogsClient
        initialPosts={posts}
        categories={categories}
        totalPosts={totalPosts}
        config={blogConfig}
      />
    </Suspense>
  );
}
