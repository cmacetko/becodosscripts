import { CpfGenerator } from "@/components/CpfGenerator";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Header } from "@/components/Header";

const CpfGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="w-full max-w-4xl mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            CPF Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate valid CPF numbers for your development needs.
          </p>
        </header>
        <main>
          <CpfGenerator />
        </main>
      </div>
      <footer className="w-full mt-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default CpfGeneratorPage;