import { Metadata } from 'next'
import ContactHome from "./_components/ContactHome"
import { Location } from "./_components/Location"

// app/contact/page.tsx
export const metadata: Metadata = {
  // Using the domain directly to ensure it is statically analyzable
  metadataBase: new URL('http://asktouchcleaning.name.ng'),
  title: 'Contact Us | AskTouch',
  description: 'Get in touch with AskTouch for cleaning and pest control services. Free quotes, 24/7 support, and emergency services available.',
  openGraph: {
    title: 'Contact AskTouch | Get a Free Quote',
    description: 'Reach out to our team for professional cleaning and pest control services. Response within 24 hours.',
    url: '/contact', 
    images: [
      {
        url: '/ask-touch-metaimage.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact AskTouch Customer Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AskTouch | Get a Free Quote',
    description: 'Reach out for cleaning and pest control services. Quick response guaranteed.',
    images: ['/ask-touch-metaimage.jpg'],
  },
}

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-stone-950">
      <ContactHome />
      <Location />
    </div>
  )
}

export default ContactPage