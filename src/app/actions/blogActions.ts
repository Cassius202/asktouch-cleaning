// app/actions/blogActions.ts
'use server'

import { getBlogs } from "@/lib/blog-service";

export async function fetchBlogsAction(cursor?: string) {
  try {
    const result = await getBlogs(cursor);
    // Return the format your UI expects
    return { 
      success: true, 
      data: result.data, 
      nextCursor: result.nextCursor, 
      hasMore: result.hasMore 
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch blogs" };
  }
}