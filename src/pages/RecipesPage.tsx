import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, Users, Star, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

const RecipesPage = () => {
  const [activeCategory, setActiveCategory] = useState("todos");

  const categories = [
    { id: "todos", name: "Todos", emoji: "🍴" },
    { id: "drinks", name: "Drinks", emoji: "🍹" },
    { id: "sobremesas", name: "Sobremesas", emoji: "🍰" },
    { id: "mix", name: "Mix de Frutas", emoji: "🥤" }
  ];

  const recipes = [
    {
      id: 1,
      title: "Smoothie Tropical",
      category: "drinks",
      description: "Delicioso smoothie com manga, abacaxi e maracujá",
      image: "/placeholder.svg",
      difficulty: "Fácil",
      time: "5 min",
      servings: "2 pessoas",
      rating: 4.8,
      ingredients: ["200ml Polpa de Manga", "150ml Polpa de Abacaxi", "100ml Polpa de Maracujá", "200ml Água Gelada", "Gelo a gosto"],
      instructions: ["Bata todos os ingredientes no liquidificador", "Adicione gelo a gosto", "Sirva imediatamente"]
    },
    {
      id: 2,
      title: "Caipirinha de Cajá",
      category: "drinks",
      description: "Caipirinha refrescante com polpa de cajá",
      image: "/placeholder.svg",
      difficulty: "Fácil",
      time: "3 min",
      servings: "1 pessoa",
      rating: 4.6,
      ingredients: ["100ml Polpa de Cajá", "50ml Cachaça", "2 colheres de açúcar", "Gelo", "Limão"],
      instructions: ["Macere o limão com açúcar", "Adicione a polpa de cajá", "Complete com cachaça e gelo"]
    },
    {
      id: 3,
      title: "Mousse de Maracujá",
      category: "sobremesas",
      description: "Mousse cremoso e refrescante de maracujá",
      image: "/placeholder.svg",
      difficulty: "Médio",
      time: "20 min",
      servings: "6 pessoas",
      rating: 4.9,
      ingredients: ["200ml Polpa de Maracujá", "1 lata de leite condensado", "1 lata de creme de leite", "1 envelope de gelatina"],
      instructions: ["Hidrate a gelatina", "Bata todos os ingredientes", "Leve à geladeira por 4 horas"]
    },
    {
      id: 4,
      title: "Torta de Frutas Vermelhas",
      category: "sobremesas",
      description: "Torta deliciosa com mix de frutas vermelhas",
      image: "/placeholder.svg",
      difficulty: "Difícil",
      time: "60 min",
      servings: "8 pessoas",
      rating: 4.7,
      ingredients: ["Mix de Frutas Vermelhas", "Massa pronta", "Creme pasteleiro", "Gelatina"],
      instructions: ["Prepare a massa", "Faça o creme", "Monte a torta", "Decore com frutas"]
    },
    {
      id: 5,
      title: "Vitamina Energética",
      category: "mix",
      description: "Mix de frutas energético para começar o dia",
      image: "/placeholder.svg",
      difficulty: "Fácil",
      time: "5 min",
      servings: "2 pessoas",
      rating: 4.5,
      ingredients: ["Mix de Frutas Tropicais", "Banana", "Aveia", "Mel", "Leite"],
      instructions: ["Bata todos os ingredientes", "Adicione gelo se desejar", "Sirva gelado"]
    },
    {
      id: 6,
      title: "Salada de Frutas Gourmet",
      category: "mix",
      description: "Salada especial com frutas selecionadas",
      image: "/placeholder.svg",
      difficulty: "Fácil",
      time: "10 min",
      servings: "4 pessoas",
      rating: 4.4,
      ingredients: ["Mix de Frutas da Estação", "Hortelã", "Mel", "Suco de limão"],
      instructions: ["Corte as frutas", "Tempere com mel e limão", "Decore com hortelã"]
    }
  ];

  const filteredRecipes = activeCategory === "todos" 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Médio": return "bg-yellow-100 text-yellow-800";
      case "Difícil": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 py-16 gradient-hero rounded-2xl text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Receitas <span className="text-secondary">Deliciosas</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
            Descubra receitas incríveis usando nossos produtos naturais
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2 transition-spring"
            >
              <span>{category.emoji}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-strong transition-spring group">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                  <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
                    {recipe.title}
                  </CardTitle>
                    <CardDescription className="mt-2">
                      {recipe.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-secondary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {recipe.servings}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Ingredientes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                        <li key={index}>• {ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <li className="text-primary">+ {recipe.ingredients.length - 3} mais...</li>
                      )}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/5564984417040?text=Olá! Gostaria da receita completa de ${recipe.title}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Receita Completa
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center py-12 bg-muted rounded-2xl">
          <h2 className="text-3xl font-heading font-bold mb-4">Tem uma receita especial?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Compartilhe sua receita usando nossos produtos e ela pode aparecer aqui!
          </p>
          <Button size="lg" asChild>
            <a 
              href="https://wa.me/5564984417040?text=Olá! Gostaria de compartilhar uma receita usando produtos da Frutbras."
              target="_blank"
              rel="noopener noreferrer"
            >
              Compartilhar Receita
            </a>
          </Button>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default RecipesPage;