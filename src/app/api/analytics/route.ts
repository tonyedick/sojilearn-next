import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';

/**
 * Analytics API - Server-side endpoint for tracking
 * Prevents direct client access to Supabase
 */

interface AnalyticsPayload {
  type: 'page_view' | 'event' | 'conversion' | 'search';
  data: Record<string, unknown>;
}

// Rate limiting (simple in-memory cache)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body: AnalyticsPayload = await request.json();
    const { type, data } = body;

    // Validate payload
    if (!type || !data) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    // Route to appropriate table based on type
    switch (type) {
      case 'page_view':
        await supabase.from('blog_posts').insert(data as any);
        break;
      
      case 'event':
      case 'conversion':
        await supabase.from('comments').insert(data as any);
        break;
      
      case 'search':
        await supabase.from('newsletter_subscribers').insert(data as any);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid analytics type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Prevent other methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
