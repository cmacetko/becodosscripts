"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const Utf8Converter = () => {
  const [correctText, setCorrectText] = useState("maçã");
  const [garbledText, setGarbledText] = useState("");

  // Simula utf8_encode do PHP: Converte texto para a representação "quebrada"
  const encodeToGarbled = (text: string): string => {
    try {
      const encoder = new TextEncoder();
      const utf8Bytes = encoder.encode(text);
      const decoder = new TextDecoder('iso-8859-1');
      return decoder.decode(utf8Bytes);
    } catch {
      return "";
    }
  };

  // Simula utf8_decode do PHP: Corrige o texto "quebrado"
  const decodeToCorrect = (text: string): string => {
    try {
      const bytes = Uint8Array.from([...text], (char) => char.charCodeAt(0));
      const decoder = new TextDecoder('utf-8', { fatal: true });
      return decoder.decode(bytes);
    } catch {
      // Retorna o texto como está se a decodificação falhar
      return text;
    }
  };

  useEffect(() => {
    // Define o valor inicial do texto "quebrado" na primeira renderização
    setGarbledText(encodeToGarbled(correctText));
  }, []);

  const handleCorrectTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setCorrectText(newText);
    setGarbledText(encodeToGarbled(newText));
  };

  const handleGarbledTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setGarbledText(newText);
    setCorrectText(decodeToCorrect(newText));
  };
  
  const handleClear = () => {
    setCorrectText("");
    setGarbledText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
          <Label htmlFor="correct-text">Texto Corrigido (UTF-8)</Label>
          <Textarea
            id="correct-text"
            value={correctText}
            onChange={handleCorrectTextChange}
            rows={10}
            placeholder="Digite o texto correto aqui..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="garbled-text">Texto com Problema (ISO-8859-1)</Label>
          <Textarea
            id="garbled-text"
            value={garbledText}
            onChange={handleGarbledTextChange}
            rows={10}
            placeholder="Cole o texto com caracteres estranhos aqui..."
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