import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";

interface ResultItemProps {
  value: string;
}

export const ResultItem = ({ value }: ResultItemProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    showSuccess(`Copiado "${value}" para a área de transferência!`);
  };

  return (
    <div
      className="flex items-center justify-between p-3 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={handleCopy} // Adicionado onClick ao div principal
    >
      <span className="font-mono text-sm text-gray-300 break-all">{value}</span>
      <Button variant="ghost" size="icon" onClick={handleCopy}>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};