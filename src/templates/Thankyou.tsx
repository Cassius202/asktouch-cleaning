// emails/ThankYouEmail.tsx
import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
} from 'react-email';
import { EmailData } from '@/app/actions/handleContactUpload';

interface ThankYouEmailProps {
  data: EmailData;
}

export function ThankYouEmail({ data }: ThankYouEmailProps) {
  const firstName = data.name.split(' ')[0];

  return (
    <Html>
      <Body style={bodyStyles}>
        <Container style={containerStyles}>
          {/* Header */}
          <Section style={headerStyles}>
            <Heading style={headerTitleStyles}>🧹 Thank You, {firstName}!</Heading>
          </Section>

          {/* Content */}
          <Section style={contentStyles}>
            <Text style={introTextStyles}>
              {`We've received your message and will get back to you within`} <strong>in some hours</strong>.
            </Text>

            {/* What happens next */}
            <Section style={cardStyles}>
              <Heading as="h2" style={sectionTitleStyles}>
                What happens next?
              </Heading>
              <Section style={stepStyles}>
                <Text style={stepTextStyles}>
                  <span style={stepNumberStyles}>1️⃣</span> Our team will review your request
                </Text>
                <Text style={stepTextStyles}>
                  <span style={stepNumberStyles}>2️⃣</span> {`We'll call or email you to confirm details`}
                </Text>
                <Text style={stepTextStyles}>
                  <span style={stepNumberStyles}>3️⃣</span> {`We'll schedule your service at your preferred time`}
                </Text>
              </Section>
            </Section>

            {/* Your Request Summary */}
            <Section style={summaryBoxStyles}>
              <Text style={summaryTextStyles}>
                <strong>Your request:</strong> {data.message}
              </Text>
            </Section>

            {/* Call Button */}
            <Section style={buttonContainerStyles}>
              <Text style={callPromptStyles}>Need to speak with us immediately?</Text>
              <Link href="tel:+2349034027582" style={callButtonStyles}>
                📞 Call Us Now
              </Link>
            </Section>

            {/* Footer */}
            <Section style={footerStyles}>
              <Text style={footerTextStyles}>
                Ask Touch Cleaning & Fumigation — Your trusted partner for spotless, pest-free spaces
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const bodyStyles = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9fafb',
  padding: '20px',
  margin: 0,
};

const containerStyles = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #e5e7eb',
};

const headerStyles = {
  backgroundColor: '#059669',
  padding: '32px',
  textAlign: 'center' as const,
};

const headerTitleStyles = {
  color: 'white',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  margin: 0,
};

const contentStyles = {
  padding: '32px',
};

const introTextStyles = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#1f2937',
  marginBottom: '24px',
};

const cardStyles = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '24px',
  border: '1px solid #e5e7eb',
};

const sectionTitleStyles = {
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0 0 16px 0',
  color: '#1f2937',
};

const stepStyles = {
  marginBottom: '16px',
};

const stepTextStyles = {
  marginBottom: '12px',
  color: '#4b5563',
};

const stepNumberStyles = {
  fontSize: '20px',
  marginRight: '12px',
};

const summaryBoxStyles = {
  backgroundColor: '#f0fdf4',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '24px',
  borderLeft: '3px solid #059669',
};

const summaryTextStyles = {
  margin: 0,
  fontSize: '14px',
  color: '#4b5563',
};

const buttonContainerStyles = {
  textAlign: 'center' as const,
  marginTop: '24px',
};

const callPromptStyles = {
  fontSize: '14px',
  color: '#6b7280',
  marginBottom: '8px',
};

const callButtonStyles = {
  display: 'inline-block',
  backgroundColor: '#059669',
  color: 'white',
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: 'bold' as const,
  fontSize: '16px',
};

const footerStyles = {
  marginTop: '32px',
  paddingTop: '24px',
  textAlign: 'center' as const,
};

const footerTextStyles = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: 0,
};