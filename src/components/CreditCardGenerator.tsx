import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { generateCreditCard, getAllCreditCardBrands } from "@/lib/generators";
import { ResultItem } from "./ResultItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneratedCard {
  brand: string;
  number: string;
}

export const CreditCardGenerator = () => {
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("all"); // Estado para a bandeira selecionada
  const allBrands = getAllCreditCardBrands();

  const handleGenerate = () => {
    const newCards: GeneratedCard[] = [];

    if (selectedBrand === "all") {
      allBrands.forEach((brand) => {
        for (let i = 0; i < 2; i++) {
          const cardNumber = generateCreditCard(brand.name);
          if (cardNumber) {
            newCards.push({ brand: brand.name, number: cardNumber });
          }
        }
      });
    } else {
      const brand = allBrands.find((b) => b.name === selectedBrand);
      if (brand) {
        for (let i = 0; i < 2; i++) {
          const cardNumber = generateCreditCard(brand.name);
          if (cardNumber) {
            newCards.push({ brand: brand.name, number: cardNumber });
          }
        }
      }
    }
    setGeneratedCards(newCards);
  };

  useEffect(() => {
    handleGenerate(); // Gera cartões na montagem e quando a bandeira selecionada muda
  }, [selectedBrand]); // Adiciona selectedBrand como dependência

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button onClick={handleGenerate}>Gerar Cartões de Crédito</Button>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar Bandeira" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Bandeiras</SelectItem>
            {allBrands.map((brand) => (
              <SelectItem key={brand.name} value={brand.name}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {generatedCards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generatedCards.map((card, index) => (
            <ResultItem key={index} value={card.number} />
          ))}
        </div>
      )}
    </div>
  );
};