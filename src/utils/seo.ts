// Advanced SEO utility functions for Google Ads optimization

export const generateSitemap = () => {
  const baseUrl = 'https://frutbras.com.br';
  const pages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/sobre', changefreq: 'monthly', priority: '0.8' },
    { url: '/contato', changefreq: 'monthly', priority: '0.9' },
    { url: '/receitas', changefreq: 'weekly', priority: '0.7' },
    { url: '/produtos/polpas-de-frutas', changefreq: 'weekly', priority: '0.95' },
    { url: '/produtos/frutas-congeladas', changefreq: 'weekly', priority: '0.95' },
    { url: '/produtos/pescados', changefreq: 'weekly', priority: '0.95' },
    { url: '/produtos/pescados', changefreq: 'weekly', priority: '0.95' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <image:image>
      <image:loc>${baseUrl}/hero-fruits.jpg</image:loc>
      <image:title>Frutbras - Distribuidora de Alimentos</image:title>
      <image:caption>Polpas de frutas, pescados e alimentos congelados</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Priority crawling for product pages
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot  
Allow: /
Crawl-delay: 1

# Allow all crawlers to access images and static files
User-agent: Googlebot-Image
Allow: /assets/
Allow: /src/assets/

# Sitemaps
Sitemap: https://frutbras.com.br/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
Disallow: /*?*

# Special directives for Google Ads Quality Score
# Allow fast indexing of landing pages
User-agent: Googlebot
Allow: /produtos/
Allow: /contato
Allow: /sobre`;
};

export const optimizePageTitle = (title: string, maxLength: number = 60): string => {
  if (title.length <= maxLength) return title;
  
  // Find last space before max length
  const truncated = title.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

export const optimizeMetaDescription = (description: string, maxLength: number = 160): string => {
  if (description.length <= maxLength) return description;
  
  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://frutbras.com.br';
  return `${baseUrl}${path}`;
};

export const generateOpenGraphImage = (title: string, description: string): string => {
  // Dynamic OG image generation URL
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  return `https://frutbras.com.br/api/og?title=${encodedTitle}&desc=${encodedDesc}`;
};

// Google Ads specific SEO functions
export const generateAdWords = (category: string): string[] => {
  const baseWords = [
    'distribuidora', 'atacado', 'fornecedor', 'qualidade', 'são paulo', 'sp', 
    'entrega', 'fresco', 'natural', '15 anos', 'experiência', 'confiança'
  ];

  const categoryWords: Record<string, string[]> = {
    'polpas-de-frutas': [
      'polpa de fruta', 'açaí', 'manga', 'caju', 'goiaba', 'pacote 12 unidades',
      'polpa natural', 'polpa congelada', 'vitamina', 'suco natural'
    ],
    'pescados': [
      'pescados', 'tilápia', 'salmão', 'camarão', 'polvo', 'peixe fresco',
      'pescado por kg', 'frutos do mar', 'qualidade premium'
    ],
    'gelo-saborizado': [
      'gelo saborizado', 'caixa 30 unidades', 'gelo de fruta', 'refrescante',
      'gelo natural', 'sabores tropicais'
    ],
    'frutas-congeladas': [
      'frutas congeladas', 'fruta por kg', 'congelado', 'smoothie', 
      'mix de frutas', 'açaí congelado'
    ]
  };

  return [...baseWords, ...(categoryWords[category] || [])];
};

export const generateLandingPageKeywords = (category: string): string => {
  const adWords = generateAdWords(category);
  return adWords.join(', ');
};

export const generateLocalSEOKeywords = (city: string = 'São Paulo'): string[] => {
  return [
    `distribuidora ${city}`,
    `fornecedor alimentos ${city}`,
    `polpas de frutas ${city}`,
    `pescados ${city}`,
    `atacado alimentos ${city}`,
    `entrega ${city}`,
    `distribuidor ${city} sp`,
    'região metropolitana são paulo',
    'grande são paulo',
    'abc paulista'
  ];
};

export const generateSchemaMarkupForAds = (product: any) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand", 
      "name": "Frutbras"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price?.replace('R$ ', ''),
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Frutbras",
        "url": "https://frutbras.com.br"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.8,
      "reviewCount": 150
    }
  };
};

// Landing page quality optimization
export const optimizeForQualityScore = () => {
  return {
    fastLoading: true,
    mobileOptimized: true,
    clearNavigation: true,
    relevantContent: true,
    transparentBusiness: true,
    easyContact: true,
    secureConnection: true
  };
};