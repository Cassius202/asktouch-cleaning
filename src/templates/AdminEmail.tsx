// emails/AdminEmail.tsx
import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
} from 'react-email';
import { EmailData } from '@/app/actions/handleContactUpload';

interface AdminEmailProps {
  data: EmailData;
}

export function AdminEmail({ data }: AdminEmailProps) {
  return (
    <Html>
      <Body style={bodyStyles}>
        <Container style={containerStyles}>
          {/* Header */}
          <Section style={headerStyles}>
            <Heading style={headerTitleStyles}>🧹 New Booking Request</Heading>
            <Text style={headerSubtitleStyles}>A potential client needs your service</Text>
          </Section>

          {/* Content */}
          <Section style={contentStyles}>
            {/* Client Details Section */}
            <Section style={cardStyles}>
              <Heading as="h2" style={sectionTitleStyles}>
                📋 Client Details
              </Heading>

              <table style={tableStyles}>
                <tbody>
                  <tr style={tableRowStyles}>
                    <td style={labelStyles}>Name:</td>
                    <td style={valueStyles}>{data.name}</td>
                  </tr>
                  <tr style={tableRowStyles}>
                    <td style={labelStyles}>Email:</td>
                    <td style={valueStyles}>
                      <Link href={`mailto:${data.email}`} style={linkStyles}>
                        {data.email}
                      </Link>
                    </td>
                  </tr>
                  <tr style={tableRowStyles}>
                    <td style={labelStyles}>Phone:</td>
                    <td style={valueStyles}>
                      <Link href={`tel:${data.phone}`} style={phoneLinkStyles}>
                        {data.phone}
                      </Link>
                    </td>
                  </tr>
                  <tr style={tableRowStyles}>
                    <td style={labelStyles}>Location:</td>
                    <td style={valueStyles}>{data.location}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Message Section */}
            <Section style={cardStyles}>
              <Heading as="h2" style={sectionTitleStyles}>
                💬 {`Client's `}Message
              </Heading>
              <Section style={messageBoxStyles}>
                <Text style={messageTextStyles}>{data.message}</Text>
              </Section>
            </Section>

            {/* Action Buttons */}
            <Section style={buttonContainerStyles}>
              <Link href={`tel:${data.phone}`} style={callButtonStyles}>
                📞 Call Now
              </Link>
              <Link href={`mailto:${data.email}`} style={emailButtonStyles}>
                ✉️ Reply via Email
              </Link>
            </Section>

            {/* Footer */}
            <Hr style={hrStyles} />
            <Section style={footerStyles}>
              <Text style={footerTextStyles}>
                This booking request was sent from your website contact form.
              </Text>
              <Text style={footerTextStyles}>
                Respond promptly to secure this client.
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
  padding: '24px 32px',
  textAlign: 'center' as const,
};

const headerTitleStyles = {
  color: 'white',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  margin: 0,
  lineHeight: '1.3',
};

const headerSubtitleStyles = {
  color: 'white',
  fontSize: '14px',
  opacity: 0.9,
  margin: '8px 0 0 0',
};

const contentStyles = {
  padding: '32px',
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
  borderBottom: '2px solid #059669',
  paddingBottom: '8px',
  display: 'inline-block',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const tableRowStyles = {
  borderBottom: '1px solid #f3f4f6',
};

const labelStyles = {
  padding: '12px 0',
  fontWeight: 'bold' as const,
  color: '#4b5563',
  width: '100px',
};

const valueStyles = {
  padding: '12px 0',
  color: '#1f2937',
};

const linkStyles = {
  color: '#059669',
  textDecoration: 'none',
};

const phoneLinkStyles = {
  color: '#1f2937',
  textDecoration: 'none',
};

const messageBoxStyles = {
  backgroundColor: '#f9fafb',
  padding: '16px',
  borderRadius: '8px',
  borderLeft: '3px solid #059669',
};

const messageTextStyles = {
  margin: 0,
  color: '#4b5563',
  lineHeight: '1.6',
};

const buttonContainerStyles = {
  textAlign: 'center' as const,
  marginTop: '32px',
};

const callButtonStyles = {
  display: 'inline-block',
  backgroundColor: '#059669',
  color: 'white',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '8px',
  fontWeight: 'bold' as const,
  fontSize: '16px',
  marginRight: '12px',
};

const emailButtonStyles = {
  display: 'inline-block',
  backgroundColor: '#3b82f6',
  color: 'white',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '8px',
  fontWeight: 'bold' as const,
  fontSize: '16px',
};

const hrStyles = {
  marginTop: '32px',
  marginBottom: '24px',
  borderColor: '#e5e7eb',
};

const footerStyles = {
  textAlign: 'center' as const,
};

const footerTextStyles = {
  fontSize: '12px',
  color: '#9ca3af',
  margin: '8px 0',
};