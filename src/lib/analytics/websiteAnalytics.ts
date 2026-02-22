'use client';

import { useEffect, useRef } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON as string;

type VisitorInfo = {
  userAgent: string;
  referrer: string | null;
  language: string;
  screen: string;
  timezone: string;
};

type SupabaseInsertPayload = Record<string, unknown>;

const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

const makeRequest = async (endpoint: string, data: SupabaseInsertPayload): Promise<Response | undefined> => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials not configured');
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.warn('Analytics error:', error);
  }
};

const getVisitorInfo = (): VisitorInfo => {
  if (typeof window === 'undefined') {
    return {
      userAgent: 'SSR',
      referrer: null,
      language: 'en',
      screen: '0x0',
      timezone: 'UTC'
    };
  }

  return {
    userAgent: navigator.userAgent,
    referrer: document.referrer || null,
    language: navigator.language,
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};

// ============================================================================
// REACT HOOKS API
// ============================================================================

export const usePageTracking = (blogPostId: string | null = null): void => {
  const startTime = useRef<number>(0);
  const sessionId = useRef<string>('');
  const hasTracked = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasTracked.current) return;
    
    startTime.current = Date.now();
    sessionId.current = getSessionId();

    const initializeSession = async (): Promise<void> => {
      const visitorInfo = getVisitorInfo();

      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/user_sessions?session_id=eq.${sessionId.current}`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`
            }
          }
        );

        const sessions = await response.json();

        if (sessions && sessions.length > 0) {
          await makeRequest('user_sessions', {
            session_id: sessionId.current,
            last_visit: new Date().toISOString(),
            total_page_views: (sessions[0].total_page_views || 0) + 1,
            is_returning_visitor: true
          });
        } else {
          await makeRequest('user_sessions', {
            session_id: sessionId.current,
            user_agent: visitorInfo.userAgent,
            referrer: visitorInfo.referrer,
            is_returning_visitor: false
          });
        }
      } catch (error) {
        console.warn('Error initializing session:', error);
      }
    };

    const trackPageView = async (): Promise<void> => {
      const visitorInfo = getVisitorInfo();
      await makeRequest('page_views', {
        page_path: window.location.pathname,
        blog_post_id: blogPostId,
        user_session_id: sessionId.current,
        user_agent: visitorInfo.userAgent,
        referrer: visitorInfo.referrer
      });
    };

    const handleBeforeUnload = (): void => {
      const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);

      navigator.sendBeacon(
        `${SUPABASE_URL}/rest/v1/page_views`,
        JSON.stringify({
          page_path: window.location.pathname,
          blog_post_id: blogPostId,
          user_session_id: sessionId.current,
          time_on_page: timeOnPage
        })
      );
    };

    initializeSession();
    trackPageView();
    hasTracked.current = true;

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [blogPostId]);
};

export const useSearchTracking = () => {
  const sessionId = useRef<string>(getSessionId());

  const trackSearch = async (
    searchQuery: string,
    resultsCount: number,
    clickedPostId: string | null = null
  ): Promise<void> => {
    await makeRequest('search_analytics', {
      search_query: searchQuery,
      results_count: resultsCount,
      clicked_post_id: clickedPostId,
      user_session_id: sessionId.current
    });
  };

  return { trackSearch };
};

export const useConversionTracking = () => {
  const sessionId = useRef<string>(getSessionId());

  const trackConversion = async (
    eventType: string,
    blogPostId: string | null = null,
    subscriberEmail: string | null = null
  ): Promise<void> => {
    await makeRequest('conversion_events', {
      event_type: eventType,
      blog_post_id: blogPostId,
      user_session_id: sessionId.current,
      subscriber_email: subscriberEmail
    });
  };

  return { trackConversion };
};