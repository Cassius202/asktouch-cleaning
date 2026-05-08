import { Metadata } from "next"
import Header from "./_components/Header"

export const metadata: Metadata = {
  title: 'Blog | AskTouch',
  description: 'AskTouch Blog',
  openGraph: {
    title: 'Blog | AskTouch',
    description: 'AskTouch Blog',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/blog`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog AskTouch Customer Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | AskTouch',
    description: 'AskTouch Blog',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/ask-touch-metaimage.jpg`],
  },
}
export default function BlogLayout({children}: {children: React.ReactNode}) {
  return <div className="">
    <Header />
    {children}
  </div>
}