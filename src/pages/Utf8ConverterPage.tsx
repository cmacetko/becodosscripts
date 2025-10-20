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
            Codificador/Decodificador UTF-8
          </h1>
          <p className="text-muted-foreground mt-2">
            Converta texto para sua representação hexadecimal UTF-8 e vice-versa.
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