import {
    FileCode,
    Building,
    KeyRound,
    CreditCard,
    BookOpenText,
    FileText,
    ScrollText,
    Binary,
    CodeXml,
    Fingerprint,
    Braces,
    QrCode,
    Shield,
    ArrowRightLeft,
    Type
} from "lucide-react";

export type ToolCategory = "Development" | "Security" | "Text" | "Legal" | "Documents";

export interface Tool {
    title: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    category: ToolCategory;
}

export const tools: Tool[] = [
    // Documents
    {
        title: "Gerador de CPF",
        description: "Gere números de CPF válidos para testes.",
        path: "/cpf-generator",
        icon: <FileCode className="h-5 w-5" />,
        category: "Documents"
    },
    {
        title: "Gerador de CNPJ",
        description: "Gere números de CNPJ válidos para testes.",
        path: "/cnpj-generator",
        icon: <Building className="h-5 w-5" />,
        category: "Documents"
    },
    {
        title: "Cartão de Crédito",
        description: "Gere números de cartão de crédito para testes.",
        path: "/credit-card-generator",
        icon: <CreditCard className="h-5 w-5" />,
        category: "Documents"
    },

    // Security
    {
        title: "Gerador de Senhas",
        description: "Crie senhas fortes e seguras.",
        path: "/password-generator",
        icon: <KeyRound className="h-5 w-5" />,
        category: "Security"
    },
    {
        title: "Decodificador JWT",
        description: "Decodifique e inspecione tokens JWT.",
        path: "/jwt-decoder",
        icon: <Shield className="h-5 w-5" />,
        category: "Security"
    },
    {
        title: "Gerador de UUID",
        description: "Gere UUIDs versão 4 únicos.",
        path: "/uuid-generator",
        icon: <Fingerprint className="h-5 w-5" />,
        category: "Security"
    },

    // Development
    {
        title: "Formatador JSON",
        description: "Formate e valide código JSON.",
        path: "/json-formatter",
        icon: <Braces className="h-5 w-5" />,
        category: "Development"
    },
    {
        title: "Diff Checker",
        description: "Compare textos e encontre diferenças.",
        path: "/diff-checker",
        icon: <ArrowRightLeft className="h-5 w-5" />,
        category: "Development"
    },
    {
        title: "Gerador de QR Code",
        description: "Crie QR Codes para diversos fins.",
        path: "/qrcode-generator",
        icon: <QrCode className="h-5 w-5" />,
        category: "Development"
    },
    {
        title: "Conversor Base64",
        description: "Codifique e decodifique em Base64.",
        path: "/base64-converter",
        icon: <Binary className="h-5 w-5" />,
        category: "Development"
    },

    // Text
    {
        title: "Lorem Ipsum",
        description: "Gere texto de preenchimento.",
        path: "/lorem-ipsum-generator",
        icon: <BookOpenText className="h-5 w-5" />,
        category: "Text"
    },
    {
        title: "HTML Entities",
        description: "Codifique/Decodifique entidades HTML.",
        path: "/html-entities-converter",
        icon: <CodeXml className="h-5 w-5" />,
        category: "Text"
    },
    {
        title: "Conversor UTF-8",
        description: "Corrija codificação de texto.",
        path: "/utf8-converter",
        icon: <Type className="h-5 w-5" />,
        category: "Text"
    },

    // Legal
    {
        title: "Política de Privacidade",
        description: "Gere políticas de privacidade básicas.",
        path: "/privacy-policy-generator",
        icon: <FileText className="h-5 w-5" />,
        category: "Legal"
    },
    {
        title: "Termos e Condições",
        description: "Gere termos de uso básicos.",
        path: "/terms-and-conditions-generator",
        icon: <ScrollText className="h-5 w-5" />,
        category: "Legal"
    },
];
