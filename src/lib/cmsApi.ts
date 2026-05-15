// ============================================================
// CMS API Client — UniVerse Headless CMS
// Header: x-api-key (lowercase, sesuai requirement CMS)
// ============================================================

import type { CmsPage, CmsPost, CmsSettings, CmsComment, NewCommentPayload, InquiryPayload } from './types';

const BASE_URL = import.meta.env.VITE_CMS_BASE_URL as string;
const API_KEY = import.meta.env.VITE_CMS_API_KEY as string;

if (!BASE_URL) console.warn('[CMS] VITE_CMS_BASE_URL belum diset di .env');
if (!API_KEY) console.warn('[CMS] VITE_CMS_API_KEY belum diset di .env');

// ---------- Endpoints ----------

export const CMS_ENDPOINTS = {
  health:          '/api/v1/health',
  settings:        '/api/v1/public/settings',
  navigation:      '/api/v1/public/navigation',
  pages:           '/api/v1/public/pages',
  pageBySlug:      (slug: string) => `/api/v1/public/pages/${slug}`,
  posts:           '/api/v1/public/posts',
  postBySlug:      (slug: string) => `/api/v1/public/posts/${slug}`,
  postComments:    (postId: string | number) => `/api/v1/public/posts/${postId}/comments`,
  inquiries:       '/api/v1/inquiries',
} as const;

// ---------- Fetch helper ----------

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function cmsRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    );
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,          // lowercase, sesuai CMS requirement
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`[CMS] ${response.status} ${response.statusText} — ${endpoint}\n${errorText}`);
  }

  return response.json() as Promise<T>;
}

// ---------- API Functions ----------

/** GET /api/v1/health */
export async function checkHealth(): Promise<unknown> {
  return cmsRequest(CMS_ENDPOINTS.health);
}

/** GET /api/v1/public/settings */
export async function getSettings(): Promise<CmsSettings> {
  return cmsRequest<CmsSettings>(CMS_ENDPOINTS.settings);
}

/** GET /api/v1/public/navigation */
export async function getNavigation(): Promise<unknown[]> {
  return cmsRequest<unknown[]>(CMS_ENDPOINTS.navigation);
}

/** GET /api/v1/public/pages — returns array */
export async function getPages(params?: Record<string, string | number | boolean>): Promise<CmsPage[]> {
  return cmsRequest<CmsPage[]>(CMS_ENDPOINTS.pages, { params });
}

/**
 * GET /api/v1/public/pages/:slug
 * CMS may return a single page or an array — we normalise to CmsPage | null
 */
export async function getPageBySlug(slug: string): Promise<CmsPage | null> {
  const result = await cmsRequest<CmsPage | CmsPage[]>(CMS_ENDPOINTS.pageBySlug(slug));
  if (Array.isArray(result)) return result[0] ?? null;
  return result ?? null;
}

/**
 * Get page by slug — menggunakan /pages list karena endpoint /pages/:slug
 * membutuhkan autentikasi berbeda di CMS ini.
 * Coba /pages/:slug dulu, jika gagal fallback ke filter dari /pages list.
 */
export async function getPageSafe(slug: string): Promise<CmsPage | null> {
  // Langsung ambil dari list dan filter — lebih reliable
  try {
    const all = await getPages();
    return all.find((p) => p.slug === slug) ?? null;
  } catch {
    return null;
  }
}

/** GET /api/v1/public/posts */
export async function getPosts(params?: Record<string, string | number | boolean>): Promise<CmsPost[]> {
  return cmsRequest<CmsPost[]>(CMS_ENDPOINTS.posts, { params });
}

/** GET /api/v1/public/posts/:slug */
export async function getPostBySlug(slug: string): Promise<CmsPost | null> {
  const result = await cmsRequest<CmsPost | CmsPost[]>(CMS_ENDPOINTS.postBySlug(slug));
  if (Array.isArray(result)) return result[0] ?? null;
  return result ?? null;
}

/** GET /api/v1/public/posts/:id/comments */
export async function getPostComments(postId: string | number): Promise<CmsComment[]> {
  return cmsRequest<CmsComment[]>(CMS_ENDPOINTS.postComments(postId));
}

/** POST /api/v1/public/posts/:id/comments */
export async function submitComment(postId: string | number, payload: NewCommentPayload): Promise<unknown> {
  return cmsRequest(CMS_ENDPOINTS.postComments(postId), {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** POST /api/v1/inquiries */
export async function submitInquiry(payload: InquiryPayload): Promise<unknown> {
  return cmsRequest(CMS_ENDPOINTS.inquiries, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
