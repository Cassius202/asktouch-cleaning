// emails/ReviewRequestEmail.tsx
import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Img,
  Link,
} from 'react-email';

interface ReviewRequestEmailProps {
  name: string;
  service: string;
}

const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/ask-touch-email-logo.png`;
const reviewLink = `${process.env.NEXT_PUBLIC_APP_URL}/review-form`;

export function ReviewRequestEmail({ name, service }: ReviewRequestEmailProps) {
  return (
    <Html>
      <Body style={{ margin: '0', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#ffffff' }}>
          {/* Logo Section */}
          <Section style={{ textAlign: 'center', padding: '20px 0' }}>
            <Img 
              src={logoUrl} 
              alt="Asktouch Logo" 
              width="120" 
              height="auto"
              style={{ margin: '0 auto' }}
            />
          </Section>

          {/* Content */}
          <Section style={{ padding: '0 20px 20px 20px' }}>
            <Heading style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>
              Share Your Experience, {name}!
            </Heading>
            
            <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '15px' }}>
              We hope you enjoyed your {service} service with Asktouch!
            </Text>
            
            <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '20px' }}>
              We&apos;d love to hear about your experience. Could you take a moment to leave us a review?
            </Text>
            
            <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Link 
                href={reviewLink}
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Leave a Review
              </Link>
            </Section>
            
            <Text style={{ fontSize: '14px', color: '#888', marginTop: '20px' }}>
              Thank you for your support!
              <br />
              Asktouch Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ReviewRequestEmail;