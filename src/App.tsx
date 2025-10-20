import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CpfGeneratorPage from "./pages/CpfGeneratorPage";
import CnpjGeneratorPage from "./pages/CnpjGeneratorPage";
import PasswordGeneratorPage from "./pages/PasswordGeneratorPage";
import CreditCardGeneratorPage from "./pages/CreditCardGeneratorPage";
import LoremIpsumGeneratorPage from "./pages/LoremIpsumGeneratorPage";
import PrivacyPolicyGeneratorPage from "./pages/PrivacyPolicyGeneratorPage";
import TermsAndConditionsGeneratorPage from "./pages/TermsAndConditionsGeneratorPage";
import Utf8ConverterPage from "./pages/Utf8ConverterPage"; // New import
import { GtmPageViewTracker } from "./components/GtmPageViewTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GtmPageViewTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cpf-generator" element={<CpfGeneratorPage />} />
          <Route path="/cnpj-generator" element={<CnpjGeneratorPage />} />
          <Route path="/password-generator" element={<PasswordGeneratorPage />} />
          <Route path="/credit-card-generator" element={<CreditCardGeneratorPage />} />
          <Route path="/lorem-ipsum-generator" element={<LoremIpsumGeneratorPage />} />
          <Route path="/privacy-policy-generator" element={<PrivacyPolicyGeneratorPage />} />
          <Route path="/terms-and-conditions-generator" element={<TermsAndConditionsGeneratorPage />} />
          <Route path="/utf8-converter" element={<Utf8ConverterPage />} /> {/* New Route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;