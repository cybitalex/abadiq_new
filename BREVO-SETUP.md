# Brevo Email Integration Guide

This document provides instructions for setting up and troubleshooting the Brevo email integration for the ABADIQ website.

## Overview

The contact form on the ABADIQ website uses Brevo (formerly SendinBlue) to send emails. The implementation has been improved to:

1. Send emails securely through the server-side API instead of directly from the frontend
2. Provide better error handling and user feedback
3. Include more detailed information in the email

## Setup Instructions

### 1. Get Your Brevo API Key

1. Log in to your Brevo account at [https://app.brevo.com/](https://app.brevo.com/)
2. Navigate to Settings → API Keys & Tokens
3. Create a new API key or copy your existing one

### 2. Update Environment Variables

Update your `.env` file with your Brevo API key in **both** of these variables:

```
# Frontend API key (used for old implementation)
REACT_APP_BREVO_API_KEY=your-brevo-api-key

# Server-side API key (used for new implementation)
BREVO_API_KEY=your-brevo-api-key
```

### 3. Verify Sender Domain

Ensure your sender domain is verified in Brevo:

1. In your Brevo account, go to Settings → Senders & IP
2. Make sure your domain is properly configured with SPF and DKIM records
3. If using "noreply@abadiq.com" as the sender, ensure the domain is verified

## How It Works

The new implementation:

1. User submits the contact form on the frontend
2. Form data is sent to the `/api/brevo-contact` endpoint on your Express server
3. Server validates the data and sends the email using the Brevo API
4. Response is returned to the frontend with success/error information
5. User sees appropriate feedback (success message or error)

## Troubleshooting

If emails are not being sent, check the following:

### 1. API Key Issues

- Verify that `BREVO_API_KEY` is correctly set in your `.env` file
- Check that the API key is valid and has send permissions
- Look at server logs for any API key related errors

### 2. Rate Limit Issues

- Brevo has sending limits based on your plan
- Check your Brevo dashboard for any rate limit warnings

### 3. Server Errors

Check server logs for any errors:

```bash
docker compose logs api
```

### 4. Frontend Errors

Check your browser console for any errors when submitting the form.

### 5. Email Content Issues

If emails are rejected due to content:

- Ensure there are no spam trigger words in the message
- Check that HTML content is properly formatted

## Testing the Integration

To test if your Brevo integration is working:

1. Open the ABADIQ website
2. Fill out and submit the contact form
3. Check if you receive a success message
4. Check the server logs for success/error messages
5. Verify that the email arrives at the destination address

## Support

If you encounter issues with the Brevo integration, check:

- [Brevo API Documentation](https://developers.brevo.com/docs)
- Server logs for error details
- Contact your developer for assistance
