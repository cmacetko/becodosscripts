import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Braces, Copy, FileJson, Minus, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const JsonFormatterPage = () => {
    const [input, setInput] = useState("");
    const [formatted, setFormatted] = useState("");
    const [error, setError] = useState<string | null>(null);

    const formatJson = () => {
        if (!input.trim()) {
            setFormatted("");
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const pretty = JSON.stringify(parsed, null, 4);
            setFormatted(pretty);
            setError(null);
            toast.success("JSON formatado com sucesso!");
        } catch (err) {
            setError((err as Error).message);
            setFormatted("");
            toast.error("JSON inválido. Verifique a sintaxe.");
        }
    };

    const minifyJson = () => {
        if (!input.trim()) return;

        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setFormatted(minified);
            setError(null);
            toast.success("JSON minificado com sucesso!");
        } catch (err) {
            setError((err as Error).message);
            setFormatted("");
            toast.error("JSON inválido.");
        }
    };

    const copyToClipboard = () => {
        if (!formatted) return;
        navigator.clipboard.writeText(formatted);
        toast.success("Copiado para a área de transferência");
    };

    const clearAll = () => {
        setInput("");
        setFormatted("");
        setError(null);
        toast.info("Limpo");
    };

    return (
        <div className="w-full max-w-none mx-auto space-y-8 animate-fade-in">
            <Helmet>
                <title>Formatador e Validador JSON - BecodosScripts</title>
                <meta name="description" content="Formate, valide e minifique JSON online. Ferramenta gratuita para desenvolvedores com realce de sintaxe e detecção de erros." />
            </Helmet>

            <header className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
                    <FileJson className="h-10 w-10 text-primary" />
                    Formatador JSON
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Cole seu JSON abaixo para formatar, validar ou minificar.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-6 h-full">
                <div className="space-y-4 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="input-json" className="text-lg font-medium">Entrada JSON</Label>
                        <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Limpar
                        </Button>
                    </div>
                    <Textarea
                        id="input-json"
                        placeholder='Cole seu JSON aqui... ex: {"chave": "valor"}'
                        className="flex-grow font-mono text-sm resize-none h-[500px] bg-background"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={formatJson} className="flex-1">
                            <Braces className="mr-2 h-4 w-4" />
                            Formatar (Beautify)
                        </Button>
                        <Button onClick={minifyJson} variant="secondary" className="flex-1">
                            <Minus className="mr-2 h-4 w-4" />
                            Minificar
                        </Button>
                    </div>
                </div>

                <div className="space-y-4 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <Label className="text-lg font-medium">Resultado</Label>
                        {formatted && !error && (
                            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copiar
                            </Button>
                        )}
                    </div>

                    <div className={cn(
                        "flex-grow rounded-md border min-h-[500px] relative overflow-hidden bg-muted/30",
                        error ? "border-destructive/50 bg-destructive/5" : "border-input"
                    )}>
                        {error ? (
                            <div className="p-6 text-destructive flex flex-col items-center justify-center h-full text-center space-y-4">
                                <XCircle className="h-12 w-12 opacity-80" />
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">JSON Inválido</h3>
                                    <p className="font-mono text-sm bg-background/50 p-4 rounded border border-destructive/20 max-w-md break-all">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        ) : formatted ? (
                            <pre className="p-4 overflow-auto max-h-[500px] text-sm font-mono w-full h-full text-foreground">
                                {formatted}
                            </pre>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50 space-y-2">
                                <Braces className="h-16 w-16 stroke-1" />
                                <p>O resultado aparecerá aqui</p>
                            </div>
                        )}

                        {!error && formatted && (
                            <div className="absolute top-2 right-2">
                                <div className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded text-xs font-medium border border-green-500/20 shadow-sm animate-in fade-in slide-in-from-top-1">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Válido
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JsonFormatterPage;
