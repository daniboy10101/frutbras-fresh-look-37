import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SEOHead } from "@/components/seo/SEOHead";
import { homePageStructuredData } from "@/components/seo/StructuredData";

const Index = () => {
  const structuredData = homePageStructuredData;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Frutbras - Polpas de Frutas, Pescados e Congelados | Atacado SP"
        description="🍓 Distribuidora líder em polpas (pacotes 12un), pescados frescos por kg, gelo saborizado (caixas 30un). ✅ 15 anos no mercado ✅ Entrega em SP ✅ Qualidade garantida"
        keywords="polpas de frutas atacado, pescados por kg são paulo, distribuidor alimentos congelados, açaí pacote 12 unidades, tilápia salmão camarão kg, gelo saborizado caixa 30, polpa manga caju goiaba atacado, frutas congeladas distribuidor, fornecedor restaurantes sp"
        structuredData={structuredData}
        category="food"
        businessType="distributor"
        localBusiness={true}
      />
      
      <Header />
      <main>
        <Hero />
        <ProductCategories />
        <About />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
