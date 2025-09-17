import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SEOHead } from "@/components/seo/SEOHead";
import { organizationStructuredData, websiteStructuredData } from "@/components/seo/StructuredData";

const Index = () => {
  const structuredData = [organizationStructuredData, websiteStructuredData];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Frutbras - Polpas de Frutas, Pescados e Alimentos Congelados | 15 Anos de Qualidade"
        description="Distribuidora líder em polpas de frutas naturais (pacotes 12un), pescados frescos por kg, gelo saborizado (caixas 30un) e frutas congeladas. 15 anos oferecendo qualidade premium para empresas."
        keywords="polpas de frutas naturais, pescados por kg, alimentos congelados, açaí, manga, caju, tilápia, salmão, camarão, gelo saborizado caixa, distribuidor atacado, São Paulo, Brasil"
        structuredData={structuredData}
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
