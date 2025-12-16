import { CreditCardGenerator } from "@/components/CreditCardGenerator";

const CreditCardGeneratorPage = () => {
    return (
        <>
            <header className="text-center mb-8 mt-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    Gerador de Cartão de Crédito
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gere números de cartão de crédito válidos para testes e desenvolvimento.
                </p>
            </header>
            <main>
                <CreditCardGenerator />
            </main>
        </>
    );
};

export default CreditCardGeneratorPage;