"use client";

import React from 'react';
import { Instagram, Facebook, Github, Linkedin, Wrench, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4 max-w-sm">
                        <div className="flex items-center gap-2 font-bold text-xl text-primary">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Wrench className="h-5 w-5 text-primary" />
                            </div>
                            <span>Beco dos Scripts</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Uma coleção de ferramentas essenciais para desenvolvedores, projetada para simplificar e acelerar seu fluxo de trabalho diário.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-sm font-semibold text-foreground/90">Conecte-se</span>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary transition-colors">
                                <a
                                    href="https://www.instagram.com/palomamacetko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary transition-colors">
                                <a
                                    href="https://www.facebook.com/palomamacetko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary transition-colors">
                                <a
                                    href="https://github.com/palomamacetko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary transition-colors">
                                <a
                                    href="https://www.linkedin.com/in/palomamacetko"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>
                        &copy; {currentYear} Beco dos Scripts. Todos os direitos reservados.
                    </p>
                    <p className="flex items-center gap-1">
                        Desenvolvido com <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> por <a href="https://www.palomamacetko.com.br" target="_blank" rel="noreferrer" className="font-medium hover:text-primary transition-colors">Paloma Macetko</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};