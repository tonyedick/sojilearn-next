'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { WebsiteAnalytics } from '@/lib/analytics/websiteAnalytics';

/**
 * React hook for automatic page view tracking on route changes
 * Use this in your root layout or pages that need analytics
 */
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view when route changes
    WebsiteAnalytics.trackPageView();
  }, [pathname, searchParams]);

  return {
    trackEvent: WebsiteAnalytics.trackEvent.bind(WebsiteAnalytics),
    trackConversion: WebsiteAnalytics.trackConversion.bind(WebsiteAnalytics),
    trackFormSubmission: WebsiteAnalytics.trackFormSubmission.bind(WebsiteAnalytics),
    trackButtonClick: WebsiteAnalytics.trackButtonClick.bind(WebsiteAnalytics),
    trackLinkClick: WebsiteAnalytics.trackLinkClick.bind(WebsiteAnalytics),
    trackDownload: WebsiteAnalytics.trackDownload.bind(WebsiteAnalytics),
    trackSearch: WebsiteAnalytics.trackSearch.bind(WebsiteAnalytics),
  };
}