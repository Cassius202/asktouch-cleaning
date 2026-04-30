import { EmailData } from "@/app/actions/handleContactUpload";

export function EmailTemplate({ data }: { data: EmailData }) {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#059669',
        padding: '24px 32px',
        color: 'white'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif'
        }}>
          🧹 New Booking Request
        </h1>
        <p style={{ 
          margin: '8px 0 0 0', 
          opacity: 0.9, 
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif'
        }}>
          A potential client needs your service
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>
        {/* Client Details Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            color: '#1f2937',
            fontFamily: 'Arial, sans-serif',
            borderBottom: '2px solid #059669',
            paddingBottom: '8px',
            display: 'inline-block'
          }}>
            📋 Client Details
          </h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 0', fontWeight: 'bold', color: '#4b5563', width: '100px' }}>Name:</td>
                <td style={{ padding: '12px 0', color: '#1f2937' }}>{data.name}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 0', fontWeight: 'bold', color: '#4b5563' }}>Email:</td>
                <td style={{ padding: '12px 0', color: '#1f2937' }}>
                  <a href={`mailto:${data.email}`} style={{ color: '#059669', textDecoration: 'none' }}>
                    {data.email}
                  </a>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 0', fontWeight: 'bold', color: '#4b5563' }}>Phone:</td>
                <td style={{ padding: '12px 0', color: '#1f2937' }}>{data.phone}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 0', fontWeight: 'bold', color: '#4b5563' }}>Location:</td>
                <td style={{ padding: '12px 0', color: '#1f2937' }}>{data.location}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Message Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '0 0 16px 0',
            color: '#1f2937',
            fontFamily: 'Arial, sans-serif'
          }}>
            💬 Client&apos;s Message
          </h2>
          <p style={{
            margin: 0,
            color: '#4b5563',
            lineHeight: '1.6',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9fafb',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '3px solid #059669'
          }}>
            {data.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a
            href={`tel:${data.phone}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#059669',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              marginRight: '12px',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            📞 Call Now
          </a>
          <a
            href={`mailto:${data.email}`}
            style={{
              display: 'inline-block',
              backgroundColor: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            ✉️ Reply via Email
          </a>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '32px',
          paddingTop: '24px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
          fontSize: '12px',
          color: '#9ca3af',
          fontFamily: 'Arial, sans-serif'
        }}>
          <p style={{ margin: 0 }}>
            This booking request was sent from your website contact form.
          </p>
          <p style={{ margin: '8px 0 0 0' }}>
            Respond promptly to secure this client.
          </p>
        </div>
      </div>
    </div>
  );
}