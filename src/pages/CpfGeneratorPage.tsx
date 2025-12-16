import { CpfGenerator } from "@/components/CpfGenerator";

const CpfGeneratorPage = () => {
    return (
        <>
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
        </>
    );
};

export default CpfGeneratorPage;