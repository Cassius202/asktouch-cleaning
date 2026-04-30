// lib/bookingUtils.ts
import { logAdditionalInfo, LogChatLeads } from "@/app/actions/chatLeads";
import { useChatStore } from "@/stores/chatStore";

interface JsonData {
  user_name: string;
  user_email: string;
  location: string;
  booking_intent: 'cleaning' | 'fumigation' | 'both' | 'unknown';
  phone_number: string;
}

// Module-level lock to prevent race conditions during rapid AI responses
let isLoggingInProgress = false;

/**
 * Checks if a value is a real user input or just an AI placeholder
 */
const isValid = (value: any): boolean => {
  if (!value) return false;
  const val = String(value).toLowerCase().trim();
  
  const placeholders = [
    'null', 
    'unknown', 
    'string | null', 
    'string|null', 
    'full name or null', 
    'phone or null', 
    'email or null'
  ];

  const isGenericPlaceholder = placeholders.includes(val) || val.includes('| null') || val.includes('or null');
  const isTechnicalType = val === 'string' || val === 'boolean' || val === 'number';

  return !isGenericPlaceholder && !isTechnicalType && val.length > 1;
};

export async function updateBookingData(jsonData: JsonData) {
  // Exit if data is missing or we are currently in the middle of a creation process
  if (!jsonData || isLoggingInProgress) return;

  const { updateBooking } = useChatStore.getState();

  // 1. Update the local store only with VALID data for the UI
  if (isValid(jsonData.user_name)) updateBooking({ name: jsonData.user_name });
  if (isValid(jsonData.user_email)) updateBooking({ email: jsonData.user_email });
  if (isValid(jsonData.location)) updateBooking({ location: jsonData.location });
  if (isValid(jsonData.phone_number)) updateBooking({ phone: jsonData.phone_number });

  // Handle service type
  const hasValidService = jsonData.booking_intent && jsonData.booking_intent !== 'unknown';
  if (hasValidService) {
    updateBooking({ service: jsonData.booking_intent });
  }

  // 2. Lead Validation for Spreadsheet
  const hasValidName = isValid(jsonData.user_name);
  const hasValidContact = isValid(jsonData.user_email) || isValid(jsonData.phone_number);

  // Proceed only if we have Name + Contact + Service
  if (hasValidName && hasValidContact && hasValidService) {
    
    // Retrieve the rowId and handle cases where it might be stringified 'null'
    const storedRowId = sessionStorage.getItem('chat-leads-success');
    const isValidRowId = storedRowId && storedRowId !== 'null' && storedRowId !== 'undefined';

    // Prepare sanitized data
    const payload = {
      name: jsonData.user_name,
      email: isValid(jsonData.user_email) ? jsonData.user_email : 'not given',
      phone: isValid(jsonData.phone_number) ? jsonData.phone_number : 'not given',
      location: isValid(jsonData.location) ? jsonData.location : 'not specified yet',
      service: jsonData.booking_intent,
    };

    // --- CASE A: UPDATE EXISTING ROW ---
    if (isValidRowId) {
      console.log('Syncing update to row:', storedRowId);
      const infoResult = await logAdditionalInfo({
        rowId: storedRowId,
        ...payload
      });

      if (!infoResult.success) console.error('Spreadsheet Update Error:', infoResult.message);
      return;
    }

    // --- CASE B: CREATE NEW ROW ---
    try {
      isLoggingInProgress = true; // Set lock
      console.log('No valid RowID found. Logging new lead...');
      
      const result = await LogChatLeads(payload);

      if (result.success && result.rowId) {
        console.log('Lead creation successful. RowID:', result.rowId);
        sessionStorage.setItem('chat-leads-success', String(result.rowId));
      } else {
        console.error('Lead creation failed:', result.message);
      }
    } catch (error) {
      console.error('Background sync error:', error);
    } finally {
      isLoggingInProgress = false; // Release lock
    }
  }
}