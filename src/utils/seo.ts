// SEO utility functions

export const generateSitemap = () => {
  const baseUrl = 'https://frutbras.com.br';
  const pages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/sobre', changefreq: 'monthly', priority: '0.8' },
    { url: '/contato', changefreq: 'monthly', priority: '0.8' },
    { url: '/receitas', changefreq: 'weekly', priority: '0.7' },
    { url: '/produtos/polpas-de-frutas', changefreq: 'weekly', priority: '0.9' },
    { url: '/produtos/frutas-congeladas', changefreq: 'weekly', priority: '0.9' },
    { url: '/produtos/gelo-saborizado', changefreq: 'weekly', priority: '0.9' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://frutbras.com.br/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Allow all crawlers to access images
User-agent: Googlebot-Image
Allow: /

# Crawl-delay for slower bots
User-agent: *
Crawl-delay: 1`;
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
  // In a real implementation, this would generate dynamic OG images
  // For now, return the default image
  return 'https://frutbras.com.br/og-image.jpg';
};