// stores/chatStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookingInfo {
  name: string | null;
  email: string | null;
  location: string | null;
  service: 'cleaning' | 'fumigation' | 'both' | 'unknown';
  phone: string | null;
}

interface ChatStore {
  booking: BookingInfo;
  updateBooking: (data: Partial<BookingInfo>) => void;
  resetBooking: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      booking: {
        name: null,
        email: null,
        location: null,
        service: 'unknown',
        phone: null,
      },
      
      updateBooking: (data) => {
        set((state) => ({
          booking: { ...state.booking, ...data },
        }));
      },
      
      resetBooking: () => {
        set({
          booking: {
            name: null,
            email: null,
            location: null,
            service: 'unknown',
            phone: null,
          },
        });
      },
    }),
    {
      name: 'booking-storage',
    }
  )
);