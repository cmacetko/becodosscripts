import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Layout } from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const DiffCheckerPage = lazy(() => import("./pages/DiffCheckerPage"));
const JsonFormatterPage = lazy(() => import("./pages/JsonFormatterPage"));
const QrCodeGeneratorPage = lazy(() => import("./pages/QrCodeGeneratorPage"));
const JwtDecoderPage = lazy(() => import("./pages/JwtDecoderPage"));
const Base64ConverterPage = lazy(() => import("./pages/Base64ConverterPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CpfGeneratorPage = lazy(() => import("./pages/CpfGeneratorPage"));
const CnpjGeneratorPage = lazy(() => import("./pages/CnpjGeneratorPage"));
const PasswordGeneratorPage = lazy(() => import("./pages/PasswordGeneratorPage"));
const CreditCardGeneratorPage = lazy(() => import("./pages/CreditCardGeneratorPage"));
const LoremIpsumGeneratorPage = lazy(() => import("./pages/LoremIpsumGeneratorPage"));
const PrivacyPolicyGeneratorPage = lazy(() => import("./pages/PrivacyPolicyGeneratorPage"));
const TermsAndConditionsGeneratorPage = lazy(() => import("./pages/TermsAndConditionsGeneratorPage"));
const Utf8ConverterPage = lazy(() => import("./pages/Utf8ConverterPage"));
const HtmlEntitiesConverterPage = lazy(() => import("./pages/HtmlEntitiesConverterPage"));
const UuidGeneratorPage = lazy(() => import("./pages/UuidGeneratorPage"));

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <HelmetProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Index />} />
                                <Route path="/diff-checker" element={<DiffCheckerPage />} />
                                <Route path="/json-formatter" element={<JsonFormatterPage />} />
                                <Route path="/qrcode-generator" element={<QrCodeGeneratorPage />} />
                                <Route path="/jwt-decoder" element={<JwtDecoderPage />} />
                                <Route path="/base64-converter" element={<Base64ConverterPage />} />
                                <Route path="/cpf-generator" element={<CpfGeneratorPage />} />
                                <Route path="/cnpj-generator" element={<CnpjGeneratorPage />} />
                                <Route path="/password-generator" element={<PasswordGeneratorPage />} />
                                <Route path="/credit-card-generator" element={<CreditCardGeneratorPage />} />
                                <Route path="/lorem-ipsum-generator" element={<LoremIpsumGeneratorPage />} />
                                <Route path="/privacy-policy-generator" element={<PrivacyPolicyGeneratorPage />} />
                                <Route path="/terms-and-conditions-generator" element={<TermsAndConditionsGeneratorPage />} />
                                <Route path="/utf8-converter" element={<Utf8ConverterPage />} />
                                <Route path="/html-entities-converter" element={<HtmlEntitiesConverterPage />} />
                                <Route path="/uuid-generator" element={<UuidGeneratorPage />} />
                                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </ThemeProvider>
        </HelmetProvider>
    </QueryClientProvider>
);

export default App;