'use server'

import { info } from '@/constants/data'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// const ImageUrl = process.env.NEXT_PUBLIC_APP_URL

const ImageUrl = process.env.NEXT_PUBLIC_APP_URL + "/images/ask-touch-email-logo.png"

export async function sendProfessionalMail(formData: {
  to: string
  subject: string
  body: string
}) {
  const { to, subject, body } = formData

  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif;">
      
      <!-- Header with logo -->
      <div style="padding: 32px 0 24px;">
        <img 
          src="${ImageUrl}"
          alt="Asktouch Cleaning"
          width="120"
          style="display: block;"
        />
      </div>

      <!-- Divider -->
      <div style="border-top: 1px solid #e5e7eb; margin-bottom: 32px;"></div>

      <!-- Body -->
      <div style="font-size: 15px; line-height: 1.7; color: #111827;">
        ${body}
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 20px;">
        <p style="font-size: 12px; color: #9ca3af; margin: 0;">
          Asktouch Cleaning Agency · Ibadan, Nigeria
        </p>
      </div>

    </div>
  `

  const { error } = await resend.emails.send({
    from: `Asktouch Cleaning <${info.contactEmail}>`,
    to,
    subject,
    html,
  })

  if (error) {
    console.error('Resend error:', error)
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Email sent successfully!' }
}