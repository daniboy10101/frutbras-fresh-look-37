import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export const SEOHead = ({
  title = "Frutbras - Polpas de Frutas Naturais e Alimentos Congelados",
  description = "Distribuidora especializada em polpas de frutas 100% naturais, pescados e produtos congelados. 15 anos de experiência oferecendo qualidade premium no Brasil.",
  keywords = "polpas de frutas, alimentos congelados, frutas naturais, pescados, distribuidora, São Paulo, açaí, manga, caju, goiaba",
  image = "https://frutbras.com.br/hero-fruits.jpg",
  url = "https://frutbras.com.br",
  type = "website",
  structuredData
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Frutbras" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Frutbras" />
      <meta name="language" content="Portuguese" />
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="São Paulo" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};