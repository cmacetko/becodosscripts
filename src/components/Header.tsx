"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AppSidebar } from "./AppSidebar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Header = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const location = useLocation();

    // Close sheet on route change
    useEffect(() => {
        setIsSheetOpen(false);
    }, [location]);

    return (
        <header className="sticky top-0 z-30 h-16 w-full border-b bg-background/80 px-4 sm:px-6 lg:px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto w-full max-w-[1600px] flex items-center gap-4 h-full">
                {/* Mobile Sidebar Trigger */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden shrink-0">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 border-r">
                        <AppSidebar onItemClick={() => setIsSheetOpen(false)} />
                    </SheetContent>
                </Sheet>

                {/* Breadcrumbs or Page Title could go here */}
                <div className="flex-1">
                    {/* Placeholder for Breadcrumbs if needed later */}
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden md:flex text-muted-foreground w-64 justify-start" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
                        <Search className="mr-2 h-4 w-4" />
                        <span>Buscar ferramenta...</span>
                        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
};