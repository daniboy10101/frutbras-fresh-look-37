export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Frutbras Alimentos Congelados",
  "url": "https://frutbras.com.br",
  "logo": "https://frutbras.com.br/logo.png",
  "description": "Distribuidora especializada em polpas de frutas 100% naturais, pescados e produtos congelados. 15 anos de experiência oferecendo qualidade premium.",
  "foundingDate": "2009",
  "numberOfEmployees": "10-50",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressRegion": "SP",
    "addressLocality": "São Paulo"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-64-98441-7040",
    "contactType": "customer service",
    "availableLanguage": "Portuguese"
  },
  "sameAs": [
    "https://wa.me/5564984417040"
  ]
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Frutbras",
  "url": "https://frutbras.com.br",
  "description": "Distribuidora de polpas de frutas naturais e alimentos congelados",
  "inLanguage": "pt-BR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://frutbras.com.br/produtos?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const productStructuredData = (product: {
  name: string;
  description: string;
  image: string;
  price?: string;
  availability?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "brand": {
    "@type": "Brand",
    "name": "Frutbras"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Frutbras Alimentos Congelados"
  },
  ...(product.price && {
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "BRL",
      "availability": product.availability || "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Frutbras"
      }
    }
  })
});

export const faqStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});