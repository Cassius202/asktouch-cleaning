'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function handleSignOut() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    return { success: false, message: 'User not logged in' };
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
    return { success: false, message: 'Failed to sign out' };
  }

  redirect('/');
}