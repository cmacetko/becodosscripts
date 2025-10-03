import { MadeWithDyad } from "@/components/made-with-dyad";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileCode, KeyRound, Building } from "lucide-react";

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
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="w-full max-w-4xl mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-12 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Caixa de Ferramentas do Desenvolvedor
          </h1>
          <p className="text-muted-foreground mt-2">
            Gere dados rapidamente para suas necessidades de desenvolvimento.
          </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
      <footer className="w-full mt-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;