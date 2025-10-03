import { CpfGenerator } from "@/components/CpfGenerator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer"; // Importar o novo Footer

const CpfGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="w-full max-w-4xl mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Gerador de CPF
          </h1>
          <p className="text-muted-foreground mt-2">
            Gere números de CPF válidos para suas necessidades de desenvolvimento.
          </p>
        </header>
        <main>
          <CpfGenerator />
        </main>
      </div>
      <Footer /> {/* Usar o novo Footer */}
    </div>
  );
};

export default CpfGeneratorPage;