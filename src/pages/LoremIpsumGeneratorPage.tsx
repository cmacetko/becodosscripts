import { LoremIpsumGenerator } from "@/components/LoremIpsumGenerator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const LoremIpsumGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="container mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Gerador de Lorem Ipsum
          </h1>
          <p className="text-muted-foreground mt-2">
            Gere texto de preenchimento para seus layouts e designs.
          </p>
        </header>
        <main>
          <LoremIpsumGenerator />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LoremIpsumGeneratorPage;