// ============================================================
// CMS React Hooks — Updated untuk type CMS aktual
// ============================================================

import { useState, useEffect } from 'react';
import {
  getSettings,
  getNavigation,
  getPages,
  getPageBySlug,
  getPageSafe,
  getPosts,
  getPostBySlug,
  getPostComments,
} from './cmsApi';
import type { CmsPage, CmsPost, CmsSettings, CmsComment } from './types';

// ---------- Generic hook state ----------

interface HookState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// ---------- useSettings ----------

export function useSettings() {
  const [state, setState] = useState<HookState<CmsSettings>>({ data: null, loading: true, error: null });

  useEffect(() => {
    getSettings()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
  }, []);

  return state;
}

// ---------- useNavigation ----------

export function useNavigation() {
  const [state, setState] = useState<HookState<unknown[]>>({ data: null, loading: true, error: null });

  useEffect(() => {
    getNavigation()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
  }, []);

  return state;
}

// ---------- usePages ----------

export function usePages(params?: Record<string, string | number | boolean>) {
  const [state, setState] = useState<HookState<CmsPage[]>>({ data: null, loading: true, error: null });
  const key = JSON.stringify(params);

  useEffect(() => {
    getPages(params)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

// ---------- usePageBySlug ----------

export function usePageBySlug(slug: string) {
  const [state, setState] = useState<HookState<CmsPage>>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!slug) return;
    getPageBySlug(slug)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
  }, [slug]);

  return state;
}

// ---------- usePageSafe (with fallback to list) ----------

export function usePageSafe(slug: string) {
  const [state, setState] = useState<HookState<CmsPage>>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!slug) return;
    getPageSafe(slug)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
  }, [slug]);

  return state;
}

// ---------- usePosts ----------

export function usePosts(params?: Record<string, string | number | boolean>) {
  const [state, setState] = useState<HookState<CmsPost[]>>({ data: null, loading: true, error: null });
  const key = JSON.stringify(params);

  useEffect(() => {
    getPosts(params)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

// ---------- usePostBySlug ----------

export function usePostBySlug(slug: string) {
  const [state, setState] = useState<HookState<CmsPost>>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!slug) return;
    getPostBySlug(slug)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
  }, [slug]);

  return state;
}

// ---------- usePostComments ----------

export function usePostComments(postId: string | number) {
  const [state, setState] = useState<HookState<CmsComment[]>>({ data: null, loading: true, error: null });

  useEffect(() => {
    if (!postId) return;
    getPostComments(postId)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
  }, [postId]);

  return state;
}
