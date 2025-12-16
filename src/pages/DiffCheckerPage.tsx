import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { diffChars, diffWords, diffLines } from "diff";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ArrowRightLeft, Copy, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DiffCheckerPage = () => {
    const [original, setOriginal] = useState("");
    const [modified, setModified] = useState("");
    const [diffMode, setDiffMode] = useState<"chars" | "words" | "lines">("lines");

    const getDiff = () => {
        if (!original && !modified) return [];

        switch (diffMode) {
            case "chars":
                return diffChars(original, modified);
            case "words":
                return diffWords(original, modified);
            case "lines":
                return diffLines(original, modified);
            default:
                return diffLines(original, modified);
        }
    };

    const diffs = getDiff();

    const clearAll = () => {
        setOriginal("");
        setModified("");
        toast.info("Campos limpos");
    };

    const copyResult = () => {
        // Copy functionality is a bit tricky for diffs, maybe just copy the modified text?
        // Or maybe a text representation of the diff?
        // Let's copy the modified text for now as "result"
        navigator.clipboard.writeText(modified);
        toast.success("Texto modificado copiado para a área de transferência");
    };

    return (
        <div className="w-full max-w-none mx-auto space-y-8 animate-fade-in">
            <Helmet>
                <title>Comparador de Texto (Diff Checker) - BecodosScripts</title>
                <meta name="description" content="Compare dois textos e encontre as diferenças entre eles. Suporta comparação por caracteres, palavras ou linhas." />
            </Helmet>

            <header className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Comparador de Texto (Diff Checker)</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Cole o texto original e o texto modificado para visualizar as alterações.
                </p>
            </header>

            <div className="flex justify-center">
                <Tabs value={diffMode} onValueChange={(v) => setDiffMode(v as any)} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="lines">Linhas</TabsTrigger>
                        <TabsTrigger value="words">Palavras</TabsTrigger>
                        <TabsTrigger value="chars">Caracteres</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="original">Texto Original</Label>
                    <Textarea
                        id="original"
                        placeholder="Cole o texto original aqui..."
                        className="min-h-[300px] font-mono text-sm resize-y"
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="modified">Texto Modificado</Label>
                    <Textarea
                        id="modified"
                        placeholder="Cole o texto modificado aqui..."
                        className="min-h-[300px] font-mono text-sm resize-y"
                        value={modified}
                        onChange={(e) => setModified(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Button variant="destructive" onClick={clearAll}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpar Tudo
                </Button>
            </div>

            {(original || modified) && (
                <Card className="animate-in fade-in zoom-in-95 duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ArrowRightLeft className="h-5 w-5 text-primary" />
                            Resultado da Comparação
                        </CardTitle>
                        <CardDescription>
                            Vermelho indica remoção, verde indica adição.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted/30 p-4 rounded-md font-mono text-sm whitespace-pre-wrap break-all border overflow-auto max-h-[600px]">
                            {diffs.map((part, index) => (
                                <span
                                    key={index}
                                    className={cn(
                                        part.added ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 decoration-clone py-0.5 rounded-[1px]" :
                                            part.removed ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 decoration-clone py-0.5 rounded-[1px] line-through decoration-red-500/50" :
                                                "text-foreground"
                                    )}
                                >
                                    {part.value}
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default DiffCheckerPage;
