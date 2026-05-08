"use client";

import { getRecentBlogs } from "@/app/actions/fetchBlogs";
import {
  AnalyticDuration,
  getRecentWebsiteVisits,
} from "@/app/actions/trackEvent";
import { VisitsAnalyticsResponse } from "@/constants/analytics.types";
import { Blog } from "@/constants/types";
import useSessionStorage from "@/hooks/useSessionStorage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Overview from "./_components/Overview";
import ExtraDetailsPage from "./_components/ExtraDetailsPage";
import Header from "./_components/HomeHeader";
import RecentClients from "./_components/RecentClients";
import { assets } from "@/constants/assets";
import Image from "next/image";

export default function DashboardPage() {
  const [analyticDuration, setAnalyticDuration] =
    useState<AnalyticDuration>("current-month");

  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [analyticsData, setAnalyticsData] = useSessionStorage<
    VisitsAnalyticsResponse["data"] | null
  >("analytics", null);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoadingBlogs(true);
      try {
        const blogResponse = await getRecentBlogs();
        if (!blogResponse.success || !blogResponse.data) {
          console.error("Failed to fetch blogs");
          toast.error("Failed to fetch blogs");
        } else {
          setBlogData(blogResponse.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoadingAnalytics(true);
      try {
        const analyticsResponse =
          await getRecentWebsiteVisits(analyticDuration);
        if (!analyticsResponse.success) {
          console.error("Failed to fetch analytics");
          toast.error("Failed to fetch analytics");
        } else {
          setAnalyticsData(analyticsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        toast.error("Failed to fetch analytics");
      } finally {
        setIsLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, [analyticDuration]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6 text-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Analytics Overview (spans 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <Overview
              analyticDuration={analyticDuration}
              setAnalyticDuration={setAnalyticDuration}
              data={analyticsData}
              isLoading={isLoadingAnalytics}
            />
          </div>

          {/* Right Column - Extra Details */}
          <div className="lg:col-span-1">
            <ExtraDetailsPage blogData={blogData} isLoading={isLoadingBlogs} />
          </div>
        </div>

        {/* Full Width Section - Recent Clients */}
        <div className="mt-6">
          <RecentClients />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 mt-6 mb-20">
        <Image
          src={assets.reviewQrCode}
          alt="Review QR code"
          width={200}
          height={200}
          className="w-full sm:w-[200px] h-auto rounded-xl border border-gray-200 shadow-sm"
        />
        <a
          href={assets.qrCodeLocation}
          download="asktouch-review-qr.png"
          className="w-full sm:w-50 text-center text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors px-4 py-2 rounded-lg"
        >
          Download QR Code
        </a>
      </div>
    </div>
  );
}
