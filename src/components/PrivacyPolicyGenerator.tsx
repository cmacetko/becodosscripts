import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generatePrivacyPolicy } from "@/lib/generators";
import { showSuccess, showError } from "@/utils/toast";
import { Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // Importando Textarea

export const PrivacyPolicyGenerator = () => {
  const [siteName, setSiteName] = useState("Meu Site Exemplo");
  const [siteUrl, setSiteUrl] = useState("https://meusiteexemplo.com.br");
  const [format, setFormat] = useState<'text' | 'html'>('text');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = () => {
    if (!siteName.trim() || !siteUrl.trim()) {
        showError("Por favor, preencha o Nome e a URL do Site.");
        setGeneratedText('');
        return;
    }
    
    const newText = generatePrivacyPolicy({ siteName, siteUrl, format });
    setGeneratedText(newText);
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      showSuccess(`Política de Privacidade (${format.toUpperCase()}) copiada para a área de transferência!`);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [siteName, siteUrl, format]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="site-name">Nome do Site</Label>
          <Input
            id="site-name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Ex: Beco dos Scripts"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="site-url">URL do Site</Label>
          <Input
            id="site-url"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="Ex: https://becodosscripts.com.br"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Label>Formato de Saída</Label>
        <RadioGroup
          value={format}
          onValueChange={(value: 'text' | 'html') => setFormat(value)}
          className="flex items-center space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="format-text" />
            <Label htmlFor="format-text">Texto Simples</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="html" id="format-html" />
            <Label htmlFor="format-html">HTML (Código Fonte)</Label>
          </div>
        </RadioGroup>
      </div>

      <Button onClick={handleGenerate} className="w-full sm:w-auto">Gerar Política</Button>
      
      {generatedText && (
        <div className="space-y-4">
          {format === 'html' ? (
            <Textarea
              value={generatedText}
              readOnly
              rows={20}
              className="font-mono text-sm resize-none"
            />
          ) : (
            <div className="p-4 border rounded-md bg-muted/50 min-h-[20rem] text-left overflow-auto">
              <p className="whitespace-pre-wrap font-sans text-sm">{generatedText}</p>
            </div>
          )}
          <Button onClick={handleCopy} className="w-full sm:w-auto">
            <Copy className="mr-2 h-4 w-4" />
            Copiar Texto Gerado
          </Button>
        </div>
      )}
    </div>
  );
};