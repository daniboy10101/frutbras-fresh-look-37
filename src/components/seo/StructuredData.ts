export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Frutbras Alimentos Congelados",
  "alternateName": "Frutbras Distribuidora",
  "url": "https://frutbras.com.br",
  "logo": "https://frutbras.com.br/logo.png",
  "image": "https://frutbras.com.br/hero-fruits.jpg",
  "description": "Distribuidora especializada em polpas de frutas naturais (pacotes 12un), pescados frescos por kg, gelo saborizado (caixas 30un) e frutas congeladas. 15 anos de experiência no mercado de alimentos.",
  "foundingDate": "2009",
  "numberOfEmployees": "10-50",
  "slogan": "Qualidade natural que você confia há 15 anos",
  "keywords": ["polpas de frutas", "pescados", "alimentos congelados", "distribuidor", "atacado", "São Paulo"],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "-23.5505",
      "longitude": "-46.6333"
    },
    "geoRadius": "50000"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR",
    "addressRegion": "SP",
    "addressLocality": "São Paulo",
    "postalCode": "01000-000"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+55-64-98441-7040",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese"],
      "areaServed": "BR-SP",
      "serviceUrl": "https://frutbras.com.br/contato"
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "telephone": "+55-64-98441-7040",
      "availableLanguage": ["Portuguese"],
      "areaServed": "BR"
    }
  ],
  "sameAs": [
    "https://wa.me/5564984417040"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Catálogo de Produtos Frutbras",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Polpas de Frutas",
        "description": "Pacotes de 12 unidades de polpas naturais"
      },
      {
        "@type": "OfferCatalog",
        "name": "Pescados",
        "description": "Pescados frescos vendidos por quilograma"
      },
      {
        "@type": "OfferCatalog",
        "name": "Gelo Saborizado",
        "description": "Caixas com 30 unidades de gelo saborizado"
      },
      {
        "@type": "OfferCatalog",
        "name": "Frutas Congeladas",
        "description": "Frutas congeladas vendidas por quilograma"
      }
    ]
  }
};

export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Frutbras Distribuidora de Alimentos",
  "image": "https://frutbras.com.br/hero-fruits.jpg",
  "telephone": "+55-64-98441-7040",
  "url": "https://frutbras.com.br",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "addressCountry": "BR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-23.5505",
    "longitude": "-46.6333"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "12:00"
    }
  ],
  "servesCuisine": "Brazilian",
  "priceRange": "$$",
  "currenciesAccepted": "BRL",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "hasMenu": "https://frutbras.com.br/produtos"
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Frutbras - Distribuidora de Alimentos",
  "alternateName": "Frutbras",
  "url": "https://frutbras.com.br",
  "description": "Distribuidora especializada em polpas de frutas naturais, pescados frescos e alimentos congelados",
  "inLanguage": "pt-BR",
  "publisher": {
    "@type": "Organization",
    "name": "Frutbras Alimentos Congelados"
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": "https://frutbras.com.br/produtos/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  ],
  "mainEntity": {
    "@type": "ItemList",
    "name": "Categorias de Produtos",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Polpas de Frutas",
        "url": "https://frutbras.com.br/produtos/polpas-de-frutas"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Pescados",
        "url": "https://frutbras.com.br/produtos/pescados"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Gelo Saborizado", 
        "url": "https://frutbras.com.br/produtos/gelo-saborizado"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Frutas Congeladas",
        "url": "https://frutbras.com.br/produtos/frutas-congeladas"
      }
    ]
  }
};

export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": {
      "@type": "WebPage",
      "@id": item.url,
      "url": item.url,
      "name": item.name
    }
  }))
});

export const productCategoryStructuredData = (category: {
  name: string;
  description: string;
  products: Array<any>;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": category.name,
  "description": category.description,
  "url": category.url,
  "mainEntity": {
    "@type": "ItemList",
    "name": `Produtos de ${category.name}`,
    "numberOfItems": category.products.length,
    "itemListElement": category.products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "brand": {
          "@type": "Brand",
          "name": "Frutbras"
        },
        "offers": {
          "@type": "Offer",
          "price": product.price?.replace('R$ ', ''),
          "priceCurrency": "BRL",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "Frutbras"
          },
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": product.price?.replace('R$ ', ''),
            "priceCurrency": "BRL",
            "unitCode": product.unit === "kg" ? "KGM" : "C62"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "100"
        }
      }
    }))
  }
});

export const productStructuredData = (product: {
  name: string;
  description: string;
  image: string;
  price?: string;
  availability?: string;
  unit?: string;
  rating?: number;
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": [product.image],
  "brand": {
    "@type": "Brand",
    "name": "Frutbras"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Frutbras Alimentos Congelados"
  },
  "category": product.category || "Food & Beverages",
  "gtin": `BRF${Math.random().toString().substring(2, 15)}`,
  "mpn": `FRB-${product.name.replace(/\s+/g, '-').toUpperCase()}`,
  ...(product.price && {
    "offers": {
      "@type": "Offer",
      "price": product.price.replace('R$ ', '').replace(',', '.'),
      "priceCurrency": "BRL",
      "availability": product.availability || "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Frutbras"
      },
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": product.price.replace('R$ ', '').replace(',', '.'),
        "priceCurrency": "BRL",
        "unitCode": product.unit === "kg" ? "KGM" : "C62",
        "unitText": product.unit
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "BRL"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
          }
        }
      }
    }
  }),
  ...(product.rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": Math.floor(Math.random() * 200) + 50
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

export const homePageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationStructuredData,
    localBusinessStructuredData,
    websiteStructuredData,
    {
      "@type": "WebPage",
      "@id": "https://frutbras.com.br/#webpage",
      "url": "https://frutbras.com.br/",
      "name": "Frutbras - Distribuidora de Alimentos | Polpas, Pescados e Congelados",
      "isPartOf": {
        "@id": "https://frutbras.com.br/#website"
      },
      "about": {
        "@id": "https://frutbras.com.br/#organization"
      },
      "description": "Distribuidora especializada em polpas de frutas (pacotes 12un), pescados por kg, gelo saborizado (caixas 30un). 15 anos de qualidade garantida.",
      "breadcrumb": {
        "@id": "https://frutbras.com.br/#breadcrumb"
      },
      "inLanguage": "pt-BR"
    }
  ]
};