import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { tools } from "@/config/tools";

const Index = () => {
    return (
        <>
            <header className="text-center mb-12 mt-8 animate-fade-in space-y-4">
                <div className="inline-block p-2 px-4 rounded-full bg-muted text-sm font-medium mb-4">
                    👋 Bem-vindo ao Beco dos Scripts
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Caixa de Ferramentas<br />do Desenvolvedor
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Uma coleção curada de geradores, conversores e utilitários para acelerar seu fluxo de trabalho.
                </p>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-12">
                {tools.map((tool, index) => (
                    <Link
                        to={tool.path}
                        key={tool.path}
                        className="group h-full"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <Card className="h-full flex flex-col items-start text-left p-6 bg-card transition-all duration-300 border-border/50 hover:border-primary/20 shadow-sm hover:shadow-md animate-scale-in group-hover:-translate-y-1">
                            <div className="mb-4 p-3 rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                                {tool.icon}
                            </div>
                            <CardTitle className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                {tool.title}
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                                {tool.description}
                            </CardDescription>
                        </Card>
                    </Link>
                ))}
            </main>

            {/* Call to Action para o Blog */}
            <section className="mb-12 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-muted/20 via-primary/5 to-muted/20 border border-primary/10">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 gap-8">
                        <div className="flex-1 text-center lg:text-left space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Explore meu Blog de Desenvolvimento</h2>
                            <p className="text-muted-foreground text-lg max-w-xl">
                                Encontre artigos técnicos detalhados, tutoriais passo a passo e insights valiosos sobre o universo do desenvolvimento web.
                            </p>
                            <div className="pt-2">
                                <Button asChild size="lg" className="rounded-full px-8 shadow-lg hover:shadow-primary/25">
                                    <a href="https://www.palomamacetko.com.br/" target="_blank" rel="noopener noreferrer">
                                        <BookOpenText className="mr-2 h-5 w-5" />
                                        Ler Artigos
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <div className="relative w-full max-w-sm lg:max-w-md aspect-video rounded-xl overflow-hidden shadow-2xl rotate-3 lg:rotate-6 hover:rotate-0 transition-transform duration-500">
                            {/* Placeholder visual if image fails */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <BookOpenText className="h-24 w-24 text-primary/20" />
                            </div>
                            <img
                                src="/programming-1873854_1920.png"
                                alt="Blog Preview"
                                className="object-cover w-full h-full"
                                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;