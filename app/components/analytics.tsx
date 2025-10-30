'use client'

import { useEffect } from 'react'

interface AnalyticsProps {
  gtmId?: string
  fbPixelId?: string
  gtagId?: string
}

export function Analytics({ gtmId, fbPixelId, gtagId }: AnalyticsProps) {
  useEffect(() => {
    // Note: Analytics runs in all environments now for testing
    // Production-only check removed to allow testing in development

    // Check if already initialized to prevent double activation
    if ((window as any).fbq && (window as any).fbq._initialized) {
      return
    }

    // Google Tag Manager
    if (gtmId) {
      const gtmScript = document.createElement('script')
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `
      document.head.appendChild(gtmScript)

      // GTM noscript fallback
      const noscript = document.createElement('noscript')
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
      iframe.height = '0'
      iframe.width = '0'
      iframe.style.display = 'none'
      iframe.style.visibility = 'hidden'
      noscript.appendChild(iframe)
      document.body.insertBefore(noscript, document.body.firstChild)
    }

    // Facebook Pixel with CAPI integration
    if (fbPixelId) {
      const fbScript = document.createElement('script')
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s){
          if(f.fbq) return; n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
          n.queue=[]; t=b.createElement(e); t.async=!0;
          t.src=v; s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)
        }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${fbPixelId}');
        fbq('track','PageView');
        
        // Mark as initialized to prevent double activation
        if (window.fbq) {
          (window.fbq as any)._initialized = true;
        }
        
        // Also send to CAPI for better tracking accuracy
        fetch('/api/fb-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'PageView',
            customData: { source: 'client_pixel' }
          })
        }).catch(err => console.error('CAPI error:', err));
      `
      document.head.appendChild(fbScript)

      // FB Pixel noscript fallback
      const fbNoscript = document.createElement('noscript')
      const fbImg = document.createElement('img')
      fbImg.height = 1
      fbImg.width = 1
      fbImg.style.display = 'none'
      fbImg.src = `https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`
      fbNoscript.appendChild(fbImg)
      document.body.appendChild(fbNoscript)
    }

    // Google Ads / Google Analytics (gtag)
    if (gtagId) {
      const gtagScript1 = document.createElement('script')
      gtagScript1.async = true
      gtagScript1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`
      document.head.appendChild(gtagScript1)

      const gtagScript2 = document.createElement('script')
      gtagScript2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config','${gtagId}');
      `
      document.head.appendChild(gtagScript2)
    }
  }, [gtmId, fbPixelId, gtagId])

  return null
}

