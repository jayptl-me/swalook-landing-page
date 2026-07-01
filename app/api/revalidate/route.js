/**
 * app/api/revalidate/route.js
 * ─────────────────────────────────────────────────────────────
 * ISR revalidation webhook for the blog CMS.
 *
 * Called by the backend when a blog post is published, updated,
 * or deleted so that the landing page shows fresh content
 * immediately instead of waiting for the ISR revalidate window.
 *
 * Protected by a shared secret (WEBHOOK_SECRET) to prevent abuse.
 */

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { clearBlogCache } from '@/lib/blog-public';

const WEBHOOK_SECRET = process.env.REVALIDATION_WEBHOOK_SECRET || 'swalook-blog-webhook-secret';

export async function POST(request) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization') || '';
    const secret = authHeader.replace(/^Bearer\s+/i, '').trim();

    if (!secret || secret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const { action, slug, postId } = body;

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Missing action field' },
        { status: 400 },
      );
    }

    // Clear the in-memory API client cache so fresh data is fetched
    clearBlogCache();

    // Revalidate the specific post page
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    // Revalidate the blog listing page
    revalidatePath('/blogs');

    // Revalidate by tag to catch all related pages
    revalidateTag('blog-posts');
    if (slug) {
      revalidateTag(`blog-post-${slug}`);
    }

    console.log(
      `[revalidate] action=${action} slug=${slug || 'none'} postId=${postId || 'none'}`,
    );

    return NextResponse.json({
      success: true,
      revalidated: true,
      action,
      slug: slug || null,
      now: Date.now(),
    });
  } catch (err) {
    console.error('[revalidate] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
