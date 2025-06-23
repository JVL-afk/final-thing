import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { to, subject, type, data } = await request.json()

    let htmlContent = ''
    let textContent = ''

    // Generate email content based on type
    switch (type) {
      case 'welcome':
        htmlContent = generateWelcomeEmail(data)
        textContent = `Welcome to AFFILIFY! Your account has been created successfully.`
        break

      case 'payment_success':
        htmlContent = generatePaymentSuccessEmail(data)
        textContent = `Payment successful! Your ${data.plan} subscription is now active.`
        break

      case 'payment_failed':
        htmlContent = generatePaymentFailedEmail(data)
        textContent = `Payment failed. Please update your payment method to continue using AFFILIFY.`
        break

      case 'creator_outreach':
        htmlContent = generateCreatorOutreachEmail(data)
        textContent = data.message
        break

      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

function generateWelcomeEmail(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to AFFILIFY</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to AFFILIFY!</h1>
          <p>Your AI-powered affiliate marketing journey starts now</p>
        </div>
        <div class="content">
          <h2>Hi ${data.name || 'there'}!</h2>
          <p>Thank you for joining AFFILIFY. You're now part of a community of successful affiliate marketers who are building profitable online businesses with AI.</p>
          
          <h3>What's Next?</h3>
          <ul>
            <li>Create your first affiliate website in under 5 minutes</li>
            <li>Customize your design and add your affiliate links</li>
            <li>Deploy to your custom domain</li>
            <li>Start earning commissions!</li>
          </ul>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Get Started</a>
          
          <p>If you have any questions, our support team is here to help at support@affilify.eu</p>
          
          <p>Best regards,<br>The AFFILIFY Team</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generatePaymentSuccessEmail(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Successful - AFFILIFY</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Successful!</h1>
        </div>
        <div class="content">
          <div class="success">
            <strong>✓ Your ${data.plan} subscription is now active!</strong>
          </div>
          
          <h2>Thank you for your payment</h2>
          <p>Your subscription has been activated and you now have access to all ${data.plan} plan features.</p>
          
          <p>You can manage your subscription and billing details in your account dashboard.</p>
          
          <p>Happy affiliate marketing!</p>
          <p>The AFFILIFY Team</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generatePaymentFailedEmail(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Payment Failed - AFFILIFY</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .warning { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .button { display: inline-block; background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Failed</h1>
        </div>
        <div class="content">
          <div class="warning">
            <strong>⚠ We couldn't process your payment</strong>
          </div>
          
          <h2>Action Required</h2>
          <p>Your recent payment for the ${data.plan} plan was unsuccessful. To continue using AFFILIFY without interruption, please update your payment method.</p>
          
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing" class="button">Update Payment Method</a>
          
          <p>If you continue to experience issues, please contact our support team at support@affilify.eu</p>
          
          <p>The AFFILIFY Team</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateCreatorOutreachEmail(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${data.subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AFFILIFY</h1>
          <p>AI-Powered Affiliate Website Generator</p>
        </div>
        <div class="content">
          ${data.message}
          
          <div class="signature">
            <p>Best regards,<br>
            ${data.senderName}<br>
            AFFILIFY Team<br>
            <a href="https://affilify.eu">affilify.eu</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
