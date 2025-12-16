import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { generatePassword } from "@/lib/generators";
import { ResultItem } from "./ResultItem";
import { showError } from "@/utils/toast";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const PasswordGenerator = () => {
    const [passwords, setPasswords] = useState<string[]>([]);
    const [options, setOptions] = useLocalStorage("password-generator-options", {
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        excludeAmbiguous: false,
    });

    const handleGenerate = () => {
        if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
            setPasswords([]);
            showError("Selecione pelo menos um tipo de caractere para gerar a senha.");
            return;
        }
        const newPasswords = Array.from({ length: 12 }, () => generatePassword(options));
        setPasswords(newPasswords);
    };

    useEffect(() => {
        handleGenerate();
    }, [options]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="length">Comprimento da Senha</Label>
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
                        <Label htmlFor="uppercase">Maiúsculas (A-Z)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="lowercase"
                            checked={options.lowercase}
                            onCheckedChange={(checked) => setOptions({ ...options, lowercase: checked })}
                        />
                        <Label htmlFor="lowercase">Minúsculas (a-z)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="numbers"
                            checked={options.numbers}
                            onCheckedChange={(checked) => setOptions({ ...options, numbers: checked })}
                        />
                        <Label htmlFor="numbers">Números (0-9)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="symbols"
                            checked={options.symbols}
                            onCheckedChange={(checked) => setOptions({ ...options, symbols: checked })}
                        />
                        <Label htmlFor="symbols">Símbolos (!@#...)</Label>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                        <Switch
                            id="excludeAmbiguous"
                            checked={options.excludeAmbiguous}
                            onCheckedChange={(checked) => setOptions({ ...options, excludeAmbiguous: checked })}
                        />
                        <Label htmlFor="excludeAmbiguous" className="cursor-pointer">Excluir caracteres ambíguos (I, l, 1, 0, O)</Label>
                    </div>
                </div>
            </div>
            <Button onClick={handleGenerate} className="w-full sm:w-auto">Gerar Senhas</Button>
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