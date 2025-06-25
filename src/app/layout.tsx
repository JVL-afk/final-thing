import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AFFILIFY - AI-Powered Affiliate Marketing Platform',
  description: 'Create high-converting affiliate websites with AI. Track performance, optimize conversions, and maximize your affiliate marketing revenue.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag( ){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
        
        {/* Facebook Pixel for Conversion Tracking */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js' );
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Real-time Analytics Tracker */}
        <Script id="affilify-tracker" strategy="afterInteractive">
          {`
            // AFFILIFY Real-time Tracking
            window.AFFILIFY = window.AFFILIFY || {};
            window.AFFILIFY.trackClick = function(websiteId, productName, affiliateUrl) {
              fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-user-email': localStorage.getItem('userEmail') || 'demo@user.com'
                },
                body: JSON.stringify({
                  type: 'click',
                  websiteId: websiteId,
                  productName: productName,
                  affiliateUrl: affiliateUrl,
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent,
                  referrer: document.referrer
                })
              }).then(response => response.json())
                .then(data => console.log('✅ Click tracked:', data))
                .catch(error => console.error('❌ Tracking failed:', error));
              
              // Also track in GA4
              if (typeof gtag !== 'undefined') {
                gtag('event', 'affiliate_click', {
                  event_category: 'engagement',
                  event_label: websiteId + '-' + productName,
                  value: 1
                });
              }
            };
            
            window.AFFILIFY.trackConversion = function(websiteId, productName, value) {
              fetch('/api/analytics/track', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-user-email': localStorage.getItem('userEmail') || 'demo@user.com'
                },
                body: JSON.stringify({
                  type: 'conversion',
                  websiteId: websiteId,
                  productName: productName,
                  value: value,
                  currency: 'USD',
                  timestamp: new Date().toISOString()
                })
              }).then(response => response.json())
                .then(data => console.log('💰 Conversion tracked:', data))
                .catch(error => console.error('❌ Conversion tracking failed:', error));
              
              // Track in GA4 Enhanced Ecommerce
              if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase', {
                  transaction_id: websiteId + '-' + Date.now(),
                  value: value,
                  currency: 'USD',
                  items: [{
                    item_id: productName.replace(/\\s+/g, '-').toLowerCase(),
                    item_name: productName,
                    category: 'affiliate_product',
                    quantity: 1,
                    price: value
                  }]
                });
              }
              
              // Track Facebook Conversion
              if (typeof fbq !== 'undefined') {
                fbq('track', 'Purchase', {
                  value: value,
                  currency: 'USD'
                });
              }
            };
            
            console.log('🚀 AFFILIFY Analytics Ready!');
          `}
        </Script>
      </body>
    </html>
  )
}

