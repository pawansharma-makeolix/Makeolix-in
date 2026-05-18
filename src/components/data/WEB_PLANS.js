export const WEB_PLANS = [
  // ─── SILVER ─────────────────────────────────────────────────────────────────
  {
    planName: "STARTER",
    currentPrice: "$500",
    originalPrice: null,
    period: "/ month",
    isPopular: false,
    inclusions: [
      { label: "No.of Pages – Upto 5", included: true },
      { label: "UI design (template-based) – Basic", included: true },
      { label: "Responsive Design – Mobile", included: true },
      { label: "Form Integration – Contact Form", included: true },
    ],
    sections: [
      {
        title: "CMS Features (WordPress / Joomla! / C5 / Drupal)",
        items: [
          { label: "Social Media Integration", included: true },
          { label: "Security Setup", included: true },
          { label: "Content Migration", included: true },
          { label: "Products Migration", included: true },
          { label: "WhatsApp Chat Integration", included: false },
          { label: "E-commerce Functionality", included: false },
          { label: "Payment Gateway Integration", included: false },
          { label: "Basic SEO Setup (meta tags, titles)", included: false },
          { label: "Speed Optimization", included: false },
          { label: "Newsletter Module", included: false },
          { label: "Shopping Cart", included: false },
          { label: "Order Migration", included: false },
          { label: "User Migration", included: false },
          { label: "Dynamic Blog Section Creation", included: false },
          { label: "Case Studies Section Creation", included: false },
          { label: "CMS Integration", included: false },
          { label: "Advanced SEO Structure Setup", included: false },
          { label: "Dealer/ Affliate Section", included: false },
          { label: "Revision Round - 1", included: true },
          { label: "Delivery Time - 5-7 days", included: true },
        ],
      },
      {
        title: "Customer Support",
        items: [
          { label: "Email", included: true },
          { label: "Phone", included: true },
          { label: "Chat", included: true },
        ],
      },
    ],
  },

  // ─── GOLD ───────────────────────────────────────────────────────────────────
  {
    planName: "GROWTH",
    currentPrice: "$1500",
    originalPrice: null,
    period: "/ month",
    isPopular: true,
    badgeText: "Best Seller",
    inclusions: [
      { label: "No.of Pages – Upto 30", included: true },
      { label: "UI design (template-based) – Custom", included: true },
      { label: "Responsive Design – Mobile + Tablet", included: true },
      { label: "Form Integration – Lead + Email", included: true },
    ],
    sections: [
      {
        title:
          "WordPress / Joomla! /C5 / Drupal / Magento / Prestashop / Shopify / BigCommerce",
        items: [
          { label: "Social Media Integration", included: true },
          { label: "Security Setup", included: true },
          { label: "Content Migration", included: true },
          { label: "Products Migration", included: true },
          { label: "WhatsApp Chat Integration", included: true },
          { label: "E-commerce Functionality", included: true },
          { label: "Payment Gateway Integration", included: true },
          { label: "Basic SEO Setup (meta tags, titles)", included: true },
          { label: "Speed Optimization", included: true },
          { label: "Newsletter Module", included: true },
          { label: "Shopping Cart", included: true },
          { label: "Order Migration", included: true },
          { label: "User Migration", included: false },
          { label: "Dynamic Blog Section Creation", included: false },
          { label: "Case Studies Section Creation", included: false },
          { label: "CMS Integration", included: false },
          { label: "Advanced SEO Structure Setup", included: false },
          { label: "Dealer/ Affliate Section", included: false },
          { label: "Revision Round - 2-3", included: true },
          { label: "Delivery Time - 1-2 week", included: true },
        ],
      },
      {
        title: "Customer Support",
        items: [
          { label: "Email", included: true },
          { label: "Phone", included: true },
          { label: "Chat", included: true },
        ],
      },
    ],
  },

  // ─── PREMIUM ─────────────────────────────────────────────────────────────────
  {
    planName: "PRO",
    currentPrice: "$3100",
    originalPrice: null,
    period: "/ month",
    isPopular: false,
    inclusions: [
      { label: "No.of Pages – Upto 80", included: true },
      { label: "UI design (template-based) – Fully Custom", included: true },
      { label: "Responsive Design – All Devices", included: true },
      {
        label: "Form Integration – Lead + Subscription + Email",
        included: true,
      },
    ],
    sections: [
      {
        title:
          "Custom Framework / WordPress / Joomla! / C5/ Drupal / Magento / Prestashop / Shopify / BigCommerce",
        items: [
          { label: "Social Media Integration", included: true },
          { label: "Security Setup", included: true },
          { label: "Content Migration", included: true },
          { label: "Products Migration", included: true },
          { label: "WhatsApp Chat Integration", included: true },
          { label: "E-commerce Functionality", included: true },
          { label: "Payment Gateway Integration", included: true },
          { label: "Basic SEO Setup (meta tags, titles)", included: true },
          { label: "Speed Optimization", included: true },
          { label: "Newsletter Module", included: true },
          { label: "Shopping Cart", included: true },
          { label: "Order Migration", included: true },
          { label: "User Migration", included: true },
          { label: "Dynamic Blog Section Creation", included: true },
          { label: "Case Studies Section Creation", included: true },
          { label: "CMS Integration", included: true },
          { label: "Advanced SEO Structure Setup", included: true },
          { label: "Dealer/ Affliate Section", included: true },
          { label: "Revision Round - 4-5", included: true },
          { label: "Delivery Time - 3-4 week", included: true },
        ],
      },
      {
        title: "Customer Support",
        items: [
          { label: "Email", included: true },
          { label: "Phone", included: true },
          { label: "Chat", included: true },
        ],
      },
    ],
  },
];
