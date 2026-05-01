// emails/ThankYouEmail.tsx
import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Img,
} from 'react-email';

interface ThankYouEmailProps {
  name: string;
  service: string;
}

const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/ask-touch-email-logo.png`;

export function ThankYouEmail({ name, service }: ThankYouEmailProps) {
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
              Thank You, {name}!
            </Heading>
            
            <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '15px' }}>
              Thank you for choosing Asktouch for your {service} service. We hope you&apos;re satisfied with the results!
            </Text>
            
            <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '15px' }}>
              It was a pleasure serving you. If you need any follow-up services or have any questions, don&apos;t hesitate to reach out.
            </Text>
            
            <Text style={{ fontSize: '16px', color: '#555', lineHeight: '1.5', marginBottom: '15px' }}>
              We look forward to working with you again in the future!
            </Text>
            
            <Text style={{ fontSize: '14px', color: '#888', marginTop: '30px' }}>
              Best regards,
              <br />
              The Asktouch Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ThankYouEmail;