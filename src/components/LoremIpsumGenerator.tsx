import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { generateLoremIpsum } from "@/lib/generators";
import { showSuccess } from "@/utils/toast";
import { Copy } from "lucide-react";

export const LoremIpsumGenerator = () => {
  const [paragraphs, setParagraphs] = useState(5);
  const [format, setFormat] = useState<'text' | 'html'>('text');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = () => {
    const newText = generateLoremIpsum(paragraphs, format);
    setGeneratedText(newText);
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      showSuccess("Texto copiado para a área de transferência!");
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [paragraphs, format]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="paragraphs">Parágrafos</Label>
            <span className="text-sm font-medium">{paragraphs}</span>
          </div>
          <Slider
            id="paragraphs"
            min={1}
            max={20}
            step={1}
            value={[paragraphs]}
            onValueChange={(value) => setParagraphs(value[0])}
          />
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
              <Label htmlFor="format-html">HTML</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <Button onClick={handleGenerate} className="w-full sm:w-auto">Gerar Texto</Button>
      <div className="relative">
        <Textarea
          readOnly
          value={generatedText}
          className="h-64 font-mono text-sm"
          placeholder="Seu texto gerado aparecerá aqui..."
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};