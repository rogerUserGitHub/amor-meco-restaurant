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
  phone?: string | null;
  subject?: string | null;
  message: string;
  read?: boolean;
  ip_address?: string;
  user_agent?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { name, email, phone, subject, message } = await req.json();

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');

    let ipAddress = 'unknown';
    if (forwardedFor) {
      ipAddress = forwardedFor.split(',')[0].trim();
    } else if (realIp) {
      ipAddress = realIp;
    }

    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(ipAddress)) {
      ipAddress = 'unknown';
    }

    const userAgent = req.headers.get('user-agent') || 'unknown';

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

    // ✅ Send real email via Resend
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
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not set');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <no-reply@amormeco.pt>',
        to: 'info@amormeco.pt',
        subject: contactData.subject || 'New Contact Form Submission',
        reply_to: contactData.email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <small>IP: ${contactData.ip_address}, User-Agent: ${
          contactData.user_agent
        }</small>
        `,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Failed to send email:', text);
    } else {
      console.log('Notification email sent successfully');
    }
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}
