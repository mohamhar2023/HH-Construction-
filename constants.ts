import { ServiceTier } from './types';

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 1,
    name: "Essential Suite",
    priceRange: "Consultation",
    description: "Fully legal rental suites designed for ROI-focused value.",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    features: ["Separate Entrance", "Full Kitchen", "Egress Windows", "Legal Compliance"]
  },
  {
    id: 2,
    name: "Premium Leisure",
    priceRange: "Consultation",
    description: "High-end entertaining spaces without premium stress.",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    features: ["Home Theater", "Wet Bar", "Sound Suppression", "8-Week Guarantee"]
  },
  {
    id: 3,
    name: "Signature Experience",
    priceRange: "Consultation",
    description: "Top-tier bespoke design for the uncompromising homeowner.",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    features: ["Bespoke Millwork", "Smart Home Integration", "Concierge Service", "VIP Access"]
  },
  {
    id: 4,
    name: "Investor BRRRR",
    priceRange: "Consultation",
    description: "Maximize returns with turnkey rental-ready units in 9 weeks.",
    imageUrl: "https://images.unsplash.com/photo-1593696140826-c58b712213d5?q=80&w=2070&auto=format&fit=crop",
    features: ["Rapid Timeline", "Forced Appreciation", "Tenant Ready", "Full Permits"]
  }
];

export const COLORS = {
  black: '#1c1c1c',
  white: '#f5f5f5',
  gray: '#555555',
  red: '#EF4444', // Matches the logo red
};