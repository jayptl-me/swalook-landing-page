import BlogPostLayout from '@/components/BlogPostLayout';
import IntegratedMarketingArticle from '@/components/blog/articles/the-importance-of-integrated-marketing';

export default function Blog3() {
  return (
    <BlogPostLayout
      title="Integrated Marketing for Salons with Swalook CRM"
      category="Salon Marketing & Engagement"
      currentSlug="the-importance-of-integrated-marketing"
      summary="A clearer way to connect email, SMS, WhatsApp, and loyalty touchpoints so salon marketing feels coordinated instead of scattered."
      highlights={[
        {
          title: 'Problem',
          text: 'One-off campaigns and disconnected channels create weak follow-up and inconsistent messaging.',
        },
        {
          title: 'System',
          text: 'Swalook helps connect communication across the channels clients already use.',
        },
        {
          title: 'Result',
          text: 'You get a stronger retention loop with less manual effort from your team.',
        },
      ]}
      primaryCtaLabel="Explore CRM Features"
      primaryCtaHref="/salon-crm-features"
      secondaryCtaLabel="Book Free Demo"
      secondaryCtaHref="/book-demo"
    >
      <IntegratedMarketingArticle />
    </BlogPostLayout>
  );
}
