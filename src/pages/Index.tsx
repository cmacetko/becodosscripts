import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileCode, KeyRound, Building, CreditCard, BookOpenText, FileText } from "lucide-react";
import { Footer } from "@/components/Footer";

const Index = () => {
  const tools = [
    {
      title: "Gerador de CPF",
      description: "Gere números de CPF válidos para testes e desenvolvimento.",
      icon: <FileCode className="h-8 w-8 text-primary" />,
      path: "/cpf-generator",
    },
    {
      title: "Gerador de CNPJ",
      description: "Gere números de CNPJ válidos para testes e desenvolvimento.",
      icon: <Building className="h-8 w-8 text-primary" />,
      path: "/cnpj-generator",
    },
    {
      title: "Gerador de Senhas",
      description: "Crie senhas fortes e personalizáveis para diversas necessidades.",
      icon: <KeyRound className="h-8 w-8 text-primary" />,
      path: "/password-generator",
    },
    {
      title: "Gerador de Cartão de Crédito",
      description: "Gere números de cartão de crédito válidos para testes.",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      path: "/credit-card-generator",
    },
    {
      title: "Gerador de Lorem Ipsum",
      description: "Gere texto de preenchimento para seus layouts e designs.",
      icon: <BookOpenText className="h-8 w-8 text-primary" />,
      path: "/lorem-ipsum-generator",
    },
    {
      title: "Gerador de Política de Privacidade",
      description: "Crie rapidamente uma política de privacidade básica para o seu site.",
      icon: <FileText className="h-8 w-8 text-primary" />,
      path: "/privacy-policy-generator",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="container mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-12 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Caixa de Ferramentas do Desenvolvedor
          </h1>
          <p className="text-muted-foreground mt-2">
            Gere dados rapidamente para suas necessidades de desenvolvimento.
          </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link to={tool.path} key={tool.path}>
              <Card className="flex flex-col items-center text-center p-6 hover:bg-accent/50 transition-colors h-full">
                <CardHeader className="flex flex-col items-center p-0 mb-4">
                  {tool.icon}
                  <CardTitle className="mt-4 text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-muted-foreground">
                  {tool.description}
                </CardDescription>
              </Card>
            </Link>
          ))}
        </main>

        {/* Call to Action para o Blog */}
        <section className="mt-12 text-center">
          <Card 
            className="relative p-6 flex flex-col items-center bg-primary text-white bg-cover bg-center" 
            style={{ backgroundImage: "url('/programming-1873854_1920.png')" }}
          >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Overlay para legibilidade */}
            <CardHeader className="flex flex-col items-center p-0 mb-4 z-10">
              <BookOpenText className="h-8 w-8 text-white" />
              <CardTitle className="mt-4 text-xl">Explore meu Blog de Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mb-4 z-10">
              <p>Encontre artigos técnicos, tutoriais e insights sobre desenvolvimento web e muito mais.</p>
            </CardContent>
            <Button asChild variant="secondary" className="z-10">
              <a href="https://www.palomamacetko.com.br/" target="_blank" rel="noopener noreferrer">
                Visitar o Blog
              </a>
            </Button>
          </Card>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Index;