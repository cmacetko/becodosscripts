import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { generateCreditCard, getAllCreditCardBrands } from "@/lib/generators";
import { ResultItem } from "./ResultItem";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GeneratedCard {
  brand: string;
  number: string;
}

export const CreditCardGenerator = () => {
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([]);

  const handleGenerate = () => {
    const newCards: GeneratedCard[] = [];
    const brands = getAllCreditCardBrands();

    brands.forEach((brand) => {
      // Generate 2 numbers for each brand
      for (let i = 0; i < 2; i++) {
        const cardNumber = generateCreditCard(brand.name);
        if (cardNumber) {
          newCards.push({ brand: brand.name, number: cardNumber });
        }
      }
    });
    setGeneratedCards(newCards);
  };

  useEffect(() => {
    handleGenerate(); // Generate cards on component mount
  }, []);

  return (
    <div className="space-y-6">
      <Button onClick={handleGenerate}>Gerar Cartões de Crédito</Button>
      {generatedCards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {generatedCards.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">{card.brand}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResultItem value={card.number} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};