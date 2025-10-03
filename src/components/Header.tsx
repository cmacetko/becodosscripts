"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wrench } from "lucide-react"; // Importando o ícone Wrench
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Ferramentas", path: "/" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="mr-4 flex items-center">
          <Wrench className="h-5 w-5 mr-2" /> {/* Usando o ícone Wrench */}
          <span className="font-bold text-lg">Beco dos Scripts</span>
        </Link>

        {/* Navegação para Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="secondary"
              asChild
            >
              <Link
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors text-foreground hover:text-primary"
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
            <Button variant="secondary" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Alternar Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px] sm:w-[240px]">
            <Link to="/" className="flex items-center mb-6" onClick={() => setIsSheetOpen(false)}>
              <Wrench className="h-5 w-5 mr-2" /> {/* Usando o ícone Wrench no menu mobile também */}
              <span className="font-bold text-lg">Beco dos Scripts</span>
            </Link>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={"ghost"}
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