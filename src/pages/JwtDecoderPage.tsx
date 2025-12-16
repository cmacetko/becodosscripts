import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const JwtDecoderPage = () => {
    const [token, setToken] = useState("");
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isExpired, setIsExpired] = useState<boolean | null>(null);

    useEffect(() => {
        if (!token.trim()) {
            setHeader(null);
            setPayload(null);
            setError(null);
            setIsExpired(null);
            return;
        }

        try {
            // Decode payload
            const decodedPayload = jwtDecode(token);
            setPayload(decodedPayload);

            // Decode header manually since jwt-decode mainly gives payload
            const parts = token.split('.');
            if (parts.length === 3) {
                const headerDecoded = JSON.parse(atob(parts[0]));
                setHeader(headerDecoded);
            } else {
                setHeader({ warning: "Could not parse header separately" });
            }

            // Check expiration
            if (decodedPayload.exp) {
                const expirationDate = new Date(decodedPayload.exp * 1000);
                setIsExpired(expirationDate < new Date());
            } else {
                setIsExpired(null);
            }

            setError(null);
        } catch (err) {
            setError("Token JWT inválido");
            setHeader(null);
            setPayload(null);
            setIsExpired(null);
        }
    }, [token]);

    const formatJson = (data: any) => {
        return JSON.stringify(data, null, 4);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <Helmet>
                <title>Decodificador JWT - BecodosScripts</title>
                <meta name="description" content="Decodifique e inspecione tokens JWT (JSON Web Tokens) de forma segura no seu navegador. Visualize header, payload e status de expiração." />
            </Helmet>

            <header className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
                    <Shield className="h-10 w-10 text-primary" />
                    Decodificador JWT
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Cole seu JWT abaixo para decodificar. A decodificação é feita localmente no seu navegador.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="jwt-input">Token JWT Encode</Label>
                        <Textarea
                            id="jwt-input"
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            className="font-mono text-sm min-h-[400px] resize-y"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Status Card */}
                    {payload && (
                        <Card className={cn(
                            "border-l-4 transition-all duration-300",
                            isExpired ? "border-l-destructive" : isExpired === false ? "border-l-green-600" : "border-l-primary"
                        )}>
                            <CardContent className="pt-6 flex items-start gap-4">
                                {isExpired ? (
                                    <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
                                ) : isExpired === false ? (
                                    <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                                ) : (
                                    <Clock className="h-6 w-6 text-primary shrink-0" />
                                )}
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {isExpired ? "Token Expirado" : isExpired === false ? "Token Válido (Ativo)" : "Sem Expiração Definida"}
                                    </h3>
                                    {payload.exp && (
                                        <p className="text-muted-foreground text-sm mt-1">
                                            Expira em: {format(new Date(payload.exp * 1000), "PPpp", { locale: ptBR })}
                                        </p>
                                    )}
                                    {payload.iat && (
                                        <p className="text-muted-foreground text-sm">
                                            Emitido em: {format(new Date(payload.iat * 1000), "PPpp", { locale: ptBR })}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {!payload && !error && (
                        <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground opacity-50 space-y-2 border rounded-md bg-muted/30">
                            <Shield className="h-16 w-16 stroke-1" />
                            <p>O conteúdo decodificado aparecerá aqui</p>
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center justify-center h-[400px] text-destructive space-y-2 border border-destructive/20 rounded-md bg-destructive/5">
                            <AlertTriangle className="h-16 w-16 stroke-1" />
                            <p>{error}</p>
                        </div>
                    )}

                    {header && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                            <Label className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Header</Label>
                            <pre className="bg-muted/50 p-4 rounded-md text-sm font-mono overflow-auto border">
                                {formatJson(header)}
                            </pre>
                        </div>
                    )}

                    {payload && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                            <Label className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Payload</Label>
                            <pre className="bg-muted/50 p-4 rounded-md text-sm font-mono overflow-auto border text-primary">
                                {formatJson(payload)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JwtDecoderPage;
