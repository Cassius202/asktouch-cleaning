import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
  Img,
} from 'react-email';
import { BookingFormData } from "@/constants/types";
import { info } from "@/constants/data";

interface BookingConfirmationEmailProps {
  data: BookingFormData;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
    ? `https://${process.env.NEXT_PUBLIC_APP_URL.replace(/^https?:\/\//, '')}` 
    : "http://localhost:3000";

export function BookingConfirmationEmail({ data }: BookingConfirmationEmailProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/ask-touch-email-logo.png`}
              width="100"
              alt={info.name}
            />
          </Section>

          <Section style={contentSection}>
            <Heading style={h1}>Booking Received</Heading>
            <Text style={text}>
              Hi {data.name.split(' ')[0]}, thanks for reaching out. We&apos;ve received your request for <strong>{data.service}</strong> and our team will get back to you shortly to confirm the details.
            </Text>

            <Hr style={hr} />

            <Heading style={h2}>Booking Details</Heading>
            <div style={detailsGrid}>
              <Text style={detailItem}><strong>Service:</strong> {data.service}</Text>
              <Text style={detailItem}><strong>Location:</strong> {data.location}, {data.state}</Text>
              <Text style={detailItem}><strong>Phone:</strong> {data.phone}</Text>
            </div>

            <Hr style={hr} />

            <Heading style={h2}>{`What's Next?`}</Heading>
            <Text style={text}>
              {`We usually respond within 24 hours. We'll give you a quick call or email to discuss pricing and schedule a date that works for you.`}
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Need help immediately? Call us at <Link href={`tel:${info.phone}`} style={link}>{info.phone}</Link>
            </Text>
            <Text style={footerSubtext}>
              © {currentYear} {info.name}. This is an automated notification.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// --- Simplified Styles ---

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const header = {
  padding: '20px 0',
};

const contentSection = {
  padding: '0 20px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '16px 0',
};

const h2 = {
  color: '#1a1a1a',
  fontSize: '16px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '24px 0 12px',
};

const text = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '24px',
};

const detailsGrid = {
  padding: '4px 0',
};

const detailItem = {
  ...text,
  margin: '4px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
};

const link = {
  color: '#059669',
  textDecoration: 'underline',
};

const footer = {
  textAlign: 'center' as const,
  padding: '32px 20px',
};

const footerText = {
  color: '#666',
  fontSize: '14px',
  margin: '0 0 10px',
};

const footerSubtext = {
  color: '#999',
  fontSize: '12px',
  margin: '0',
};