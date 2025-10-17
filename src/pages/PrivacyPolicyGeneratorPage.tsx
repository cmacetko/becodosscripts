import { PrivacyPolicyGenerator } from "@/components/PrivacyPolicyGenerator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicyGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="container mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Gerador de Política de Privacidade
          </h1>
          <p className="text-muted-foreground mt-2">
            Crie rapidamente uma política de privacidade básica para o seu site.
          </p>
        </header>
        <main>
          <PrivacyPolicyGenerator />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyGeneratorPage;