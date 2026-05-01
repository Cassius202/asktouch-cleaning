export type Review = {
    name: string;
    title?: string;
    review: string;
    rating: number;
}

export interface BookingData {
  user_name: string | null;
  user_email: string | null;
  gender: 'Ma' | 'Sir' | null;
  phone_number: string | null;
  booking_intent: 'cleaning' | 'fumigation' | 'both' | 'unknown';
  location: string | null;
  location_type: 'Ibadan' | 'Lagos' | 'Outside_IB_LAGOS' | null;
  service_type: 'one-time' | 'recurring' | 'emergency' | null;
  property_type: 'residential' | 'commercial' | 'office' | null;
  is_lead_ready: boolean;
  quote_sent: boolean;
  booking_confirmed: boolean;
}

export interface BookingFormData {
    name: string;    
    email: string;
    state: string;
    phone: string;
    location: string;
    service: string;
    hearAbout?: string;
}

export type GoogleSheet = "Contact Forms" | "Bookings" | "Newsletter" | "Chat Leads";

export interface ChatLeadsData {
    name: string;
    email: string;
    phone: string | null;
    location: string;
    service: string;
}

export interface NewsletterData {
    email: string;
}

export interface ClientFormData {
    name: string;
    email: string;
    phone: string;
    location: string;
    service: string;
    note: string | null;
};