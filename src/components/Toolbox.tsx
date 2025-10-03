import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CpfGenerator } from "./CpfGenerator";
import { CnpjGenerator } from "./CnpjGenerator";
import { PasswordGenerator } from "./PasswordGenerator";
import { FileCode, KeyRound, Building } from "lucide-react";

interface ToolboxProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Toolbox = ({ activeTab, setActiveTab }: ToolboxProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="cpf">
          <FileCode className="mr-2 h-4 w-4" />
          CPF Generator
        </TabsTrigger>
        <TabsTrigger value="cnpj">
          <Building className="mr-2 h-4 w-4" />
          CNPJ Generator
        </TabsTrigger>
        <TabsTrigger value="password">
          <KeyRound className="mr-2 h-4 w-4" />
          Password Generator
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cpf" className="mt-6">
        <CpfGenerator />
      </TabsContent>
      <TabsContent value="cnpj" className="mt-6">
        <CnpjGenerator />
      </TabsContent>
      <TabsContent value="password" className="mt-6">
        <PasswordGenerator />
      </TabsContent>
    </Tabs>
  );
};