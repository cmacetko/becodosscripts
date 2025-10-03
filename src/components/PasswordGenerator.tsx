import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { generatePassword } from "@/lib/generators";
import { ResultItem } from "./ResultItem";

export const PasswordGenerator = () => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [options, setOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const handleGenerate = () => {
    if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
        setPasswords([]);
        return;
    }
    const newPasswords = Array.from({ length: 12 }, () => generatePassword(options));
    setPasswords(newPasswords);
  };

  useEffect(() => {
    handleGenerate(); // Gera 12 senhas na montagem do componente
  }, [options]); // Regenera se as opções de senha mudarem

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="length">Password Length</Label>
            <span className="text-sm font-medium">{options.length}</span>
          </div>
          <Slider
            id="length"
            min={8}
            max={64}
            step={1}
            value={[options.length]}
            onValueChange={(value) => setOptions({ ...options, length: value[0] })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="uppercase"
              checked={options.uppercase}
              onCheckedChange={(checked) => setOptions({ ...options, uppercase: checked })}
            />
            <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="lowercase"
              checked={options.lowercase}
              onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
            />
            <Label htmlFor="lowercase">Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="numbers"
              checked={options.numbers}
              onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
            />
            <Label htmlFor="numbers">Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="symbols"
              checked={options.symbols}
              onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
            />
            <Label htmlFor="symbols">Symbols (!@#...)</Label>
          </div>
        </div>
      </div>
      <Button onClick={handleGenerate} className="w-full sm:w-auto">Generate Passwords</Button>
      {passwords.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {passwords.map((password, index) => (
            <ResultItem key={index} value={password} />
          ))}
        </div>
      )}
    </div>
  );
};