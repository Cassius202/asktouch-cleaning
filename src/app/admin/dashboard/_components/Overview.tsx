'use client'

import { AnalyticDuration } from "@/app/actions/trackEvent";
import { Dispatch, SetStateAction } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Calendar, 
  MousePointerClick, 
  Users, 
  Smartphone, 
  Monitor, 
  Tablet,
  TrendingUp,
  Clock,
  ChevronDown,
  ArrowUpRight,
  Activity,
  BarChart3
} from 'lucide-react';
import { VisitsAnalyticsResponse } from "@/constants/analytics.types";

interface OverviewProps {
  analyticDuration: AnalyticDuration;
  setAnalyticDuration: Dispatch<SetStateAction<AnalyticDuration>>;
  data: VisitsAnalyticsResponse['data'] | null;
  isLoading: boolean;
}

const durationOptions: { value: AnalyticDuration; label: string }[] = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'current-week', label: 'This Week' },
  { value: 'current-month', label: 'This Month' },
  { value: 'current-year', label: 'This Year' },
  { value: 'all', label: 'All Time' },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1'];

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Overview({ analyticDuration, setAnalyticDuration, data, isLoading }: OverviewProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-8 bg-gray-100 rounded-lg w-48"></div>
              <div className="h-10 bg-gray-100 rounded-lg w-40"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="h-80 bg-gray-100 rounded-xl"></div>
              <div className="h-80 bg-gray-100 rounded-xl"></div>
              <div className="h-80 bg-gray-100 rounded-xl lg:col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.summary) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium">No analytics data available</p>
          <p className="text-gray-400 text-sm mt-1">Data will appear once visits are tracked</p>
        </div>
      </div>
    );
  }

  const { summary } = data;
  const deviceData = [
    { name: 'Desktop', value: summary.deviceStats.desktop, icon: Monitor },
    { name: 'Mobile', value: summary.deviceStats.mobile, icon: Smartphone },
    { name: 'Tablet', value: summary.deviceStats.tablet, icon: Tablet },
    { name: 'Unknown', value: summary.deviceStats.unknown, icon: Users },
  ].filter(d => d.value > 0);

  const conversionRate = summary.totalVisits > 0 
    ? ((summary.clockIns / summary.totalVisits) * 100).toFixed(1) 
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Main Dashboard Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
                <p className="text-sm text-gray-500 mt-0.5">Track your site performance</p>
              </div>
            </div>
            
            <div className="relative">
              <select
                value={analyticDuration}
                onChange={(e) => setAnalyticDuration(e.target.value as AnalyticDuration)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 
                         text-gray-700 font-medium transition-all duration-200
                         hover:bg-gray-100 cursor-pointer"
              >
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-4 text-white">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-100" />
                </div>
                <p className="text-emerald-50 text-sm font-medium mb-1">Total Visits</p>
                <p className="text-3xl font-bold">{summary.totalVisits.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 p-4 text-white">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-blue-100" />
                </div>
                <p className="text-blue-50 text-sm font-medium mb-1">Clock Ins</p>
                <p className="text-3xl font-bold">{summary.clockIns.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 p-4 text-white">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-purple-100" />
                </div>
                <p className="text-purple-50 text-sm font-medium mb-1">Page Views</p>
                <p className="text-3xl font-bold">{summary.pageViews.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 p-4 text-white">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-orange-100" />
                </div>
                <p className="text-orange-50 text-sm font-medium mb-1">Conversion Rate</p>
                <p className="text-3xl font-bold">{conversionRate}%</p>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Visits Over Time Chart */}
            <div className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Visits Over Time</h3>
                <span className="text-xs text-gray-400 font-medium">Daily Breakdown</span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={summary.visitsByDate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="date" 
                      angle={-45} 
                      textAnchor="end" 
                      height={60}
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="clock_ins" 
                      stroke="#10b981" 
                      name="Clock Ins"
                      strokeWidth={2.5}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="page_views" 
                      stroke="#3b82f6" 
                      name="Page Views"
                      strokeWidth={2.5}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Distribution Pie Chart */}
            <div className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Device Distribution</h3>
                <span className="text-xs text-gray-400 font-medium">{deviceData.length} Devices</span>
              </div>
              <div className="h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={90}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {deviceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pages Bar Chart */}
            <div className="border border-gray-100 rounded-xl p-5 lg:col-span-2 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Top Pages</h3>
                <span className="text-xs text-gray-400 font-medium">Most Visited</span>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary.topPages} layout="vertical" barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      type="number" 
                      tick={{ fontSize: 12, fill: '#9ca3af' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      dataKey="page" 
                      type="category" 
                      width={120}
                      tick={{ fontSize: 12, fill: '#4b5563' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="count" 
                      fill="url(#colorGradient)" 
                      name="Visits"
                      radius={[0, 6, 6, 0]}
                    />
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}