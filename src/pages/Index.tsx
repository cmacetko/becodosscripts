import { useState } from "react";
import { Toolbox } from "@/components/Toolbox";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Header } from "@/components/Header";

const Index = () => {
  const [activeTab, setActiveTab] = useState("cpf");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full max-w-4xl mx-auto flex-grow p-4 sm:p-8">
        <header className="text-center mb-8 mt-4"> {/* Added mt-4 for spacing below sticky header */}
          <h1 className="text-4xl font-bold tracking-tight">
            Developer Toolbox
          </h1>
          <p className="text-muted-foreground mt-2">
            Quickly generate data for your development needs.
          </p>
        </header>
        <main>
          <Toolbox activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
      </div>
      <footer className="w-full mt-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;