import { PrivacyPolicyGenerator } from "@/components/PrivacyPolicyGenerator";

const PrivacyPolicyGeneratorPage = () => {
    return (
        <>
            <header className="text-center mb-8 mt-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    Gerador de Política de Privacidade
                </h1>
                <p className="text-muted-foreground mt-2">
                    Crie rapidamente uma política de privacidade básica para o seu site.
                </p>
            </header>
            <main>
                <PrivacyPolicyGenerator />
            </main>
        </>
    );
};

export default PrivacyPolicyGeneratorPage;