// hooks/useDashboardData.ts
import useSessionStorage from './useSessionStorage';
import { AnalyticDuration } from "@/app/actions/trackEvent";
import { VisitsAnalyticsResponse } from '@/constants/analytics.types';
import { Blog } from "@/constants/types";

// Hook for analytics data
export function useAnalyticsStorage() {
  return useSessionStorage<VisitsAnalyticsResponse['data'] | null>(
    'analytics_data', 
    null
  );
}

// Hook for blog data
export function useBlogStorage() {
  return useSessionStorage<Blog[]>(
    'blog_data', 
    []
  );
}

// Hook for analytics duration preference
export function useAnalyticsDuration() {
  return useSessionStorage<AnalyticDuration>(
    'analytics_duration', 
    'current-month'
  );
}

// Hook for user preferences
export function useDashboardPreferences() {
  return useSessionStorage<{
    sidebarCollapsed: boolean;
    lastViewedTab: string;
    refreshInterval: number;
  }>(
    'dashboard_preferences',
    {
      sidebarCollapsed: false,
      lastViewedTab: 'overview',
      refreshInterval: 30000 // 30 seconds
    }
  );
}