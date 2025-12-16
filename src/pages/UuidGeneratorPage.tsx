import { UuidGenerator } from "@/components/UuidGenerator";

const UuidGeneratorPage = () => {
    return (
        <>
            <header className="text-center mb-8 mt-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    Gerador de UUID v4
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gere Identificadores Únicos Universais (UUIDs) versão 4.
                </p>
            </header>
            <main>
                <UuidGenerator />
            </main>
        </>
    );
};

export default UuidGeneratorPage;
