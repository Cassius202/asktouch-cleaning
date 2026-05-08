"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, trackClockIn } from "@/app/actions/trackEvent";
import useSessionStorage from "@/hooks/useSessionStorage";
import { ClockInEvent, DeviceType } from "@/constants/types";

const allowedRoutes = [
  "home", "book", "services", "reviews", "about", "contact", "blog", "review-form",
] as const;

type TrackedPaths = (typeof allowedRoutes)[number];
type VisitState = Record<TrackedPaths, boolean>;

function isValidRoute(segment: string | undefined): segment is TrackedPaths {
  return segment !== undefined && allowedRoutes.includes(segment as TrackedPaths);
}

function getDeviceType(): DeviceType {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

function getClockInEvent(path: TrackedPaths): ClockInEvent {
  switch (path) {
    case 'book':        return 'booking';
    case 'contact':     return 'contact-attempt';
    case 'home':        return 'normal-visit';
    case 'review-form': return 'review-funnel-visit';
    case 'blog':        return 'blog-visit';
    default:            return 'page_view';
  }
}

export function Tracker() {
  const pathname = usePathname();
  const firstSegment = pathname.split("/")[1];
  const path: TrackedPaths = isValidRoute(firstSegment) ? firstSegment : "home";

  const [isFirstVisit, setIsFirstVisit] = useSessionStorage<VisitState>("visits", {
    home: true,
    book: true,
    services: true,
    reviews: true,
    about: true,
    contact: true,
    blog: true,
    "review-form": true,
  });

  const [mainVisit, setMainVisit] = useSessionStorage("mainVisit", false);

  // clock_in — once per session
useEffect(() => {
  if (mainVisit) return;
  setMainVisit(true);
  
  trackClockIn(path, getDeviceType(), getClockInEvent(path))
    .catch(error => console.error("[Tracker] clock_in failed:", error));
}, []);
  // page_view — once per route per session
useEffect(() => {
  if (!isFirstVisit[path]) return;
  setIsFirstVisit(prev => ({ ...prev, [path]: false }));
  
  trackEvent({ event: "page_view", page: path })
    .catch(error => console.error("[Tracker] page_view failed:", error));
}, [path]);

  return null;
}