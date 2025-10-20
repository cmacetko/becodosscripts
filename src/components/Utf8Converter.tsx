"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";

export const Utf8Converter = () => {
  const [inputText, setInputText] = useState("Olá, mundo!");
  const [outputText, setOutputText] = useState("");

  const handleEncode = () => {
    try {
      const encoder = new TextEncoder();
      const encoded = encoder.encode(inputText);
      const hexString = Array.from(encoded)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" ");
      setOutputText(hexString.toUpperCase());
      showSuccess("Texto codificado para UTF-8 (Hex) com sucesso!");
    } catch (error) {
      showError("Ocorreu um erro ao codificar o texto.");
      setOutputText("");
    }
  };

  const handleDecode = () => {
    try {
      const hexValues = inputText.trim().split(/\s+/);
      const bytes = new Uint8Array(hexValues.map((hex) => parseInt(hex, 16)));
      
      if (bytes.some(isNaN)) {
        throw new Error("Entrada contém valores hexadecimais inválidos.");
      }

      const decoder = new TextDecoder("utf-8", { fatal: true });
      const decodedText = decoder.decode(bytes);
      setOutputText(decodedText);
      showSuccess("Texto decodificado de UTF-8 (Hex) com sucesso!");
    } catch (error) {
      showError("Entrada inválida ou sequência UTF-8 malformada.");
      setOutputText("");
    }
  };

  const handleSwap = () => {
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="input-text">Texto de Entrada</Label>
          <Textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            placeholder="Digite ou cole o texto aqui..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="output-text">Texto de Saída</Label>
          <Textarea
            id="output-text"
            value={outputText}
            readOnly
            rows={10}
            placeholder="O resultado aparecerá aqui..."
            className="font-mono"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={handleEncode}>Codificar para UTF-8 (Hex)</Button>
        <Button onClick={handleDecode}>Decodificar de UTF-8 (Hex)</Button>
        <Button variant="secondary" onClick={handleSwap} size="icon" aria-label="Trocar">
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
        <Button variant="destructive" onClick={handleClear} size="icon" aria-label="Limpar">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};