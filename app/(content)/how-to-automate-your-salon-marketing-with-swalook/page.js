import BlogPostLayout from '@/components/BlogPostLayout';
import SalonMarketingAutomationArticle from '@/components/blog/articles/how-to-automate-your-salon-marketing-with-swalook';

export default function Blog4() {
  return (
    <BlogPostLayout
      title="How to Automate Your Salon Marketing with Swalook"
      category="Marketing Automation Tools"
      currentSlug="how-to-automate-your-salon-marketing-with-swalook"
      summary="A practical breakdown of automated campaigns, reminders, and follow-ups that save time and keep clients coming back."
      highlights={[
        {
          title: 'Problem',
          text: 'Manual marketing takes time and often misses the right moment to reconnect with clients.',
        },
        {
          title: 'System',
          text: 'Swalook automates reminders, welcome flows, re-engagement, and follow-up messages.',
        },
        {
          title: 'Result',
          text: 'Your salon stays consistent without adding more work to the team.',
        },
      ]}
      primaryCtaLabel="Explore CRM Features"
      primaryCtaHref="/salon-crm-features"
      secondaryCtaLabel="Book Free Demo"
      secondaryCtaHref="/book-demo"
    >
      <SalonMarketingAutomationArticle />
    </BlogPostLayout>
  );
}
