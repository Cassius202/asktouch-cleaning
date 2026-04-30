import ContactHome from "./_components/ContactHome"
import { Location } from "./_components/Location"
// app/contact/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | AskTouch',
  description: 'Get in touch with AskTouch for cleaning and pest control services. Free quotes, 24/7 support, and emergency services available.',
  openGraph: {
    title: 'Contact AskTouch | Get a Free Quote',
    description: 'Reach out to our team for professional cleaning and pest control services. Response within 24 hours.',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`,
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
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`],
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

//