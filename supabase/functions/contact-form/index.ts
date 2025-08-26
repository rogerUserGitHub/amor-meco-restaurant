import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read?: boolean;
  ip_address?: string;
  user_agent?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body
    const { name, email, phone, subject, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: 'Missing required fields',
          required: ['name', 'email', 'message'],
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get client information
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');

    // Extract the first IP address from x-forwarded-for (client IP)
    let ipAddress = 'unknown';
    if (forwardedFor) {
      // x-forwarded-for can contain multiple IPs: "client, proxy1, proxy2"
      ipAddress = forwardedFor.split(',')[0].trim();
    } else if (realIp) {
      ipAddress = realIp;
    }

    // Validate IP address format (basic check)
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ipAddress)) {
      ipAddress = 'unknown';
    }

    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Sanitize and prepare data
    const contactData: ContactFormData = {
      name: name.trim().substring(0, 255),
      email: email.trim().toLowerCase().substring(0, 255),
      phone: phone ? phone.trim().substring(0, 255) : null,
      subject: subject ? subject.trim().substring(0, 255) : null,
      message: message.trim().substring(0, 10000),
      read: false,
      ip_address: ipAddress,
      user_agent: userAgent,
    };

    // Insert into database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([contactData])
      .select();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save contact form submission' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Send notification email (optional)
    await sendNotificationEmail(contactData);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        id: data[0].id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function sendNotificationEmail(contactData: ContactFormData) {
  try {
    // You can implement email sending here using a service like SendGrid, Resend, etc.
    // For now, we'll just log the data
    console.log('Notification email would be sent for:', {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject || 'No subject',
      timestamp: new Date().toISOString(),
      ip_address: contactData.ip_address,
    });
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }
}
