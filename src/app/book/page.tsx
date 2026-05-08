import { Metadata } from 'next'
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  // Setting this allows you to use relative paths below
  metadataBase: new URL('http://asktouchcleaning.name.ng'),
  title: 'Book Your Service | AskTouch',
  description: 'Schedule professional cleaning and pest control services online. Free quotes, instant confirmation, and same-day availability.',
  openGraph: {
    title: 'Book AskTouch Services | Professional Cleaning',
    description: 'Book residential or office cleaning, pest control, and fumigation services. Get a free quote today.',
    url: '/booking', // Next.js prefixes this with metadataBase
    images: [
      {
        url: '/ask-touch-metaimage.jpg', // Next.js prefixes this too
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
    images: ['/ask-touch-metaimage.jpg'],
  },
}

export default function BookNowPage() {
  return <BookingClient />
}