// ============================================================
// TypeScript Types — UniVerse Headless CMS (Actual JSON Structure)
// ============================================================

// ---------- CMS Page ----------

export interface CmsPage {
  id: number;
  tenant_id: number;
  title: string;
  slug: string;
  content: CmsBlock[];
  status: 'published' | 'draft';
  author_id: number | null;
  created_at: string;
  updated_at: string;
  is_in_navbar: number;
  priority: number;
  is_contact_form_active: boolean;
}

// ---------- CMS Block ----------

export interface CmsBlock {
  id: string;
  type: CmsBlockType;
  data: CmsBlockData;
}

export type CmsBlockType =
  | 'hero'
  | 'profile_tabs'
  | 'activity_slider'
  | 'dynamic_post_feed'
  | 'rich_text'
  | 'contacts'
  | 'features'
  | 'faq'
  | 'testimonials'
  | 'partners'
  | 'team_members'
  | 'gallery'
  | string;

export type CmsBlockData =
  | HeroBlockData
  | ProfileTabsBlockData
  | ActivitySliderBlockData
  | DynamicPostFeedBlockData
  | RichTextBlockData
  | ContactsBlockData
  | FeaturesBlockData
  | FaqBlockData
  | TestimonialsBlockData
  | PartnersBlockData
  | TeamMembersBlockData
  | GalleryBlockData
  | Record<string, unknown>;

// ---------- Block Data Types ----------

export interface HeroBlockData {
  headline: string;
  sub_headline: string;
  background_image: string;
  stats?: Array<{ label: string; value: string }>;
}

export interface ProfileTabsBlockData {
  tabs?: Array<{ id: string; label: string; content: string; image?: string }>;
  [key: string]: unknown;
}

export interface ActivitySliderBlockData {
  title?: string;
  activities?: Array<{ id: string; title: string; description?: string; image?: string; date?: string }>;
  [key: string]: unknown;
}

export interface DynamicPostFeedBlockData {
  title?: string;
  limit?: number;
  category?: string;
  [key: string]: unknown;
}

export interface RichTextBlockData {
  content: string;
  [key: string]: unknown;
}

export interface ContactsBlockData {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  instagram?: string;
  maps_url?: string;
  [key: string]: unknown;
}

export interface FeaturesBlockData {
  title?: string;
  items?: Array<{ id: string; title: string; description: string; icon?: string }>;
  [key: string]: unknown;
}

export interface FaqBlockData {
  title?: string;
  items?: Array<{ id: string; question: string; answer: string }>;
  [key: string]: unknown;
}

export interface TestimonialsBlockData {
  title?: string;
  items?: Array<{ id?: string; author_name?: string; author_role?: string; content?: string; author_image?: string; rating?: number | null; name?: string; quote?: string; role?: string }>;
  [key: string]: unknown;
}

export interface PartnersBlockData {
  title?: string;
  items?: Array<{ id: string; name: string; logo?: string; url?: string }>;
  [key: string]: unknown;
}

export interface TeamMembersBlockData {
  title?: string;
  members?: Array<{ id: string; name: string; role?: string; photo?: string; bio?: string }>;
  [key: string]: unknown;
}

export interface GalleryBlockData {
  title?: string;
  subtitle?: string;
  images?: Array<{ id?: string; url: string; caption?: string; tag?: string; alt_text?: string }>;
  [key: string]: unknown;
}



// ---------- CMS Settings (actual response) ----------

export interface CmsSettings {
  site_name: string;
  title: string;
  tagline?: string;
  logo_url: string | null;
  frontend_url: string;
  copyright_text: string;
  social_links: Array<{ platform: string; url: string }>;
  quick_links: unknown | null;
  google_maps_url: string | null;
}

// ---------- CMS Post ----------

export interface CmsPost {
  id: number;
  tenant_id: number;
  title: string;
  slug: string;
  content: string | any[];
  excerpt?: string;
  featured_image?: string;
  status: 'published' | 'draft';
  author_id: number | null;
  created_at: string;
  updated_at: string;
  category?: string;
  reading_time?: number | string;
  [key: string]: unknown;
}

// ---------- CMS Comment ----------

export interface CmsComment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  content: string;
  status: 'approved' | 'pending' | 'spam';
  created_at: string;
}

export interface NewCommentPayload {
  name: string;
  email: string;
  content: string;
}

// ---------- Inquiry ----------

export interface InquiryPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}
