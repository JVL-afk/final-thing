import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        await handleSuccessfulPayment(session)
        break

      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancellation(deletedSubscription)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        await handleFailedPayment(failedInvoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    // Update user subscription status in database
    const customerId = session.customer as string
    const subscriptionId = session.subscription as string
    const plan = session.metadata?.plan
    const billingCycle = session.metadata?.billing_cycle

    // TODO: Update user in database
    console.log('Payment successful:', {
      customerId,
      subscriptionId,
      plan,
      billingCycle,
    })

    // Send welcome email
    // TODO: Implement email sending
  } catch (error) {
    console.error('Error handling successful payment:', error)
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    // Update subscription details in database
    console.log('Subscription updated:', subscription.id)
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  try {
    // Update user subscription status to cancelled
    console.log('Subscription cancelled:', subscription.id)
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  try {
    // Send payment failed email and update user status
    console.log('Payment failed for invoice:', invoice.id)
  } catch (error) {
    console.error('Error handling failed payment:', error)
  }
}
