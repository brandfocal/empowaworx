import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow unauthorized/self-signed SSL certificates when connecting to WordPress
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let wpUrl = (process.env.WP_API_URL || '').trim();
  const consumerKey = (process.env.GF_CONSUMER_KEY || '').trim();
  const consumerSecret = (process.env.GF_CONSUMER_SECRET || '').trim();

  if (!wpUrl) {
    return res.status(500).json({ message: 'Server configuration error: WP_API_URL is missing.' });
  }

  // Prepend protocol if missing
  if (!wpUrl.startsWith('http://') && !wpUrl.startsWith('https://')) {
    wpUrl = `https://${wpUrl}`;
  }

  try {
    const { formType, ...fieldData } = req.body;

    // Send fieldData directly as the options on the Gravity Forms side use 'and' instead of '&', matching the frontend.

    // Dynamically resolve form IDs depending on the submitted formType
    let formId = process.env.GF_FORM_ID_WEBSITE_ENQUIRY || '1';
    if (formType === 'client') {
      formId = process.env.GF_FORM_ID_CLIENT_ENQUIRY || '2';
    } else if (formType === 'partnership') {
      formId = process.env.GF_FORM_ID_PARTNERSHIP_ENQUIRY || '3';
    } else if (formType === 'talent') {
      formId = process.env.GF_FORM_ID_TALENT_APPLICATION || '4';
    } else if (formType === 'newsletter') {
      formId = process.env.GF_FORM_ID_NEWSLETTER || '5';
    }

    const targetUrl = `${wpUrl}/wp-json/gf/v2/forms/${formId}/submissions`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (consumerKey && consumerSecret) {
      // Basic Authentication over HTTPS: Authorization: Basic Base64(consumerKey:consumerSecret)
      const token = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
      headers['Authorization'] = `Basic ${token}`;
    }

    const gfResponse = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(fieldData),
    });

    const data = await gfResponse.json();

    if (gfResponse.ok && data.is_valid) {
      return res.status(200).json({ is_valid: true });
    } else {
      return res.status(gfResponse.status).json({
        message: data.message || 'Failed to submit form to Gravity Forms.',
        is_valid: false,
        details: data
      });
    }
  } catch (error) {
    console.error('Error proxying submission:', error);
    return res.status(500).json({ 
      message: 'Internal server error.',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
