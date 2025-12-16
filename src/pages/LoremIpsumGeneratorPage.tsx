import { LoremIpsumGenerator } from "@/components/LoremIpsumGenerator";

const LoremIpsumGeneratorPage = () => {
    return (
        <>
            <header className="text-center mb-8 mt-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    Gerador de Lorem Ipsum
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gere texto de preenchimento para seus layouts e designs.
                </p>
            </header>
            <main>
                <LoremIpsumGenerator />
            </main>
        </>
    );
};

export default LoremIpsumGeneratorPage;