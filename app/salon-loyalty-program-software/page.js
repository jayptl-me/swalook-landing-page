'use client';
import { FiHeart } from 'react-icons/fi';
import FeaturePage from '@/components/FeaturePage';

export default function LoyaltyPage() {
  return (
    <FeaturePage
      currentSlug="salon-loyalty-program-software"
      icon={<FiHeart />}
      title="Salon Loyalty Program Software"
      heroDesc="Increase retention with Swalook's salon loyalty software. Reward clients, track visits, and personalize engagement with ease."
      whyTitle="Why Loyalty Programs Matter"
      whyDesc="Acquiring a new client costs 5x more than retaining an existing one. Swalook's loyalty features help you reward your best customers, increase visit frequency, and build lasting relationships."
      keyFeatures={[
        { title: 'Points-Based Rewards', desc: 'Set up point systems where clients earn rewards for every visit or purchase.' },
        { title: 'Visit Tracking', desc: 'Track client visit frequency and spending patterns automatically.' },
        { title: 'Personalized Offers', desc: 'Send targeted promotions based on client preferences and history.' },
        { title: 'Referral Programs', desc: 'Encourage clients to refer friends with automated referral rewards.' },
        { title: 'Birthday & Anniversary Specials', desc: 'Delight clients with automatic special-day offers.' },
      ]}
      compareTitle="Why Choose Swalook for Loyalty?"
      compareDesc="Generic loyalty apps don't know your clients. Swalook connects loyalty directly to client profiles, visit history, and preferences for truly personalized engagement."
      withPoints={[
        'Boost client retention with smart rewards.',
        'Personalize engagement for every client.',
        'Turn clients into brand advocates.',
      ]}
      withCta="Ready to build lasting client relationships? Start your journey with Swalook."
    />
  );
}
