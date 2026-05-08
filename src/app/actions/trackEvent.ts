'use server' 

import { createClient } from "@/lib/supabase/server"
import { ClockInEvent, DeviceType } from "@/constants/types"

export type AnalyticDuration = 'day' | 'week' | 'month' | 'year' | 'all' | 'current-year' | 'current-month' | 'current-week';

export async function trackEvent({ event, page, metadata }: { event: string, page: string, metadata?: Record<string, string | number> }) {
  const cleanedPage = page.replace(/\//g, '') || 'home'
  const supabase = await createClient()
  const {error} = await supabase.from('analytics').insert({event, page: cleanedPage, metadata})

  if (error) {
    console.error('Error tracking event:', error)
  }
}

export async function trackClockIn(
  path: string,
  device_type: DeviceType,
  event: ClockInEvent
) {
  try {
    const supabase = await createClient()
    const { data, error, status, statusText } = await supabase
      .from('website_visits')
      .insert([
        {
          event,
          page: path,
          device_type,
        },
      ])
      .select()

    console.log("INSERT RESPONSE:", {
      data,
      error,
      status,
      statusText,
    })

    if (error) {
      console.error("SUPABASE ERROR:", error)
    }
  } catch (err) {
    console.error("TRACK ERROR:", err)
  }
}

export async function getRecentWebsiteVisits(duration: AnalyticDuration = 'current-month') {
  const supabase = await createClient()

  try {
    let query = supabase
      .from('website_visits')
      .select('*')
      .order('visited_at', { ascending: false })

    const now = new Date()
    let startDate: Date | null = null

    switch (duration) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        // Last 7 days
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        // Last 30 days
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 30)
        break
      case 'year':
        // Last 365 days
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 365)
        break
      case 'current-week':
        // Start of current week (Sunday)
        startDate = new Date(now)
        startDate.setDate(now.getDate() - now.getDay())
        startDate.setHours(0, 0, 0, 0)
        break
      case 'current-month':
        // Start of current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'current-year':
        // Start of current year
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      case 'all':
        // No date filter
        startDate = null
        break
      default:
        // Default to current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    // Apply date filter if not 'all'
    if (startDate && duration !== 'all') {
      query = query.gte('visited_at', startDate.toISOString())
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching website visits:', error)
      return { 
        success: false, 
        data: null, 
        error: error.message 
      }
    }

    // Calculate statistics
    const totalVisits = data.length
    const clockIns = data.filter(visit => visit.event === 'clock_in').length
    const pageViews = data.filter(visit => visit.event === 'page_view').length
    
    // Group by device type
    const deviceStats = {
      desktop: data.filter(visit => visit.device_type === 'desktop').length,
      mobile: data.filter(visit => visit.device_type === 'mobile').length,
      tablet: data.filter(visit => visit.device_type === 'tablet').length,
      unknown: data.filter(visit => visit.device_type === 'unknown').length,
    }

    // Group by page
    const pageStats: Record<string, number> = {}
    data.forEach(visit => {
      const page = visit.page || 'unknown'
      pageStats[page] = (pageStats[page] || 0) + 1
    })

    // Group by date (for charts)
    const visitsByDate: Record<string, { clock_ins: number, page_views: number, total: number }> = {}
    data.forEach(visit => {
      const date = new Date(visit.visited_at).toISOString().split('T')[0]
      if (!visitsByDate[date]) {
        visitsByDate[date] = { clock_ins: 0, page_views: 0, total: 0 }
      }
      if (visit.event === 'clock_in') {
        visitsByDate[date].clock_ins++
      } else if (visit.event === 'page_view') {
        visitsByDate[date].page_views++
      }
      visitsByDate[date].total++
    })

    return { 
      success: true, 
      data: {
        visits: data,
        summary: {
          totalVisits,
          clockIns,
          pageViews,
          deviceStats,
          topPages: Object.entries(pageStats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([page, count]) => ({ page, count })),
          visitsByDate: Object.entries(visitsByDate).map(([date, stats]) => ({
            date,
            ...stats
          }))
        }
      }
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch analytics',
    }
  }
}