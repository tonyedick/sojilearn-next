'use client';

import { useEffect, useRef } from 'react';

type VisitorInfo = {
  userAgent: string;
  referrer: string | null;
  language: string;
  screen: string;
  timezone: string;
};

const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Use internal API instead of direct Supabase access
const makeRequest = async (type: string, data: Record<string, unknown>): Promise<void> => {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data })
    });
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
// HOOK-BASED API (Original React App)
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
          `${SUPABASE_URL}/rest/v1/user_sessions?session_id=eq.${sessionId.current}&select=*`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`
            }
          }
        );

        if (!response.ok) {
          console.warn('Analytics: Could not fetch session');
          return;
        }

        const sessions = await response.json();

        if (sessions && Array.isArray(sessions) && sessions.length > 0) {
          // Update existing session
          await updateRequest(
            'user_sessions',
            `session_id=eq.${sessionId.current}`,
            {
              last_visit: new Date().toISOString(),
              total_page_views: (sessions[0].total_page_views || 0) + 1,
            }
          );
        } else {
          // Create new session
          await makeRequest('user_sessions', {
            session_id: sessionId.current,
            user_agent: visitorInfo.userAgent,
            referrer: visitorInfo.referrer,
            is_returning_visitor: false,
            total_page_views: 1
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

      const payload = JSON.stringify({
        page_path: window.location.pathname,
        blog_post_id: blogPostId,
        user_session_id: sessionId.current,
        time_on_page: timeOnPage
      });

      navigator.sendBeacon(
        `${SUPABASE_URL}/rest/v1/page_views`,
        new Blob([payload], { type: 'application/json' })
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

// ============================================================================
// STATIC API (For useAnalytics hook compatibility)
// ============================================================================

export class WebsiteAnalytics {
  static async trackPageView(blogPostId: string | null = null): Promise<void> {
    if (typeof window === 'undefined') return;

    const sessionId = getSessionId();
    const visitorInfo = getVisitorInfo();

    await makeRequest('page_views', {
      page_path: window.location.pathname,
      blog_post_id: blogPostId,
      user_session_id: sessionId,
      user_agent: visitorInfo.userAgent,
      referrer: visitorInfo.referrer
    });
  }

  static async trackEvent(
    eventName: string,
    eventCategory?: string,
    eventLabel?: string,
    eventValue?: number,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    await makeRequest('conversion_events', {
      event_type: 'custom_event',
      event_name: eventName,
      event_category: eventCategory,
      event_label: eventLabel,
      event_value: eventValue,
      page_path: window.location.pathname,
      user_session_id: getSessionId(),
      metadata: metadata ? JSON.stringify(metadata) : null
    });
  }

  static async trackConversion(data: {
    event_type?: string;
    blog_post_id?: string | null;
    subscriber_email?: string | null;
    conversion_value?: number;
  }): Promise<void> {
    if (typeof window === 'undefined') return;

    await makeRequest('conversion_events', {
      event_type: data.event_type || 'conversion',
      blog_post_id: data.blog_post_id || null,
      user_session_id: getSessionId(),
      subscriber_email: data.subscriber_email || null,
      conversion_value: data.conversion_value
    });
  }

  static async trackSearch(
    searchQuery: string,
    resultsCount: number,
    clickedPostId?: string | null
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    await makeRequest('search_analytics', {
      search_query: searchQuery,
      results_count: resultsCount,
      clicked_post_id: clickedPostId,
      user_session_id: getSessionId()
    });
  }

  static async trackFormSubmission(formName: string, formData?: Record<string, unknown>): Promise<void> {
    await this.trackConversion({ event_type: 'form_submission' });
    await this.trackEvent('form_submit', 'form', formName, undefined, formData);
  }

  static async trackButtonClick(buttonName: string, buttonCategory?: string): Promise<void> {
    await this.trackEvent('button_click', buttonCategory || 'button', buttonName);
  }

  static async trackLinkClick(linkUrl: string, linkText?: string): Promise<void> {
    await this.trackEvent('link_click', 'navigation', linkText || linkUrl, undefined, { url: linkUrl });
  }

  static async trackDownload(fileName: string, fileUrl: string): Promise<void> {
    await this.trackEvent('download', 'file', fileName, undefined, { url: fileUrl });
  }
}

export const analytics = WebsiteAnalytics;
export default WebsiteAnalytics;