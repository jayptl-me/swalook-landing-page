import BlogPostLayout from '@/components/BlogPostLayout';
import WhySalonsNeedCrmArticle from '@/components/blog/articles/why-salons-fall-behind-without-crm-software';

export default function Blog2() {
  return (
    <BlogPostLayout
      title="Why Salons Need CRM Software: Swalook Solutions"
      category="CRM Benefits for Salons"
      currentSlug="why-salons-fall-behind-without-crm-software"
      summary="A practical look at how a salon CRM turns scattered work into a structured system for client retention, appointment clarity, and better decisions."
      highlights={[
        {
          title: 'Problem',
          text: 'Manual tracking makes it harder to stay organized, follow up consistently, and understand what drives revenue.',
        },
        {
          title: 'Value',
          text: 'A CRM keeps appointments, client data, marketing, and performance in one place.',
        },
        {
          title: 'Outcome',
          text: 'Your team can spend less time chasing information and more time serving clients.',
        },
      ]}
      primaryCtaLabel="Explore CRM Features"
      primaryCtaHref="/salon-crm-features"
      secondaryCtaLabel="Book Free Demo"
      secondaryCtaHref="/book-demo"
    >
      <WhySalonsNeedCrmArticle />
    </BlogPostLayout>
  );
}
