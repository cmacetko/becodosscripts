import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import QRCode from "react-qr-code";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Download, Link as LinkIcon, Wifi, Type } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const QrCodeGeneratorPage = () => {
    const [text, setText] = useState("https://becodosscripts.com");
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [encryption, setEncryption] = useState("WPA");
    const [activeTab, setActiveTab] = useState("text");
    const svgRef = useRef<SVGSVGElement>(null);

    const getQrValue = () => {
        if (activeTab === "wifi") {
            return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        }
        return text;
    };

    const downloadQrCode = (format: 'png' | 'svg') => {
        const svg = svgRef.current;
        if (!svg) return;

        if (format === 'svg') {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "qrcode.svg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();

            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const pngUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = pngUrl;
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            };
            img.src = url;
        }
        toast.success(`QR Code baixado como ${format.toUpperCase()}`);
    };

    return (
        <div className="w-full max-w-none mx-auto space-y-8 animate-fade-in">
            <Helmet>
                <title>Gerador de QR Code - BecodosScripts</title>
                <meta name="description" content="Crie QR Codes personalizados para links, textos ou redes Wi-Fi gratuitamente. Baixe em formato PNG ou SVG." />
            </Helmet>

            <header className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
                    <QrCode className="h-10 w-10 text-primary" />
                    Gerador de QR Code
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Gere códigos QR instantâneos para compartilhar informações facilmente.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="text" className="gap-2">
                                <LinkIcon className="h-4 w-4" /> Texto / URL
                            </TabsTrigger>
                            <TabsTrigger value="wifi" className="gap-2">
                                <Wifi className="h-4 w-4" /> Wi-Fi
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="text" className="space-y-4 mt-6">
                            <div className="space-y-2">
                                <Label htmlFor="text-content">Conteúdo (URL ou Texto)</Label>
                                <Input
                                    id="text-content"
                                    placeholder="Digite um link ou texto..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="h-12"
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="wifi" className="space-y-4 mt-6">
                            <div className="space-y-2">
                                <Label htmlFor="wifi-ssid">Nome da Rede (SSID)</Label>
                                <Input
                                    id="wifi-ssid"
                                    placeholder="Nome da sua rede Wi-Fi"
                                    value={ssid}
                                    onChange={(e) => setSsid(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="wifi-password">Senha</Label>
                                <Input
                                    id="wifi-password"
                                    type="password"
                                    placeholder="Senha da rede"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="wifi-encryption">Criptografia</Label>
                                <select
                                    id="wifi-encryption"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={encryption}
                                    onChange={(e) => setEncryption(e.target.value)}
                                >
                                    <option value="WPA">WPA/WPA2</option>
                                    <option value="WEP">WEP</option>
                                    <option value="nopass">Sem Senha</option>
                                </select>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    <Card className="p-6 bg-white w-fit mx-auto shadow-lg border-2 border-primary/10">
                        <div className="bg-white p-2">
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={getQrValue()}
                                viewBox={`0 0 256 256`}
                                ref={svgRef as any}
                            />
                        </div>
                    </Card>

                    <div className="flex gap-4 w-full max-w-xs">
                        <Button
                            className="flex-1"
                            variant="default"
                            onClick={() => downloadQrCode('png')}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            PNG
                        </Button>
                        <Button
                            className="flex-1"
                            variant="outline"
                            onClick={() => downloadQrCode('svg')}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            SVG
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCodeGeneratorPage;
