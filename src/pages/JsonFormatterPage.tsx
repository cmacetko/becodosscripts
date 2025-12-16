import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Editor, { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Braces,
    Copy,
    FileJson,
    Minus,
    Trash2,
    CheckCircle2,
    XCircle,
    Upload,
    Download,
    FileCode,
    Settings2,
    Quote,
    Network,
    ArrowRightLeft
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import JsonTreeView from "@/components/JsonTreeView";
import { useTheme } from "next-themes";

const JsonFormatterPage = () => {
    const [input, setInput] = useState("");
    const [formatted, setFormatted] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [indentSize, setIndentSize] = useState("4");
    const [viewMode, setViewMode] = useState("code"); // code, tree
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { theme } = useTheme();

    // Debounce refs
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isTypingRef = useRef(false);

    const getIndent = () => indentSize === 'tab' ? '\t' : Number(indentSize);

    // Core logic: Format text
    const formatText = (text: string, indent: string | number) => {
        try {
            const parsed = JSON.parse(text);
            return JSON.stringify(parsed, null, indent === 'tab' ? '\t' : Number(indent));
        } catch (e) {
            throw e;
        }
    };

    // Handle Left Editor Change (Input)
    const handleInputChange = (value: string | undefined) => {
        const newVal = value || "";
        setInput(newVal);
        isTypingRef.current = true;
        setError(null);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            if (!newVal.trim()) {
                setFormatted("");
                isTypingRef.current = false;
                return;
            }
            try {
                // Try to format
                const pretty = formatText(newVal, indentSize);
                setFormatted(pretty);
                setError(null);
            } catch (err) {
                setError((err as Error).message);
                // On error, we might want to still show something in the right pane? 
                // Monaco handles invalid JSON gracefully by just showing text, 
                // but here 'formatted' is our controlled value for the right pane.
                // If we don't update 'formatted', the right pane stays stale.
                // Let's silently ignore or maybe setFormatted(newVal) so it mirrors?
                // Mirrors is better for "Realtime" feel even if invalid.
                // But we want to show it's invalid.
                // Let's keep previous valid state or clear it?
                // The user requested "Real time correction". 
                // Usually if invalid, tools show the error but don't break the right view.
            }
            isTypingRef.current = false;
        }, 500);
    };

    // Handle Right Editor Change (Output/Formatted)
    const handleOutputChange = (value: string | undefined) => {
        // If we are typing in the right editor, we want to sync back to left?
        // But only if the user initiated it, not if it came from automatic update.
        // We use a flag or check if values differ significantly?
        // Actually, Monaco's onChange is triggered by setValue too? No, usually only user.
        // @monaco-editor/react onChange is triggered by user changes usually? 
        // Let's verify. The documentation says "invoked when editor value is changed" 
        // but if we control "value" prop, does typing trigger it? Yes.

        // Simpler for now: "Bidirectional" often implies if I fix a typo in Right, Left gets updated.
        if (isTypingRef.current) return; // Ignore if we are currently syncing from left

        const newVal = value || "";
        setFormatted(newVal);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            // In reverse, we just take the text and put it in input?
            // Or we try to minify it? Usually we just put it raw.
            setInput(newVal);

            // Validate just to show error status
            try {
                JSON.parse(newVal);
                setError(null);
            } catch (err) {
                setError((err as Error).message);
            }
        }, 500);
    };


    const triggerFormat = () => {
        if (!input.trim()) return;
        try {
            const pretty = formatText(input, indentSize);
            setFormatted(pretty);
            setInput(input); // Ensure sync
            setError(null);
            toast.success("JSON formatado!");
        } catch (err) {
            setError((err as Error).message);
            toast.error("JSON inválido.");
        }
    };

    const triggerMinify = () => {
        if (!input.trim()) return;
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setFormatted(minified);
            // We usually want input to match or stay as is?
            // If bidirectional, let's keep input as is (maybe pretty), and output minified.
            // But if user edits output, input will become minified.
            setError(null);
            toast.success("Minificado!");
        } catch (err) {
            setError((err as Error).message);
            toast.error("JSON inválido.");
        }
    };

    const escapeJson = () => {
        if (!input.trim()) return;
        try {
            const escaped = JSON.stringify(input);
            setFormatted(escaped);
            setError(null);
            toast.success("JSON escapado!");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const unescapeJson = () => {
        if (!input.trim()) return;
        try {
            let unescaped = input;
            if (input.startsWith('"') && input.endsWith('"')) {
                try {
                    const parsed = JSON.parse(input);
                    if (typeof parsed === 'string') unescaped = parsed;
                } catch { }
            }

            // Try to parse recursive escaped json
            try {
                const obj = JSON.parse(unescaped);
                unescaped = JSON.stringify(obj, null, getIndent());
            } catch { }

            setFormatted(unescaped);
            setError(null);
            toast.success("JSON desescapado!");
        } catch (err) {
            setError((err as Error).message);
            toast.error("Erro ao realizar unescape.");
        }
    };

    // Helper: Parse error location
    const getErrorDetails = (errorMessage: string, source: string) => {
        const match = errorMessage.match(/position (\d+)/);
        if (match && match[1]) {
            const pos = parseInt(match[1], 10);
            const lines = source.substring(0, pos).split('\n');
            const line = lines.length;
            const col = lines[lines.length - 1].length + 1;
            return { line, col, pos };
        }
        return null;
    };

    const clearAll = () => {
        setInput("");
        setFormatted("");
        setError(null);
        toast.info("Limpo");
    };

    const loadSample = () => {
        const sample = {
            "projeto": "BecodosScripts",
            "versao": 1.0,
            "ativo": true,
            "tags": ["dev", "tools", "react"],
            "autor": {
                "nome": "Desenvolvedor",
                "email": null
            },
            "metricas": {
                "views": 1500,
                "score": 98.5
            }
        };
        const sampleStr = JSON.stringify(sample, null, Number(indentSize) || 4);
        setInput(sampleStr);
        setFormatted(sampleStr);
        setError(null);
        toast.success("Exemplo carregado");
    };

    // ... helpers file upload/download/copy ...
    const copyToClipboard = () => {
        navigator.clipboard.writeText(formatted);
        toast.success("Copiado!");
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setInput(content);
            // Trigger auto format immediately
            try {
                const pretty = formatText(content, indentSize);
                setFormatted(pretty);
                setError(null);
            } catch (err) {
                // ignore, just set input
                setError((err as Error).message);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const handleDownload = () => {
        if (!formatted && !input) return;

        const content = formatted || input;
        const blob = new Blob([content], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Download iniciado");
    };

    // Editor Options
    const editorOptions = {
        minimap: { enabled: false },
        fontSize: 13,
        wordWrap: 'on' as const,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
        fontLigatures: true,
        formatOnPaste: false,
        formatOnType: false,
    };

    return (
        <div className="w-full h-[calc(100vh-100px)] flex flex-col space-y-4 animate-fade-in p-4 max-w-none">
            <Helmet>
                <title>Formatador JSON Avançado - BecodosScripts</title>
                <meta name="description" content="Editor JSON avançado com split-view, diff, tree view e formatação em tempo real." />
            </Helmet>

            {/* Toolbar */}
            <header className="flex flex-wrap items-center justify-between gap-4 p-2 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-center gap-2">
                    <FileJson className="h-6 w-6 text-primary mr-2" />
                    <h1 className="text-lg font-bold tracking-tight hidden md:block">
                        JSON Studio
                    </h1>
                    <div className="h-6 w-px bg-border mx-2 hidden md:block" />

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".json,.txt"
                    />
                    <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} title="Carregar Arquivo">
                        <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={loadSample} title="Carregar Exemplo">
                        <FileCode className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground hover:text-destructive" title="Limpar Tudo">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2 flex-grow justify-center">
                    <Select value={indentSize} onValueChange={(v) => {
                        setIndentSize(v);
                        if (input) {
                            try { setFormatted(formatText(input, v)); } catch { }
                        }
                    }}>
                        <SelectTrigger className="w-[100px] h-8 text-xs">
                            <SelectValue placeholder="Indent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2 Spaces</SelectItem>
                            <SelectItem value="4">4 Spaces</SelectItem>
                            <SelectItem value="8">8 Spaces</SelectItem>
                            <SelectItem value="tab">Tab</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button onClick={triggerFormat} size="sm" className="h-8">
                        <Braces className="mr-2 h-3.5 w-3.5" />
                        Format
                    </Button>
                    <Button onClick={triggerMinify} variant="secondary" size="sm" className="h-8">
                        <Minus className="mr-2 h-3.5 w-3.5" />
                        Minify
                    </Button>

                    <div className="h-6 w-px bg-border mx-2 hidden md:block" />

                    <Button onClick={escapeJson} variant="outline" size="icon" className="h-8 w-8" title="Escape JSON">
                        <Quote className="h-3.5 w-3.5" />
                    </Button>
                    <Button onClick={unescapeJson} variant="outline" size="icon" className="h-8 w-8" title="Unescape JSON">
                        <Network className="h-3.5 w-3.5" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    {error ? (
                        <span className="text-xs text-destructive font-medium flex items-center gap-1 bg-destructive/10 px-2 py-1 rounded">
                            <XCircle className="h-3.5 w-3.5" /> Inválido
                        </span>
                    ) : (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Válido
                        </span>
                    )}
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8" title="Copiar Resultado">
                        <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} className="h-8" title="Baixar JSON">
                        <Download className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </header>

            {/* Main Editor Area */}
            <div className="grid lg:grid-cols-2 gap-4 flex-grow min-h-0">

                {/* Left Pane (Source) */}
                <div className="flex flex-col h-full border rounded-md overflow-hidden bg-background">
                    <div className="bg-muted/50 px-3 py-1.5 border-b flex items-center justify-between text-xs font-medium text-muted-foreground">
                        <span>Entrada (Raw)</span>
                        <span>{input.length} chars</span>
                    </div>
                    <div className="flex-grow relative">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            theme="vs-dark"
                            value={input}
                            onChange={handleInputChange}
                            options={editorOptions}
                            loading={<div className="p-4 text-muted-foreground text-sm">Carregando editor...</div>}
                        />
                    </div>
                </div>

                {/* Right Pane (Output) */}
                <div className="flex flex-col h-full border rounded-md overflow-hidden bg-background">
                    <Tabs value={viewMode} onValueChange={setViewMode} className="flex flex-col h-full">
                        <div className="bg-muted/50 px-2 py-1 border-b flex items-center justify-between">
                            <TabsList className="h-7">
                                <TabsTrigger value="code" className="text-xs px-3 h-6">Código</TabsTrigger>
                                <TabsTrigger value="tree" className="text-xs px-3 h-6">Árvore</TabsTrigger>
                            </TabsList>
                            <span className="text-xs text-muted-foreground font-medium px-2">{formatted.length} chars</span>
                        </div>

                        <TabsContent value="code" className="flex-grow m-0 p-0 relative h-full">
                            {error && (
                                <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm p-4 flex flex-col items-center justify-center text-destructive animate-in fade-in duration-200">
                                    <div className="max-w-md w-full space-y-3 bg-muted/50 p-6 rounded-lg border border-destructive/20 shadow-lg relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive" />

                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                                                <XCircle className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">JSON Inválido</h4>
                                                <span className="text-xs text-muted-foreground">Corrija os erros para visualizar o resultado</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="font-mono text-sm break-words bg-background p-3 rounded border text-destructive">
                                                {error}
                                            </p>

                                            {(() => {
                                                const details = getErrorDetails(error, input);
                                                if (details) {
                                                    return (
                                                        <div className="text-xs text-muted-foreground flex items-center gap-2 pl-1 pt-1">
                                                            <span>Linha {details.line}</span>
                                                            <span className="w-1 h-1 rounded-full bg-border" />
                                                            <span>Coluna {details.col}</span>
                                                            <span className="w-1 h-1 rounded-full bg-border" />
                                                            <button
                                                                className="text-primary hover:underline"
                                                                onClick={() => {
                                                                    // We could try to scroll to line here if we had ref to editor
                                                                }}
                                                            >
                                                                Ver localização
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })()}
                                        </div>

                                    </div>
                                </div>
                            )}
                            <Editor
                                height="100%"
                                defaultLanguage="json"
                                theme="vs-dark"
                                value={formatted}
                                onChange={handleOutputChange}
                                options={{ ...editorOptions, readOnly: false }} // Editable as requested
                                loading={<div className="p-4 text-muted-foreground text-sm">Carregando editor...</div>}
                            />
                        </TabsContent>
                        <TabsContent value="tree" className="flex-grow m-0 p-0 overflow-auto h-full bg-background/50">
                            {error ? (
                                <div className="p-8 text-center text-destructive">
                                    <XCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p>Corrija o JSON para visualizar a árvore.</p>
                                </div>
                            ) : (
                                <div className="p-4">
                                    <JsonTreeView data={formatted ? JSON.parse(formatted) : {}} />
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default JsonFormatterPage;
