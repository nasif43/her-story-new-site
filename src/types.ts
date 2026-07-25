export type NavTab = 'home' | 'dreams' | 'books' | 'sister-library' | 'reflections' | 'ladyland';

export interface DreamItem {
  id: string;
  title: string;
  category: 'Textile Art' | 'Theatre & Performance' | 'Community Space' | 'Fairy Tale & Lore' | 'Publishing' | 'Archive';
  description: string;
  fullNarrative: string;
  imageUrl: string;
  bgAccent: string; // e.g. 'bg-[#C1ACD6]/20'
  year: string;
  location?: string;
  impactMetrics?: string;
  tags: string[];
  audioExcerptUrl?: string;
  quote?: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  illustrator?: string;
  coverImage: string;
  description: string;
  year: string;
  pages: number;
  genre: 'Illustrated Biography' | 'Sci-Fi Classic' | 'Cultural History' | 'Children\'s Fiction' | 'Zine & Anthology';
  price?: string;
  excerptText: string;
  isbn?: string;
  downloadablePdf?: boolean;
}

export interface SisterLibraryItem {
  id: string;
  title: string;
  author: string;
  category: 'Zine' | 'Feminist Theory' | 'Art Book' | 'Poetry' | 'Fiction';
  condition: 'Available' | 'On Loan' | 'Digital Copy';
  coverImage: string;
  curatorNote: string;
  donatedBy?: string;
}

export interface ReflectionItem {
  id: string;
  title: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: 'Essay' | 'Podcast Transcripts' | 'Interview' | 'Editorial';
  excerpt: string;
  fullContent: string;
  coverImage: string;
}
