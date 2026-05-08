'use server'

import { ClientFormData } from "@/constants/types";
import { createClient } from "@/lib/supabase/server"
import { completedClientUpload } from "./completedClientUpload";

const PAGE_SIZE = 10;

export interface ClientType extends ClientFormData {
  id: string;
}

export interface ClientFull extends ClientFormData {
  id: string;
  created_at: string;
  updated_at: string;
}



export async function getClients(index: number) {
  const supabase = await createClient();
  
  const from = (index - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('clients')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return { success: false, hasMore: false, data: [], total: 0, message: 'Error fetching clients' }
  }

  return {
    success: true,
    data: data as ClientType[],
    total: count ?? 0,
    hasMore: (count ?? 0) > to + 1,
    message: 'Clients fetched successfully'
  }
}
export async function getClientDetails(index: number) {
  const supabase = await createClient();
  
  const from = (index - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from('clients')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return { success: false, hasMore: false, data: [], total: 0, message: 'Error fetching clients' }
  }

  return {
    success: true,
    data: data as ClientFull[],
    total: count ?? 0,
    message: 'Clients fetched successfully'
  }
}

// Add this to your clientsTableOperations.ts
export async function getRecentClients(limit: number = 5) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent clients:', error);
    return { success: false, data: [], error: error.message };
  }

  return { success: true, data: data as ClientFull[] };
}

export async function deleteClient(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, message: 'Error deleting client' }
  }

  return { success: true, id, message: 'Client deleted successfully' }
}

export async function sendReview(client: ClientType) {
  // Strip id before passing to completedClientUpload
  const { id, ...clientData } = client;

  const result = await completedClientUpload(clientData, true, false);

  if (!result.success) {
    return { success: false, message: result.message ?? 'Failed to send review', id: id }
  }

  return { success: true, message: 'Review sent successfully!', id: id }
}