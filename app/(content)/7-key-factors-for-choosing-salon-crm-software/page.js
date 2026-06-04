import BlogPostLayout from '@/components/blog/BlogPostLayout';
import SevenKeyFactorsArticle from '@/components/blog/articles/7-key-factors';

export default function Blog1() {
  return (
    <BlogPostLayout
      title="7 Key Factors When Choosing Salon CRM Software"
      category="Salon CRM & Software Guide"
      currentSlug="7-key-factors-for-choosing-salon-crm-software"
      summary="A clean framework for comparing salon CRM tools based on retention, automation, reporting, and team workflow."
      highlights={[
        {
          title: 'What to compare',
          text: 'Focus on the workflows that affect bookings, follow-up, and day-to-day management.',
        },
        {
          title: 'Why it matters',
          text: 'The right CRM saves time and helps your salon grow with less manual effort.',
        },
        {
          title: 'What to avoid',
          text: 'Do not choose software that looks nice but fails on team adoption or core operations.',
        },
      ]}
      primaryCtaLabel="Explore CRM Features"
      primaryCtaHref="/salon-crm-features"
      secondaryCtaLabel="Book Free Demo"
      secondaryCtaHref="/book-demo"
    >
      <SevenKeyFactorsArticle />
    </BlogPostLayout>
  );
}
