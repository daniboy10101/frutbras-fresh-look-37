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
        title="Frutbras - Polpas de Frutas Naturais e Alimentos Congelados | 15 Anos de Qualidade"
        description="Distribuidora líder em polpas de frutas 100% naturais, pescados e produtos congelados. 15 anos oferecendo qualidade premium para empresas em todo Brasil. Açaí, manga, caju e muito mais."
        keywords="polpas de frutas naturais, alimentos congelados, açaí, manga, caju, goiaba, distribuidor atacado, frutas congeladas, pescados, São Paulo, Brasil"
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
