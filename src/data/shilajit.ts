/** Shilajit product copy (live HTML — never baked into images). */
export interface ProductBenefit {
  title: string;
  description: string;
}

export interface ProductCopy {
  slug: string;
  headline: string;
  tagline: string;
  benefits: ProductBenefit[];
  disclaimer: string;
}

export const shilajit: ProductCopy = {
  slug: "shilajit",
  headline: "Shilajit Adaptogen Complex",
  tagline: "Ancient mineral vitality. Modern performance.",
  benefits: [
    {
      title: "Peak Physical Performance",
      description:
        "Supports energy production and stamina for demanding training and daily vitality.",
    },
    {
      title: "Adaptogenic Resilience",
      description:
        "Helps the body respond to physical and mental stress with ashwagandha, tongkat ali, and shilajit.",
    },
    {
      title: "Mineral-Rich Foundation",
      description:
        "Naturally occurring fulvic acid and 85+ trace minerals from pristine Himalayan sources.",
    },
  ],
  disclaimer:
    "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.",
};
