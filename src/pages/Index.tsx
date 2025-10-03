import { Toolbox } from "@/components/Toolbox";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto flex-grow">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Developer Toolbox
          </h1>
          <p className="text-muted-foreground mt-2">
            Quickly generate data for your development needs.
          </p>
        </header>
        <main>
          <Toolbox />
        </main>
      </div>
      <footer className="w-full mt-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;