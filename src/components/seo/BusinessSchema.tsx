import { Helmet } from 'react-helmet-async';

export const BusinessSchema = () => {
  const businessData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://frutbras.com.br/#business",
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
        "priceRange": "$$",
        "currenciesAccepted": "BRL",
        "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
        "areaServed": [
          {
            "@type": "City",
            "name": "São Paulo"
          },
          {
            "@type": "City", 
            "name": "Guarulhos"
          },
          {
            "@type": "City",
            "name": "Osasco"
          }
        ],
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Polpas de Frutas",
              "description": "Pacotes de 12 unidades de polpas naturais"
            },
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://frutbras.com.br/#business"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product", 
              "name": "Pescados Frescos",
              "description": "Pescados vendidos por quilograma"
            },
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://frutbras.com.br/#business"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Gelo Saborizado", 
              "description": "Caixas com 30 unidades"
            },
            "availability": "https://schema.org/InStock",
            "seller": {
              "@id": "https://frutbras.com.br/#business"
            }
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "250",
          "bestRating": "5"
        },
        "review": [
          {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Maria Silva"
            },
            "reviewBody": "Excelente qualidade dos produtos! Polpas de frutas sempre frescas e saborosas."
          },
          {
            "@type": "Review", 
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "João Santos"
            },
            "reviewBody": "Pescados sempre frescos e entrega pontual. Recomendo!"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": "https://frutbras.com.br/"
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessData)}
      </script>
    </Helmet>
  );
};