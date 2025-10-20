"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { htmlEncode, htmlDecode } from "@/lib/generators";

export const HtmlEntitiesConverter = () => {
  const [plainText, setPlainText] = useState("<h1>Olá Mundo!</h1>");
  const [encodedText, setEncodedText] = useState("");

  useEffect(() => {
    // Define o valor inicial codificado na primeira renderização
    setEncodedText(htmlEncode(plainText));
  }, []);

  const handlePlainTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setPlainText(newText);
    setEncodedText(htmlEncode(newText));
  };

  const handleEncodedTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setEncodedText(newText);
    setPlainText(htmlDecode(newText));
  };
  
  const handleClear = () => {
    setPlainText("");
    setEncodedText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
          <Label htmlFor="plain-text">Texto Decodificado</Label>
          <Textarea
            id="plain-text"
            value={plainText}
            onChange={handlePlainTextChange}
            rows={10}
            placeholder="Digite ou cole o texto aqui..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="encoded-text">Texto Codificado (HTML Entities)</Label>
          <Textarea
            id="encoded-text"
            value={encodedText}
            onChange={handleEncodedTextChange}
            rows={10}
            placeholder="O texto codificado aparecerá aqui..."
            className="font-mono"
          />
        </div>
      </div>
       <div className="flex justify-center">
        <Button variant="destructive" onClick={handleClear} size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Limpar Campos
        </Button>
      </div>
    </div>
  );
};