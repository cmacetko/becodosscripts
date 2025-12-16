import { Utf8Converter } from "@/components/Utf8Converter";

const Utf8ConverterPage = () => {
    return (
        <>
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
        </>
    );
};

export default Utf8ConverterPage;