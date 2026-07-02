// ─── Blog posts barrel export ──────────────────────────────────

import post_7_key_factors_for_choosing_salon_crm_software from './posts/7-key-factors-for-choosing-salon-crm-software';
import post_why_salons_fall_behind_without_crm_software from './posts/why-salons-fall-behind-without-crm-software';
import post_the_importance_of_integrated_marketing from './posts/the-importance-of-integrated-marketing';
import post_how_to_automate_your_salon_marketing_with_swalook from './posts/how-to-automate-your-salon-marketing-with-swalook';
import post_salon_crm_vs_excel from './posts/salon-crm-vs-excel';
import post_how_to_reduce_salon_no_shows_india from './posts/how-to-reduce-salon-no-shows-india';
import post_salon_billing_software_explained from './posts/salon-billing-software-explained';
import post_salon_marketing_guide_india from './posts/salon-marketing-guide-india';

export const allPosts = [
  post_7_key_factors_for_choosing_salon_crm_software,
  post_why_salons_fall_behind_without_crm_software,
  post_the_importance_of_integrated_marketing,
  post_how_to_automate_your_salon_marketing_with_swalook,
  post_salon_crm_vs_excel,
  post_how_to_reduce_salon_no_shows_india,
  post_salon_billing_software_explained,
  post_salon_marketing_guide_india,
];

export function getBlogPostBySlug(slug) {
  return allPosts.find(p => p.slug === slug) || null;
}

export function getRelatedBlogPosts(currentSlug) {
  return allPosts.filter(p => p.slug !== currentSlug);
}
