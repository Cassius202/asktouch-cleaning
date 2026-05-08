export type VisitEvent = 'clock_in' | 'page_view'

export type DeviceType = 'desktop' | 'mobile' | 'tablet' | 'unknown'

export interface Visit {
  id?: string
  page: string | null
  event: VisitEvent
  device_type: DeviceType
  visited_at: string // ISO date string

  // Optional extras
  visitor_id?: string
  ip_address?: string
  referrer?: string
}

export interface DeviceStats {
  desktop: number
  mobile: number
  tablet: number
  unknown: number
}

export interface TopPage {
  page: string
  count: number
}

export interface VisitsByDate {
  date: string
  clock_ins: number
  page_views: number
  total: number
}

export interface VisitsSummary {
  totalVisits: number
  clockIns: number
  pageViews: number
  deviceStats: DeviceStats
  topPages: TopPage[]
  visitsByDate: VisitsByDate[]
}

export interface VisitsAnalyticsData {
  visits: Visit[]
  summary: VisitsSummary
}

export interface VisitsAnalyticsResponse {
  success: boolean
  data: VisitsAnalyticsData
}