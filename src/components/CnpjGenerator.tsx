import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { generateCnpj } from "@/lib/generators";
import { ResultItem } from "./ResultItem";

export const CnpjGenerator = () => {
  const [cnpjs, setCnpjs] = useState<string[]>([]);
  const [withPunctuation, setWithPunctuation] = useState(true);

  const handleGenerate = () => {
    const newCnpjs = Array.from({ length: 10 }, () => generateCnpj(withPunctuation));
    setCnpjs(newCnpjs);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={handleGenerate}>Generate CNPJs</Button>
        <div className="flex items-center space-x-2">
          <Switch
            id="cnpj-punctuation"
            checked={withPunctuation}
            onCheckedChange={setWithPunctuation}
          />
          <Label htmlFor="cnpj-punctuation">With Punctuation</Label>
        </div>
      </div>
      {cnpjs.length > 0 && (
        <div className="space-y-2">
          {cnpjs.map((cnpj, index) => (
            <ResultItem key={index} value={cnpj} />
          ))}
        </div>
      )}
    </div>
  );
};