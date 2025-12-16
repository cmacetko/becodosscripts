import { HtmlEntitiesConverter } from "@/components/HtmlEntitiesConverter";

const HtmlEntitiesConverterPage = () => {
    return (
        <>
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
        </>
    );
};

export default HtmlEntitiesConverterPage;