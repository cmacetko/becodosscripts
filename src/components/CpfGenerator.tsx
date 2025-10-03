import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generateCpf } from "@/lib/generators";
import { ResultItem } from "./ResultItem";

export const CpfGenerator = () => {
  const [cpfs, setCpfs] = useState<string[]>([]);
  const [withPunctuation, setWithPunctuation] = useState(true);

  const handleGenerate = () => {
    const newCpfs = Array.from({ length: 12 }, () => generateCpf(withPunctuation));
    setCpfs(newCpfs);
  };

  useEffect(() => {
    handleGenerate(); // Gera 12 CPFs na montagem do componente
  }, [withPunctuation]); // Regenera se a opção de pontuação mudar

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={handleGenerate}>Generate CPFs</Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="cpf-punctuation"
            checked={withPunctuation}
            onCheckedChange={setWithPunctuation}
          />
          <Label htmlFor="cpf-punctuation">With Punctuation</Label>
        </div>
      </div>
      {cpfs.length > 0 && (
        <div className="space-y-2">
          {cpfs.map((cpf, index) => (
            <ResultItem key={index} value={cpf} />
          ))}
        </div>
      )}
    </div>
  );
};