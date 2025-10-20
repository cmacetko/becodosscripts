"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightLeft, Trash2 } from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";

export const Utf8Converter = () => {
  const [inputText, setInputText] = useState("maçã");
  const [outputText, setOutputText] = useState("");

  // Simulates PHP's utf8_encode: Converts a string assumed to be ISO-8859-1 to UTF-8.
  const handleEncode = () => {
    try {
      const encoder = new TextEncoder();
      const utf8Bytes = encoder.encode(inputText);
      const decoder = new TextDecoder('iso-8859-1');
      const encodedString = decoder.decode(utf8Bytes);
      setOutputText(encodedString);
      showSuccess("Texto codificado (utf8_encode) com sucesso!");
    } catch (error) {
      showError("Ocorreu um erro ao codificar o texto.");
      setOutputText("");
    }
  };

  // Simulates PHP's utf8_decode: Converts a string from UTF-8 to ISO-8859-1.
  // This is useful for fixing "garbled" text.
  const handleDecode = () => {
    try {
      // Get the byte values from the character codes of the input string.
      const bytes = Uint8Array.from(
        [...inputText],
        char => char.charCodeAt(0)
      );
      // Decode these bytes as a UTF-8 stream.
      const decoder = new TextDecoder('utf-8', { fatal: true });
      const decodedString = decoder.decode(bytes);
      setOutputText(decodedString);
      showSuccess("Texto decodificado (utf8_decode) com sucesso!");
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
        <Button onClick={handleEncode}>Codificar (utf8_encode)</Button>
        <Button onClick={handleDecode}>Decodificar (utf8_decode)</Button>
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