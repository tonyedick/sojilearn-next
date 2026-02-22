import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, action } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServer();

    if (action === 'check') {
      // Check if session exists
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      return NextResponse.json({ 
        exists: !!data,
        session: data 
      });
    }

    if (action === 'create') {
      // Create new session
      const { data: sessionData } = body;
      const { error } = await supabase
        .from('user_sessions')
        .insert(sessionData);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    if (action === 'update') {
      // Update existing session
      const { data: updateData } = body;
      const { error } = await supabase
        .from('user_sessions')
        .update(updateData)
        .eq('session_id', sessionId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Session API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
