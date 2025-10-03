import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Ferramentas", path: "/" }, // Novo item de menu
    { name: "Gerador de CPF", path: "/cpf-generator" },
    { name: "Gerador de CNPJ", path: "/cnpj-generator" },
    { name: "Gerador de Senhas", path: "/password-generator" },
    { name: "Gerador de Cartão de Crédito", path: "/credit-card-generator" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="mr-4 flex items-center">
          <span className="font-bold text-lg">Beco dos Scripts</span>
        </Link>

        {/* Navegação para Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              asChild
            >
              <Link
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Navegação para Mobile */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Alternar Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px] sm:w-[240px]">
            <Link to="/" className="flex items-center mb-6" onClick={() => setIsSheetOpen(false)}>
              <span className="font-bold text-lg">Beco dos Scripts</span>
            </Link>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  onClick={() => setIsSheetOpen(false)}
                  asChild
                  className="justify-start"
                >
                  <Link to={item.path}>{item.name}</Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};