'use server'

import { createClient } from '@/lib/supabase/server'

export async function signInWithEmail(formData: { email: string; password: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    console.error('Error signing in:', error)
    return { success: false, message: 'Invalid email or password' }
  }

  return { success: true, message: 'Logged in successfully' }
}