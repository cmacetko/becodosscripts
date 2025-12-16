import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { tools, ToolCategory } from "@/config/tools";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronRight, Wrench } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";

interface AppSidebarProps {
    className?: string;
    onItemClick?: () => void;
}

export function AppSidebar({ className, onItemClick }: AppSidebarProps) {
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState<string>("all");

    // Group tools by category
    const categories: Record<ToolCategory, typeof tools> = {
        Documents: [],
        Security: [],
        Development: [],
        Text: [],
        Legal: []
    };

    tools.forEach(tool => {
        if (categories[tool.category]) {
            categories[tool.category].push(tool);
        }
    });

    const categoryIcons: Record<ToolCategory, string> = {
        Documents: "📄",
        Security: "�",
        Development: "�",
        Text: "✍️",
        Legal: "⚖️"
    };

    return (
        <div className={cn("h-screen border-r bg-sidebar", className)}>
            <div className="space-y-4 py-4 h-full flex flex-col">
                <div className="px-6 py-2 flex items-center">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary" onClick={onItemClick}>
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Wrench className="h-5 w-5 text-primary" />
                        </div>
                        <span>Beco dos Scripts</span>
                    </Link>
                </div>

                <ScrollArea className="flex-1 px-4">
                    <div className="space-y-4 py-2">
                        <div className="py-2">
                            <Accordion type="multiple" defaultValue={["Documents", "Security", "Development", "Text", "Legal"]} className="w-full space-y-2">
                                {(Object.keys(categories) as ToolCategory[]).map((category) => (
                                    <AccordionItem value={category} key={category} className="border-none">
                                        <AccordionTrigger className="px-2 py-2 hover:bg-sidebar-accent/50 rounded-md hover:no-underline transition-all [&[data-state=open]>svg]:rotate-90">
                                            <span className="flex items-center gap-2 font-medium">
                                                <span className="text-base">{categoryIcons[category]}</span>
                                                {category}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-1 pb-2">
                                            <div className="space-y-1 ml-2 border-l border-sidebar-border pl-2">
                                                {categories[category].map((tool) => (
                                                    <Button
                                                        key={tool.path}
                                                        asChild
                                                        variant="ghost"
                                                        className={cn(
                                                            "w-full justify-start h-9 px-2 font-normal hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                                                            location.pathname === tool.path && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                                        )}
                                                        onClick={onItemClick}
                                                    >
                                                        <Link to={tool.path}>
                                                            <div className="mr-2 opacity-70">
                                                                {tool.icon}
                                                            </div>
                                                            <span className="truncate">{tool.title}</span>
                                                            {location.pathname === tool.path && (
                                                                <div className="ml-auto w-1 h-full bg-primary absolute right-0 rounded-l-md" />
                                                            )}
                                                        </Link>
                                                    </Button>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </ScrollArea>

            </div>
        </div>
    );
}
