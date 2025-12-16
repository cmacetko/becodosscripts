import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownAZ, ArrowUpAZ, Copy, FileIcon, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

const Base64ConverterPage = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const handleConvert = () => {
        try {
            if (mode === "encode") {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (e) {
            toast.error("Erro na conversão. Verifique se o texto está correto.");
            setOutput("");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                // result format: "data:image/png;base64,....."
                // We might want to keep the data prefix for CSS/HTML usage
                setOutput(result);
                toast.success("Arquivo convertido para Base64!");
            };
            reader.readAsDataURL(file);
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success("Copiado para a área de transferência");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <Helmet>
                <title>Conversor Base64 - BecodosScripts</title>
                <meta name="description" content="Converta texto e arquivos para Base64 e vice-versa. Ferramenta online gratuita para encode e decode." />
            </Helmet>

            <header className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight">Conversor Base64</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Codifique e decodifique textos ou converta arquivos para Strings Base64.
                </p>
            </header>

            <Tabs defaultValue="encode" onValueChange={(v) => { setMode(v as any); setInput(""); setOutput(""); }} className="w-full">
                <div className="flex justify-center mb-6">
                    <TabsList className="grid w-[400px] grid-cols-2">
                        <TabsTrigger value="encode">Codificar (Encode)</TabsTrigger>
                        <TabsTrigger value="decode">Decodificar (Decode)</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="encode" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Texto para Base64</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Texto Original</Label>
                                <Textarea
                                    placeholder="Digite o texto para codificar..."
                                    value={input}
                                    onChange={(e) => { setInput(e.target.value); if (e.target.value) setOutput(btoa(e.target.value)); else setOutput("") }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Resultado Base64</Label>
                                <div className="relative">
                                    <Textarea
                                        readOnly
                                        value={output}
                                        className="bg-muted font-mono text-xs break-all pr-12"
                                    />
                                    <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyToClipboard}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Arquivo para Base64</CardTitle>
                            <CardDescription>Converta imagens ou documentos para string data URI.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                            <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                <UploadCloud className="h-12 w-12" />
                                <span className="font-medium">Clique para selecionar um arquivo</span>
                            </Label>
                            <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="decode" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Base64 para Texto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>String Base64</Label>
                                <Textarea
                                    placeholder="Cole a string Base64..."
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        try { if (e.target.value) setOutput(atob(e.target.value)); else setOutput("") } catch (err) { setOutput("Texto inválido para decode"); }
                                    }}
                                    className="font-mono text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Resultado Texto</Label>
                                <div className="relative">
                                    <Textarea
                                        readOnly
                                        value={output}
                                        className="bg-muted pr-12"
                                    />
                                    <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={copyToClipboard}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Base64ConverterPage;
