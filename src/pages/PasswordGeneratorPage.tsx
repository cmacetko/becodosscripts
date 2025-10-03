import { PasswordGenerator } from "@/components/PasswordGenerator";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Header } from "@/components/Header";

const PasswordGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="w-full max-w-4xl mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Gerador de Senhas
          </h1>
          <p className="text-muted-foreground mt-2">
            Gere senhas fortes e personalizáveis.
          </p>
        </header>
        <main>
          <PasswordGenerator />
        </main>
      </div>
      <footer className="w-full mt-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default PasswordGeneratorPage;