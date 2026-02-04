// CMS Types for Cantilan Connect

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  sections: PageSection[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'image' | 'gallery' | 'stats' | 'cards';
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'coastline' | 'mangroves' | 'town-life' | 'port-boats' | 'festivals';
  isVisible: boolean;
  order: number;
  uploadedAt: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  isVisible: boolean;
  order: number;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  maintenanceMode: boolean;
  footerText: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface VisitInfo {
  bestTimeToVisit: string;
  howToGetThere: string;
  whereToStay: string;
  localTips: string;
  transportation: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin: string;
}

export interface CMSData {
  pages: Page[];
  gallery: GalleryImage[];
  highlights: Highlight[];
  siteSettings: SiteSettings;
  visitInfo: VisitInfo;
  users: AdminUser[];
}

export const defaultSiteSettings: SiteSettings = {
  siteTitle: 'Cantilan Connect',
  tagline: 'The Cradle of Towns - Surigao del Sur',
  logoUrl: '/logo.png',
  faviconUrl: '/favicon.ico',
  primaryColor: '#0070a0',
  secondaryColor: '#004968',
  maintenanceMode: false,
  footerText: '© 2026 Cantilan Connect. All rights reserved.',
  contactEmail: 'info@cantilan.gov.ph',
  contactPhone: '+63 (XXX) XXX-XXXX',
  socialLinks: {
    facebook: 'https://facebook.com/cantilan',
    instagram: 'https://instagram.com/cantilan',
  },
};

export const defaultVisitInfo: VisitInfo = {
  bestTimeToVisit: 'The best time to visit Cantilan is during the dry season from March to May, when the weather is sunny and ideal for beach activities and exploring the town.',
  howToGetThere: 'Cantilan is accessible by bus or van from Butuan City (approximately 3-4 hours) or from Tandag City (approximately 1-2 hours). The nearest airport is in Butuan.',
  whereToStay: 'Cantilan offers various accommodation options including beach resorts, guesthouses, and homestays. Popular areas include the town proper and coastal barangays.',
  localTips: 'Don\'t miss the Sirong Festival in August. Try local seafood delicacies like fresh oysters and grilled fish. Respect local customs and the environment.',
  transportation: 'Tricycles are the main mode of transportation within the town. For longer distances, habal-habal (motorcycle taxis) are available. Boat rentals are available for island hopping.',
};

export const defaultPages: Page[] = [
  {
    id: 'home',
    title: 'Home',
    slug: '/',
    content: 'Welcome to Cantilan',
    sections: [],
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'about',
    title: 'About Cantilan',
    slug: '/about',
    content: 'About Cantilan content',
    sections: [],
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'culture',
    title: 'Culture & Life',
    slug: '/culture',
    content: 'Culture and life content',
    sections: [],
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'nature',
    title: 'Nature & Environment',
    slug: '/nature',
    content: 'Nature and environment content',
    sections: [],
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'economy',
    title: 'Economy & Port',
    slug: '/economy',
    content: 'Economy and port content',
    sections: [],
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'visit',
    title: 'Visit Cantilan',
    slug: '/visit',
    content: 'Visit Cantilan content',
    sections: [],
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const defaultHighlights: Highlight[] = [
  {
    id: '1',
    title: 'Sustainable Fishing',
    description: 'Learn how our community protects marine life through responsible fishing practices and conservation efforts.',
    icon: 'fish',
    link: '/nature',
    isVisible: true,
    order: 1,
  },
  {
    id: '2',
    title: 'LGU Services',
    description: 'Access local government resources, announcements, and public services for residents and visitors.',
    icon: 'building',
    link: '/about',
    isVisible: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Tourism',
    description: 'Explore Cantilan\'s natural beauty, pristine beaches, mangrove forests, and vibrant culture.',
    icon: 'palmtree',
    link: '/visit',
    isVisible: true,
    order: 3,
  },
];

export const defaultGallery: GalleryImage[] = [
  {
    id: '1',
    url: '/gallery-beach.jpg',
    caption: 'Pristine white sand beaches of Cantilan',
    category: 'coastline',
    isVisible: true,
    order: 1,
    uploadedAt: new Date().toISOString(),
  },
  {
    id: '2',
    url: '/gallery-mangroves.jpg',
    caption: 'Mangrove forest ecosystem',
    category: 'mangroves',
    isVisible: true,
    order: 2,
    uploadedAt: new Date().toISOString(),
  },
  {
    id: '3',
    url: '/gallery-boats.jpg',
    caption: 'Traditional fishing boats at the port',
    category: 'port-boats',
    isVisible: true,
    order: 3,
    uploadedAt: new Date().toISOString(),
  },
  {
    id: '4',
    url: '/gallery-festival.jpg',
    caption: 'Sirong Festival celebration',
    category: 'festivals',
    isVisible: true,
    order: 4,
    uploadedAt: new Date().toISOString(),
  },
  {
    id: '5',
    url: '/culture-beach.jpg',
    caption: 'Daily life along the coast',
    category: 'town-life',
    isVisible: true,
    order: 5,
    uploadedAt: new Date().toISOString(),
  },
  {
    id: '6',
    url: '/culture-crafts.jpg',
    caption: 'Traditional basket weaving',
    category: 'town-life',
    isVisible: true,
    order: 6,
    uploadedAt: new Date().toISOString(),
  },
];
