import * as React from "react";
import {
    Calculator,
    CreditCard,
    FileText,
    Fingerprint,
    Search,
    User,
    KeyRound,
    Building,
    BookOpenText,
    ScrollText,
    Binary,
    CodeXml,
    QrCode,
    Braces,
    Shield,
    Palette,
    Diff,
    FileCode
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

export function GlobalCommandPalette() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    const tools = [
        {
            group: "Geradores",
            items: [
                { title: "Gerador de CPF", icon: User, path: "/cpf-generator" },
                { title: "Gerador de CNPJ", icon: Building, path: "/cnpj-generator" },
                { title: "Gerador de Senhas", icon: KeyRound, path: "/password-generator" },
                { title: "Gerador de Cartão de Crédito", icon: CreditCard, path: "/credit-card-generator" },
                { title: "Gerador de UUID", icon: Fingerprint, path: "/uuid-generator" },
                { title: "Gerador de Lorem Ipsum", icon: BookOpenText, path: "/lorem-ipsum-generator" },
                { title: "Gerador de Política de Privacidade", icon: FileText, path: "/privacy-policy-generator" },
                { title: "Gerador de Termos e Condições", icon: ScrollText, path: "/terms-and-conditions-generator" },
            ]
        },
        {
            group: "Conversores & Utilitários",
            items: [
                { title: "Conversor UTF-8", icon: Binary, path: "/utf8-converter" },
                { title: "Conversor Base64", icon: Binary, path: "/base64-converter" },
                { title: "HTML Entities", icon: CodeXml, path: "/html-entities-converter" },
                { title: "Formatador JSON", icon: Braces, path: "/json-formatter" },
                { title: "Decodificador JWT", icon: Shield, path: "/jwt-decoder" },
                { title: "Diff Checker", icon: Diff, path: "/diff-checker" },
            ]
        },
        {
            group: "Outros",
            items: [
                { title: "Gerador de QR Code", icon: QrCode, path: "/qrcode-generator" },
                //{ title: "Conversor de Cores", icon: Palette, path: "/color-converter" },
            ]
        }
    ];

    return (
        <>
            <div
                className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md bg-muted/80 backdrop-blur-sm px-3 py-1.5 text-xs text-muted-foreground border shadow-sm cursor-pointer hover:bg-muted transition-colors md:hidden"
                onClick={() => setOpen(true)}
            >
                <Search className="h-3 w-3" />
                <span>Buscar...</span>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Digite uma ferramenta ou comando..." />
                <CommandList>
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                    {tools.map((group) => (
                        <React.Fragment key={group.group}>
                            <CommandGroup heading={group.group}>
                                {group.items.map((tool) => (
                                    <CommandItem
                                        key={tool.title}
                                        value={tool.title}
                                        onSelect={() => {
                                            runCommand(() => navigate(tool.path));
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <tool.icon className="mr-2 h-4 w-4" />
                                        <span>{tool.title}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            <CommandSeparator />
                        </React.Fragment>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    );
}
