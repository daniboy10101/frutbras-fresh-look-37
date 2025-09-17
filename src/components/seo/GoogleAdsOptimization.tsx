import { Helmet } from 'react-helmet-async';

interface GoogleAdsOptimizationProps {
  conversionId?: string;
  remarketing?: boolean;
  enhancedConversions?: boolean;
}

export const GoogleAdsOptimization = ({
  conversionId = "AW-XXXXXXXXXX",
  remarketing = true,
  enhancedConversions = true
}: GoogleAdsOptimizationProps) => {
  return (
    <Helmet>
      {/* Google Ads Global Site Tag */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}', {
            'allow_enhanced_conversions': ${enhancedConversions}
          });
        `}
      </script>

      {/* Enhanced Conversions */}
      {enhancedConversions && (
        <script>
          {`
            gtag('config', '${conversionId}', {
              'allow_enhanced_conversions': true
            });
          `}
        </script>
      )}

      {/* Remarketing Tag */}
      {remarketing && (
        <script>
          {`
            gtag('config', '${conversionId}', {
              'custom_map': {
                'custom_parameter_1': 'category',
                'custom_parameter_2': 'product_id',
                'custom_parameter_3': 'value'
              }
            });
          `}
        </script>
      )}

      {/* Landing Page Quality Signals */}
      <meta name="google-ads-landing-page" content="optimized" />
      <meta name="conversion-tracking" content="enabled" />
      <meta name="page-load-speed" content="optimized" />
      <meta name="mobile-friendly" content="true" />
      <meta name="content-relevance" content="high" />
      
      {/* Structured Data for Google Ads */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Frutbras",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Produtos Frutbras",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Polpas de Frutas"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Product",
                  "name": "Pescados"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

// Conversion tracking functions
export const trackConversion = (value: number, currency: string = 'BRL') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXXX/conversion-label',
      'value': value,
      'currency': currency
    });
  }
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'AW-XXXXXXXXXX', {
      'page_path': pagePath,
      'page_title': pageTitle
    });
  }
};

export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      'transaction_id': transactionId,
      'value': value,
      'currency': 'BRL',
      'items': items
    });
  }
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}