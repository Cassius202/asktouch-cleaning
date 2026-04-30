// templates/AdminBookingNotificationEmail.tsx

import {
  Html,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Hr,
  Row,
  Column,
} from 'react-email';
import { BookingFormData } from "@/constants/types";
import { info } from "@/constants/data";

interface AdminBookingNotificationEmailProps {
  data: BookingFormData;
}

export function AdminBookingNotificationEmail({ data }: AdminBookingNotificationEmailProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          {/* Header with emerald accent */}
          <Section style={headerSection}>
            <div style={emeraldAccentBar} />
            <Heading style={h1}>
              🔔 New Booking Request
            </Heading>
            <Text style={subtitle}>
              A new service request has been submitted
            </Text>
          </Section>

          {/* Urgency Banner */}
          <Section style={urgentBanner}>
            <Text style={urgentText}>
              ⚡ Action Required: New booking needs your attention
            </Text>
          </Section>

          {/* Customer Details Section */}
          <Section style={section}>
            <Heading style={sectionHeading}>
              <span style={emeraldDot}>●</span> Customer Information
            </Heading>
            <Container style={detailsContainer}>
              <Row style={detailRow}>
                <Column style={detailLabel}>Name:</Column>
                <Column style={detailValue}>{data.name}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>
                  <Link href={`mailto:${data.email}`} style={emeraldLink}>
                    {data.email}
                  </Link>
                </Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Phone:</Column>
                <Column style={detailValue}>
                  <Link href={`tel:${data.phone}`} style={emeraldLink}>
                    {data.phone}
                  </Link>
                </Column>
              </Row>
            </Container>
          </Section>

          {/* Booking Details Section */}
          <Section style={section}>
            <Heading style={sectionHeading}>
              <span style={emeraldDot}>●</span> Booking Details
            </Heading>
            <Container style={detailsContainer}>
              <Row style={detailRow}>
                <Column style={detailLabel}>Service Required:</Column>
                <Column style={detailValue}>
                  <span style={emeraldBadge}>{data.service}</span>
                </Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>State:</Column>
                <Column style={detailValue}>{data.state}</Column>
              </Row>
              {data.location && (
                <Row style={detailRow}>
                  <Column style={detailLabel}>Full Address:</Column>
                  <Column style={detailValue}>{data.location}</Column>
                </Row>
              )}
              <Row style={detailRow}>
                <Column style={detailLabel}>Submitted:</Column>
                <Column style={detailValue}>
                  {new Date().toLocaleString('en-NG', {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                    timeZone: 'Africa/Lagos'
                  })}
                </Column>
              </Row>
            </Container>
          </Section>

          {/* Action Buttons Section */}
          <Section style={actionSection}>
            <Heading style={actionHeading}>Quick Actions</Heading>
            <Row style={actionRow}>
              <Column style={actionColumn}>
                <a href={`tel:${data.phone}`} style={callButton}>
                  📞 Call Customer
                </a>
              </Column>
              <Column style={actionColumn}>
                <a href={`mailto:${data.email}`} style={emailButton}>
                  ✉️ Send Email
                </a>
              </Column>
            </Row>
            <Row style={actionRow}>
              <Column style={actionColumn}>
                <a href={process.env.GOOGLE_SHEET_URL} style={sheetButton}>
                  📊 View Spreadsheet
                </a>
              </Column>
            </Row>
          </Section>

          {/* Customer Message Template */}
          <Section style={messageTemplate}>
            <Heading style={sectionHeading}>
              <span style={emeraldDot}>●</span> Suggested Response Template
            </Heading>
            <Container style={templateContainer}>
              <Text style={templateText}>
                <strong>Subject:</strong> Your ${data.service} Request - ${info.name}
              </Text>
              <Text style={templateText}>
                Hello ${data.name},
              </Text>
              <Text style={templateText}>
                Thank you for choosing ${info.name} for your ${data.service} service needs.
              </Text>
              <Text style={templateText}>
                We have received your request for service at ${data.location ? data.location + ', ' : ''}${data.state}. 
                Our team will review your requirements and get back to you within 24 hours to discuss:
              </Text>
              <Text style={templateText}>
                • Service availability and scheduling{'\\n'}
                • Detailed cost estimation{'\\n'}
                • Specific requirements for your property
              </Text>
              <Text style={templateText}>
                In the meantime, feel free to call us at ${info.phone} if you have any immediate questions.
              </Text>
              <Text style={templateText}>
                Best regards,{'\\n'}
                The ${info.name} Team
              </Text>
            </Container>
          </Section>

          {/* System Information */}
          <Section style={systemInfo}>
            <Hr style={hr} />
            <Text style={systemText}>
              🖥️ System Info: This is an automated notification from your booking system
            </Text>
            <Text style={systemTextSmall}>
              Sent via Resend • {new Date().toLocaleString('en-NG')}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              © {currentYear} ${info.name}. All rights reserved.
            </Text>
            <Text style={footerTextSmall}>
              This is an automated notification for business owners. Please do not reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles (same emerald theme)
const main = {
  backgroundColor: '#f4f7f6',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6e8eb',
  borderRadius: '12px',
  margin: '0 auto',
  maxWidth: '600px',
  padding: '0',
  overflow: 'hidden',
};

const headerSection = {
  backgroundColor: '#ffffff',
  padding: '40px 40px 20px 40px',
  textAlign: 'center' as const,
};

const emeraldAccentBar = {
  backgroundColor: '#059669',
  height: '4px',
  width: '80px',
  margin: '0 auto 20px auto',
  borderRadius: '2px',
};

const h1 = {
  color: '#111827',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 12px 0',
  letterSpacing: '-0.5px',
};

const subtitle = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0',
};

