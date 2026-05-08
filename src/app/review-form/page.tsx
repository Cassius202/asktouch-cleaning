import { Metadata } from 'next'
import ReviewFormClient from './ReviewFormClient'

export const metadata: Metadata = {
  metadataBase: new URL('http://asktouchcleaning.name.ng'),
  title: 'Share Your Experience | AskTouch',
  description: 'Help us improve by sharing your honest feedback. Your review helps us serve you better.',
  openGraph: {
    title: 'Share Your AskTouch Experience',
    description: 'Tell us about your cleaning or pest control service. Your feedback matters!',
    url: '/review-form',
    images: [
      {
        url: '/images/review-share-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Share Your AskTouch Review',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share Your AskTouch Experience',
    description: 'Your feedback helps us improve. Share your honest review today.',
    images: ['/images/review-share-image.jpg'],
  },
}

export default function ReviewFormPage() {
  return (
    <div>
      <ReviewFormClient />
    </div>
  )
}