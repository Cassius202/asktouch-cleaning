// app/actions/blogActions.ts
'use server'

import { Blog, CreateBlogDTO, UpdateBlogDTO } from '@/constants/types';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Create new blog
export async function createBlog(blogData: CreateBlogDTO) {
  const supabase = await createClient();

  try {
    // Generate slug if not provided
    const slug = blogData.slug || generateSlug(blogData.title);
    
    // Check if slug already exists
    const { data: existingBlog } = await supabase
      .from('blogs')
      .select('slug')
      .eq('slug', slug)
      .single();

    // If slug exists, append timestamp
    const finalSlug = existingBlog ? `${slug}-${Date.now()}` : slug;

    const { data, error } = await supabase
      .from('blogs')
      .insert([{
        ...blogData,
        slug: finalSlug,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog:', error);
      return { success: false, error: error.message };
    }

    // Revalidate the blogs list page
    revalidatePath('/blogs');
    revalidatePath('/');
    
    return { success: true, slug: finalSlug, data: data as Blog };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create blog' 
    };
  }
}

// Update blog
export async function updateBlog(id: string, updates: UpdateBlogDTO) {
  const supabase = await createClient();

  try {
    // If title is being updated, check if slug needs update
    let slug = updates.slug;
    if (updates.title && !updates.slug) {
      slug = generateSlug(updates.title);
      
      // Check if new slug already exists (excluding current blog)
      const { data: existingBlog } = await supabase
        .from('blogs')
        .select('slug')
        .eq('slug', slug)
        .neq('id', id)
        .single();

      if (existingBlog) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const { data, error } = await supabase
      .from('blogs')
      .update({
        ...updates,
        ...(slug && { slug }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog:', error);
      return { success: false, error: error.message };
    }

    // Revalidate affected pages
    revalidatePath('/blogs');
    revalidatePath(`/blogs/${data.slug}`);
    revalidatePath('/');
    
    return { success: true, data: data as Blog };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update blog' 
    };
  }
}

// Delete blog
export async function deleteBlog(id: string, slug?: string) {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog:', error);
      return { success: false, error: error.message };
    }

    // Revalidate pages
    revalidatePath('/blogs');
    if (slug) {
      revalidatePath(`/blogs/${slug}`);
    }
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete blog' 
    };
  }
}

// Search blogs
export async function searchBlogs(searchTerm: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error searching blogs:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data as Blog[] };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to search blogs' 
    };
  }
}

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getRecentBlogs() {
  const supabase = await createClient();

  // Get current date
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11 (0 = January)
  
  const startOfMonth = new Date(year, month, 1);
  // Get first day of next month
  const startOfNextMonth = new Date(year, month + 1, 1);
  
  // Convert to ISO strings for Supabase query
  const startDate = startOfMonth.toISOString();
  const endDate = startOfNextMonth.toISOString();

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .gte('created_at', startDate)
    .lt('created_at', endDate)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recent blogs:', error);
    return { success: false, error: error.message, data: null };
  }

  return { success: true, data: data as Blog[], blogCount: data.length };
}