export interface ServiceTier {
  id: number;
  name: string;
  priceRange: string;
  description: string;
  imageUrl: string;
  features: string[];
}

export interface NavigationLink {
  label: string;
  href: string;
}