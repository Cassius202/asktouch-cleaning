// app/booking/page.tsx
import { Metadata } from 'next'
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book Your Service | AskTouch',
  description: 'Schedule professional cleaning and pest control services online. Free quotes, instant confirmation, and same-day availability.',
  openGraph: {
    title: 'Book AskTouch Services | Professional Cleaning',
    description: 'Book residential or office cleaning, pest control, and fumigation services. Get a free quote today.',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/booking`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`,
        width: 1200,
        height: 630,
        alt: 'Book AskTouch Cleaning Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book AskTouch Services | Professional Cleaning',
    description: 'Schedule your cleaning or pest control service online. Free quotes and instant booking.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`],
  },
}

export default function BookNowPage() {
  return <BookingClient />
}