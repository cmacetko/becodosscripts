import { TermsAndConditionsGenerator } from "@/components/TermsAndConditionsGenerator";

const TermsAndConditionsGeneratorPage = () => {
    return (
        <>
            <header className="text-center mb-8 mt-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    Gerador de Termos e Condições
                </h1>
                <p className="text-muted-foreground mt-2">
                    Crie rapidamente um documento de Termos e Condições básico para o seu site.
                </p>
            </header>
            <main>
                <TermsAndConditionsGenerator />
            </main>
        </>
    );
};

export default TermsAndConditionsGeneratorPage;