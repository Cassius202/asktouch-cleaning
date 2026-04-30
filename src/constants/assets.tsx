import logo from '../../public/logo-normal.png';
import logoGrayscale from '../../public/logo-colorless.png';
import chatbotImage from '../../public/bot-profile.jpg';
import whatsappBg from '../../public/whatsapp-background.jpg';
import { Review } from './types';

const testimonialThumbnail = 'https://nsqgfrsugkvsftnffeno.supabase.co/storage/v1/object/public/images/thumbnail.jpg';

export const assets = {
  logo, chatbotImage,
  logoGrayscale, whatsappBg, testimonialThumbnail
};

export const resendRecepients: string[] = [
  'cassiusejekwu@gmail.com', 'askakinnawo@gmail.com'
]

export const testimonialSampleVideo = 'https://nsqgfrsugkvsftnffeno.supabase.co/storage/v1/object/public/videos/testimonial-sample.mp4';
export const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    title: "Homeowner",
    rating: 5,
    review: "Your service is top-notch…I will choose your brand over and over again, my home looks remodeled. Omo you too good👍 The attention to detail is unmatched - they even cleaned areas I never thought to check!"
  },
  {
    name: "Michael Adebayo",
    title: "Property Manager",
    rating: 5,
    review: "We've tried 5 different cleaning companies for our 12-unit building, and none compare. Professional, punctual, and thorough. My tenants have been sending me compliments non-stop!"
  },
  {
    name: "Jennifer Williams",
    title: "Busy Mom of 3",
    rating: 5,
    review: "Life-changing! With three kids under 7, my house was a disaster zone. The team came in and transformed everything in record time. Now I actually enjoy coming home after work. Thank you!"
  },
  {
    name: "David Okafor",
    title: "CEO, TechStart NG",
    rating: 4,
    review: "Very impressed with their office cleaning service. Our workspace has never looked this organized and fresh. My team is more productive in a clean environment. Highly recommended!"
  },
  {
    name: "Amanda Foster",
    title: "Real Estate Agent",
    rating: 5,
    review: "I needed a last-minute deep clean for a property showing the next morning. They came through at 8pm! Got the listing sold above asking price. Worth every single naira!"
  },
  {
    name: "Robert Chen",
    title: "Restaurant Owner",
    rating: 5,
    review: "Finally found a cleaning service that understands commercial needs. They work around our busy hours, use proper sanitization, and never cut corners. Our health inspection score improved because of them!"
  },
  {
    name: "Grace Okonkwo",
    title: "First-Time Homeowner",
    rating: 5,
    review: "As someone with severe allergies, I was nervous about cleaning products. They used eco-friendly options upon request and left my home spotless without any chemical smells. My sinuses thank you! 🙌"
  },
  {
    name: "Thomas Wright",
    title: "Retired",
    rating: 5,
    review: "I've been using their monthly service for 2 years now. Consistency is key and they've never disappointed. Same team, same quality, every single time. That's hard to find these days."
  },
  {
    name: "Patience Eze",
    title: "Event Planner",
    rating: 5,
    review: "Booked them for post-party cleanup after my daughter's wedding. 150 guests, massive mess everywhere. By morning, you wouldn't know any party happened. Absolute miracle workers! 🎉"
  },
  {
    name: "Marcus Thompson",
    title: "Landlord",
    rating: 4,
    review: "Used them for turnover cleaning between tenants. They made a 5-year-old apartment look brand new. Got the security deposit disputes resolved instantly because the place was immaculate. Solid 9/10 service."
  },
  {
    name: "Olivia Martins",
    title: "Interior Designer",
    rating: 5,
    review: "I refer all my high-end clients to this team. They understand delicate surfaces, expensive rugs, and custom finishes. Professional, insured, and detail-oriented. My reputation depends on vendors like them!"
  },
  {
    name: "Emmanuel Bamidele",
    title: "Frequent Traveler",
    rating: 5,
    review: "I travel 3 weeks every month. Came back to a spotless apartment - fresh sheets, organized closets, even my plants were watered! It's like having a house fairy. Best decision I made this year! ✨"
  }
];