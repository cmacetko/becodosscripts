import { HtmlEntitiesConverter } from "@/components/HtmlEntitiesConverter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HtmlEntitiesConverterPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="container mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Codificador/Decodificador de HTML Entities
          </h1>
          <p className="text-muted-foreground mt-2">
            Converta caracteres especiais para suas entidades HTML correspondentes e vice-versa.
          </p>
        </header>
        <main>
          <HtmlEntitiesConverter />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HtmlEntitiesConverterPage;