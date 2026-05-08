// lib/blog-service.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Blog } from '@/constants/types';

// Use the standard client for FETCHING. 
// This DOES NOT call cookies(), so it won't crash in generateMetadata.
const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getBlogById(id: string) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .maybeSingle(); // maybeSingle is safer than .single() in production

    if (error) throw error;
    return data as Blog | null;
  } catch (error) {
    console.error('Error in getBlogById:', error);
    return null;
  }
}

export async function getBlogs(cursor?: string) {
  const FETCH_LIMIT = 15;
  try {
    let query = supabase
      .from('blogs')
      .select('*')
      .limit(FETCH_LIMIT)
      .order('created_at', { ascending: false });

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data, error } = await query;
    if (error) throw error;

    const nextCursor = data.length === FETCH_LIMIT ? data[data.length - 1].created_at : undefined;

    return {
      data: data as Blog[],
      nextCursor,
      hasMore: data.length === FETCH_LIMIT
    };
  } catch (error) {
    console.error('Error in getBlogs:', error);
    return { data: [], nextCursor: undefined, hasMore: false };
  }
}