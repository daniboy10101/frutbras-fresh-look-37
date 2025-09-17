import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  category?: string;
  businessType?: string;
  localBusiness?: boolean;
}

export const SEOHead = ({
  title = "Frutbras - Polpas de Frutas, Pescados e Congelados | Atacado SP",
  description = "🍓 Distribuidora líder em polpas de frutas (pacotes 12un), pescados frescos por kg, gelo saborizado (caixas 30un). ✅ 15 anos no mercado ✅ Entrega em SP ✅ Qualidade garantida",
  keywords = "polpas de frutas atacado, pescados por kg são paulo, distribuidor alimentos congelados, açaí pacote 12 unidades, tilápia salmão camarão kg, gelo saborizado caixa 30, polpa manga caju goiaba atacado, frutas congeladas distribuidor, fornecedor restaurantes sp, alimentos congelados qualidade",
  image = "https://frutbras.com.br/hero-fruits.jpg",
  url = "https://frutbras.com.br",
  type = "website",
  structuredData,
  category = "food",
  businessType = "distributor",
  localBusiness = true
}: SEOHeadProps) => {
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + "..." : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="title" content={optimizedTitle} />
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Google Ads & Search Optimization */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION" />
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION" />
      
      {/* Business & Location Meta */}
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="São Paulo, Brazil" />
      <meta name="geo.position" content="-23.5505;-46.6333" />
      <meta name="ICBM" content="-23.5505, -46.6333" />
      <meta name="distribution" content="global" />
      <meta name="audience" content="all" />
      <meta name="rating" content="general" />
      
      {/* Commercial Intent Keywords */}
      <meta name="product-category" content={category} />
      <meta name="business-type" content={businessType} />
      <meta name="price-range" content="$$" />
      <meta name="delivery-area" content="São Paulo, Guarulhos, Osasco, Santo André, São Bernardo" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Frutbras - Distribuidora de Alimentos" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="business:contact_data:street_address" content="São Paulo, SP" />
      <meta property="business:contact_data:locality" content="São Paulo" />
      <meta property="business:contact_data:region" content="SP" />
      <meta property="business:contact_data:country_name" content="Brazil" />
      <meta property="business:contact_data:phone_number" content="+5564984417040" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={optimizedTitle} />
      <meta property="twitter:description" content={optimizedDescription} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      <meta name="author" content="Frutbras Distribuidora de Alimentos" />
      <meta name="language" content="pt-BR" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="theme-color" content="#22c55e" />
      
      {/* Local Business Schema Preview */}
      {localBusiness && (
        <meta name="local-business" content="food distributor" />
      )}
      
      {/* Google Ads Landing Page Optimization */}
      <meta name="ad-friendly" content="true" />
      <meta name="conversion-friendly" content="true" />
      <meta name="landing-page-quality" content="high" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://google-analytics.com" />
      <link rel="dns-prefetch" href="https://googletagmanager.com" />
    </Helmet>
  );
};