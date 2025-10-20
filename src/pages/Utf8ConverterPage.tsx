import { Utf8Converter } from "@/components/Utf8Converter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Utf8ConverterPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="container mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Conversor UTF-8 (estilo PHP)
          </h1>
          <p className="text-muted-foreground mt-2">
            Corrija textos com caracteres errados. A conversão é feita em tempo real enquanto você digita.
          </p>
        </header>
        <main>
          <Utf8Converter />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Utf8ConverterPage;