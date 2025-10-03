import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsSheetOpen(false); // Fecha o sheet ao selecionar uma aba
  };

  const navItems = [
    { name: "CPF Generator", value: "cpf" },
    { name: "CNPJ Generator", value: "cnpj" },
    { name: "Password Generator", value: "password" },
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
              key={item.value}
              variant={activeTab === item.value ? "secondary" : "ghost"}
              onClick={() => handleTabClick(item.value)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activeTab === item.value ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Button>
          ))}
        </nav>

        {/* Navegação para Mobile */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px] sm:w-[240px]">
            <Link to="/" className="flex items-center mb-6">
              <span className="font-bold text-lg">Beco dos Scripts</span>
            </Link>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant={activeTab === item.value ? "secondary" : "ghost"}
                  onClick={() => handleTabClick(item.value)}
                  className="justify-start"
                >
                  {item.name}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};