'use client';

import { supabase } from '@/integrations/supabase/client';

/**
 * Enterprise-grade Website Analytics Utility
 * Optimized for Next.js App Router with client-side tracking
 * 
 * Features:
 * - Page view tracking with device detection
 * - User event tracking (clicks, form submissions, etc.)
 * - Session management with 30-minute timeout
 * - Automatic cleanup and memory management
 * - Performance tracking
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface PageViewData {
  page_path: string;
  page_title: string;
  referrer: string;
  session_id: string;
  device_type: 'mobile' | 'tablet' | 'desktop';
  browser_name: string;
  browser_version: string;
  os_name: string;
  os_version: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

interface EventData {
  event_type: string;
  event_name: string;
  event_category?: string;
  event_label?: string;
  event_value?: number;
  page_path: string;
  session_id: string;
  metadata?: Record<string, any>;
}

interface ConversionData {
  conversion_type: string;
  conversion_value?: number;
  conversion_goal?: string;
  form_data?: Record<string, any>;
  session_id: string;
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

class SessionManager {
  private static readonly SESSION_KEY = 'sojilearn_analytics_session';
  private static readonly LAST_ACTIVITY_KEY = 'sojilearn_analytics_last_activity';
  private static readonly SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
  
  private static sessionId: string | null = null;
  private static isInitialized = false;

  static initialize(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;
    
    this.sessionId = this.getOrCreateSession();
    this.isInitialized = true;
    
    // Update activity on user interactions
    this.setupActivityTracking();
  }

  static getSessionId(): string {
    if (!this.isInitialized) {
      this.initialize();
    }
    return this.sessionId || this.getOrCreateSession();
  }

  private static getOrCreateSession(): string {
    if (typeof window === 'undefined') return '';

    const stored = this.getStoredSession();
    
    if (this.isSessionValid(stored)) {
      this.updateLastActivity();
      return stored.sessionId;
    }

    return this.createNewSession();
  }

  private static getStoredSession(): { sessionId: string; lastActivity: number } | null {
    try {
      const sessionId = localStorage.getItem(this.SESSION_KEY);
      const lastActivity = localStorage.getItem(this.LAST_ACTIVITY_KEY);

      if (sessionId && lastActivity) {
        return {
          sessionId,
          lastActivity: parseInt(lastActivity, 10),
        };
      }
    } catch (error) {
      console.warn('Failed to retrieve session from localStorage:', error);
    }

    return null;
  }

  private static isSessionValid(session: { sessionId: string; lastActivity: number } | null): boolean {
    if (!session) return false;

    const now = Date.now();
    const timeSinceLastActivity = now - session.lastActivity;

    return timeSinceLastActivity < this.SESSION_DURATION;
  }

  private static createNewSession(): string {
    const newSessionId = this.generateSessionId();
    
    try {
      localStorage.setItem(this.SESSION_KEY, newSessionId);
      this.updateLastActivity();
    } catch (error) {
      console.warn('Failed to store session in localStorage:', error);
    }

    this.sessionId = newSessionId;
    return newSessionId;
  }

  private static updateLastActivity(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.LAST_ACTIVITY_KEY, Date.now().toString());
    } catch (error) {
      console.warn('Failed to update last activity:', error);
    }
  }

  private static generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private static setupActivityTracking(): void {
    if (typeof window === 'undefined') return;

    const updateActivity = () => this.updateLastActivity();

    // Track various user interactions
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, updateActivity, { passive: true, once: false });
    });
  }

  static endSession(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(this.SESSION_KEY);
      localStorage.removeItem(this.LAST_ACTIVITY_KEY);
    } catch (error) {
      console.warn('Failed to end session:', error);
    }

    this.sessionId = null;
    this.isInitialized = false;
  }
}

// ============================================================================
// DEVICE & BROWSER DETECTION
// ============================================================================

class DeviceDetector {
  static getDeviceInfo() {
    if (typeof window === 'undefined') {
      return this.getDefaultDeviceInfo();
    }

    const ua = navigator.userAgent;

    return {
      device_type: this.getDeviceType(ua),
      browser_name: this.getBrowserName(ua),
      browser_version: this.getBrowserVersion(ua),
      os_name: this.getOSName(ua),
      os_version: this.getOSVersion(ua),
    };
  }

  private static getDefaultDeviceInfo() {
    return {
      device_type: 'desktop' as const,
      browser_name: 'Unknown',
      browser_version: 'Unknown',
      os_name: 'Unknown',
      os_version: 'Unknown',
    };
  }

  private static getDeviceType(ua: string): 'mobile' | 'tablet' | 'desktop' {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private static getBrowserName(ua: string): string {
    if (ua.includes('Firefox/')) return 'Firefox';
    if (ua.includes('Edg/')) return 'Edge';
    if (ua.includes('Chrome/')) return 'Chrome';
    if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Opera/') || ua.includes('OPR/')) return 'Opera';
    return 'Unknown';
  }

  private static getBrowserVersion(ua: string): string {
    const match = ua.match(/(Firefox|Edg|Chrome|Safari|Opera|OPR)\/([0-9.]+)/);
    return match ? match[2] : 'Unknown';
  }

  private static getOSName(ua: string): string {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac OS')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown';
  }

  private static getOSVersion(ua: string): string {
    const match = ua.match(/(Windows NT|Mac OS X|Android|iOS) ([0-9._]+)/);
    return match ? match[2].replace(/_/g, '.') : 'Unknown';
  }
}

// ============================================================================
// UTM PARAMETERS PARSER
// ============================================================================

class UTMParser {
  static getUTMParams() {
    if (typeof window === 'undefined') return {};

    try {
      const params = new URLSearchParams(window.location.search);
      
      return {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_term: params.get('utm_term') || undefined,
        utm_content: params.get('utm_content') || undefined,
      };
    } catch (error) {
      console.warn('Failed to parse UTM parameters:', error);
      return {};
    }
  }
}

// ============================================================================
// MAIN ANALYTICS CLASS
// ============================================================================

export class WebsiteAnalytics {
  private static isInitialized = false;
  private static currentVisitId: string | null = null;
  private static pageLoadTime: number = 0;
  private static maxScrollDepth: number = 0;
  private static cleanupFunctions: (() => void)[] = [];

  /**
   * Initialize analytics tracking
   * Call this once in your root layout or app component
   */
  static initialize(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;

    SessionManager.initialize();
    this.isInitialized = true;
    this.pageLoadTime = Date.now();

    // Track initial page view
    this.trackPageView();

    // Setup tracking
    this.setupScrollTracking();
    this.setupUnloadTracking();
    this.setupPerformanceTracking();
  }

  /**
   * Cleanup - call this when component unmounts or app closes
   */
  static cleanup(): void {
    this.cleanupFunctions.forEach(fn => fn());
    this.cleanupFunctions = [];
    this.isInitialized = false;
  }

  /**
   * Track page view
   */
  static async trackPageView(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const sessionId = SessionManager.getSessionId();
      const deviceInfo = DeviceDetector.getDeviceInfo();
      const utmParams = UTMParser.getUTMParams();

      const pageViewData: PageViewData = {
        session_id: sessionId,
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer || 'Direct',
        ...deviceInfo,
        ...utmParams,
      };

      const { data, error } = await supabase
        .from('website_visits')
        .insert(pageViewData)
        .select('id')
        .single();

      if (error) {
        console.warn('Failed to track page view:', error);
        return;
      }

      if (data) {
        this.currentVisitId = data.id;
      }

      this.pageLoadTime = Date.now();
      this.maxScrollDepth = 0;
    } catch (error) {
      console.warn('Error tracking page view:', error);
    }
  }

  /**
   * Track custom event
   */
  static async trackEvent(eventData: Omit<EventData, 'session_id' | 'page_path'>): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const sessionId = SessionManager.getSessionId();

      const fullEventData: EventData = {
        ...eventData,
        session_id: sessionId,
        page_path: window.location.pathname,
      };

      const { error } = await supabase
        .from('user_events')
        .insert(fullEventData);

      if (error) {
        console.warn('Failed to track event:', error);
      }
    } catch (error) {
      console.warn('Error tracking event:', error);
    }
  }

  /**
   * Track conversion
   */
  static async trackConversion(conversionData: Omit<ConversionData, 'session_id'>): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const sessionId = SessionManager.getSessionId();

      const fullConversionData: ConversionData = {
        ...conversionData,
        session_id: sessionId,
      };

      const { error } = await supabase
        .from('conversions')
        .insert(fullConversionData);

      if (error) {
        console.warn('Failed to track conversion:', error);
      }
    } catch (error) {
      console.warn('Error tracking conversion:', error);
    }
  }

  /**
   * Track form submission
   */
  static trackFormSubmission(
    formName: string,
    formData: Record<string, any>,
    value?: number
  ): void {
    // Track as event
    this.trackEvent({
      event_type: 'form_submit',
      event_name: formName,
      event_category: 'forms',
      event_value: value,
      metadata: formData,
    });

    // Track as conversion
    this.trackConversion({
      conversion_type: 'form_submission',
      conversion_goal: formName,
      conversion_value: value,
      form_data: formData,
    });
  }

  /**
   * Track button click
   */
  static trackButtonClick(
    buttonName: string,
    category: string = 'buttons',
    label?: string
  ): void {
    this.trackEvent({
      event_type: 'click',
      event_name: buttonName,
      event_category: category,
      event_label: label,
    });
  }

  /**
   * Track link click
   */
  static trackLinkClick(href: string, linkText: string, isExternal: boolean = false): void {
    this.trackEvent({
      event_type: 'click',
      event_name: isExternal ? 'external_link' : 'internal_link',
      event_category: 'links',
      event_label: linkText,
      metadata: { href },
    });
  }

  /**
   * Track download
   */
  static trackDownload(fileName: string, fileType: string, fileUrl: string): void {
    this.trackEvent({
      event_type: 'download',
      event_name: fileName,
      event_category: 'downloads',
      event_label: fileType,
      metadata: { fileUrl },
    });
  }

  /**
   * Track search
   */
  static trackSearch(searchTerm: string, resultsCount?: number): void {
    this.trackEvent({
      event_type: 'search',
      event_name: 'site_search',
      event_category: 'search',
      event_label: searchTerm,
      event_value: resultsCount,
    });
  }

  /**
   * Setup scroll tracking
   */
  private static setupScrollTracking(): void {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

      if (scrollPercent > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercent;

        // Track milestone scrolls (25%, 50%, 75%, 100%)
        const milestones = [25, 50, 75, 100];
        const milestone = milestones.find(m => 
          scrollPercent >= m && this.maxScrollDepth < m + 25
        );

        if (milestone) {
          this.trackEvent({
            event_type: 'scroll',
            event_name: 'scroll_depth',
            event_category: 'engagement',
            event_label: `${milestone}%`,
            event_value: milestone,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    this.cleanupFunctions.push(() => {
      window.removeEventListener('scroll', handleScroll);
    });
  }

  /**
   * Setup unload tracking
   */
  private static setupUnloadTracking(): void {
    if (typeof window === 'undefined' || !this.currentVisitId) return;

    const handleUnload = () => {
      const timeOnPage = Math.round((Date.now() - this.pageLoadTime) / 1000);

      // Use sendBeacon for reliable tracking during page unload
      const data = JSON.stringify({
        time_on_page: timeOnPage,
        scroll_depth: this.maxScrollDepth,
        left_at: new Date().toISOString(),
      });

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/website_visits?id=eq.${this.currentVisitId}`;
      
      navigator.sendBeacon(url, data);
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    this.cleanupFunctions.push(() => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
    });
  }

  /**
   * Setup performance tracking
   */
  private static setupPerformanceTracking(): void {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    window.addEventListener('load', () => {
      setTimeout(async () => {
        try {
          const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

          if (perfData) {
            const metrics = {
              page_path: window.location.pathname,
              load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
              dom_ready_time: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
              ttfb: Math.round(perfData.responseStart - perfData.requestStart),
            };

            await supabase.from('performance_metrics').insert(metrics);
          }
        } catch (error) {
          console.warn('Failed to track performance metrics:', error);
        }
      }, 0);
    });
  }
}

// Export singleton instance
export const analytics = WebsiteAnalytics;
export default WebsiteAnalytics;