const urgentBanner = {
  backgroundColor: '#fef3c7',
  padding: '12px 20px',
  textAlign: 'center' as const,
  borderLeft: `4px solid #f59e0b`,
};

const urgentText = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const section = {
  padding: '0 40px',
  marginBottom: '32px',
};

const sectionHeading = {
  color: '#111827',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const emeraldDot = {
  color: '#059669',
  fontSize: '20px',
  marginRight: '8px',
};

const detailsContainer = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '20px',
  border: '1px solid #e5e7eb',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  color: '#4b5563',
  fontSize: '14px',
  fontWeight: '500',
  width: '120px',
  paddingRight: '16px',
};

const detailValue = {
  color: '#111827',
  fontSize: '14px',
  fontWeight: '400',
};

const emeraldBadge = {
  backgroundColor: '#d1fae5',
  color: '#065f46',
  padding: '4px 12px',
  borderRadius: '12px',
  fontSize: '13px',
  fontWeight: '500',
  display: 'inline-block',
};

const emeraldLink = {
  color: '#059669',
  textDecoration: 'none',
  fontWeight: '500',
};

const actionSection = {
  backgroundColor: '#f0fdf4',
  padding: '24px 40px',
  marginBottom: '32px',
  borderTop: `1px solid #d1fae5`,
  borderBottom: `1px solid #d1fae5`,
};

const actionHeading = {
  color: '#065f46',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  textAlign: 'center' as const,
};

const actionRow = {
  marginBottom: '12px',
};

const actionColumn = {
  padding: '0 8px',
  textAlign: 'center' as const,
};

const callButton = {
  backgroundColor: '#059669',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  display: 'inline-block',
  width: '100%',
  textAlign: 'center' as const,
};

const emailButton = {
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  display: 'inline-block',
  width: '100%',
  textAlign: 'center' as const,
};

const sheetButton = {
  backgroundColor: '#6b7280',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
  display: 'inline-block',
  width: '100%',
  textAlign: 'center' as const,
};

const messageTemplate = {
  padding: '0 40px',
  marginBottom: '32px',
};

const templateContainer = {
  backgroundColor: '#fefce8',
  borderRadius: '8px',
  padding: '20px',
  border: '1px solid #fef08a',
};

const templateText = {
  color: '#854d0e',
  fontSize: '13px',
  margin: '0 0 10px 0',
  lineHeight: '1.6',
};

const systemInfo = {
  padding: '0 40px',
  marginBottom: '24px',
};

const systemText = {
  color: '#6b7280',
  fontSize: '11px',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const systemTextSmall = {
  color: '#9ca3af',
  fontSize: '10px',
  margin: '4px 0',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '0 0 20px 0',
};

const footer = {
  backgroundColor: '#f9fafb',
  padding: '24px 40px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '0 0 8px 0',
};

const footerTextSmall = {
  color: '#9ca3af',
  fontSize: '11px',
  margin: '0',
};