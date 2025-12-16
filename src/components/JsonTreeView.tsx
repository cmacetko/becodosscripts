
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, ChevronDown } from "lucide-react";

interface JsonTreeViewProps {
    data: any;
    label?: string;
    isLast?: boolean;
    level?: number;
}

const JsonTreeView: React.FC<JsonTreeViewProps> = ({ data, label, isLast = true, level = 0 }) => {
    // Default open for first 2 levels to make it useful immediately
    const [isOpen, setIsOpen] = useState(level < 2);

    if (data === null) {
        return (
            <div className={`font-mono text-sm ${level > 0 ? "ml-4" : ""}`}>
                {label && <span className="text-blue-600 dark:text-blue-400">"{label}": </span>}
                <span className="text-red-500">null</span>
                {!isLast && ","}
            </div>
        );
    }

    if (typeof data === 'boolean') {
        return (
            <div className={`font-mono text-sm ${level > 0 ? "ml-4" : ""}`}>
                {label && <span className="text-blue-600 dark:text-blue-400">"{label}": </span>}
                <span className="text-purple-600 dark:text-purple-400">{data.toString()}</span>
                {!isLast && ","}
            </div>
        );
    }

    if (typeof data === 'number') {
        return (
            <div className={`font-mono text-sm ${level > 0 ? "ml-4" : ""}`}>
                {label && <span className="text-blue-600 dark:text-blue-400">"{label}": </span>}
                <span className="text-yellow-600 dark:text-yellow-400">{data}</span>
                {!isLast && ","}
            </div>
        );
    }

    if (typeof data === 'string') {
        return (
            <div className={`font-mono text-sm ${level > 0 ? "ml-4" : ""}`}>
                {label && <span className="text-blue-600 dark:text-blue-400">"{label}": </span>}
                <span className="text-green-600 dark:text-green-400">"{data}"</span>
                {!isLast && ","}
            </div>
        );
    }

    if (Array.isArray(data)) {
        if (data.length === 0) {
            return (
                <div className={`font-mono text-sm ${level > 0 ? "ml-4" : ""}`}>
                    {label && <span className="text-blue-600 dark:text-blue-400">"{label}": </span>}
                    []
                    {!isLast && ","}
                </div>
            )
        }
        return (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className={level > 0 ? "ml-4" : ""}>
                <div className="flex items-center font-mono text-sm">
                    <CollapsibleTrigger asChild>
                        <button className="hover:bg-muted/50 p-0.5 rounded mr-1 text-muted-foreground">
                            {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </button>
                    </CollapsibleTrigger>
                    {label && <span className="text-blue-600 dark:text-blue-400 mr-2">"{label}": </span>}
                    <span>[</span>
                    {!isOpen && <span className="text-muted-foreground text-xs ml-2 cursor-pointer" onClick={() => setIsOpen(true)}>{data.length} items...</span>}
                    {!isOpen && <span>]</span>}
                    {!isOpen && !isLast && ","}
                </div>
                <CollapsibleContent>
                    <div className="pl-2 border-l border-muted/20 ml-1.5">
                        {data.map((item, index) => (
                            <JsonTreeView
                                key={index}
                                data={item}
                                isLast={index === data.length - 1}
                                level={level + 1}
                            />
                        ))}
                    </div>
                    <div className="font-mono text-sm ml-4">] {!isLast && ","}</div>
                </CollapsibleContent>
            </Collapsible>
        );
    }

    // Object
    const keys = Object.keys(data);
    if (keys.length === 0) {
        return (
            <div className={`font-mono text-sm ${level > 0 ? "ml-4" : ""}`}>
                {label && <span className="text-blue-600 dark:text-blue-400">"{label}": </span>}
                {'{ }'}
                {!isLast && ","}
            </div>
        )
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className={level > 0 ? "ml-4" : ""}>
            <div className="flex items-center font-mono text-sm">
                <CollapsibleTrigger asChild>
                    <button className="hover:bg-muted/50 p-0.5 rounded mr-1 text-muted-foreground">
                        {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </button>
                </CollapsibleTrigger>
                {label && <span className="text-blue-600 dark:text-blue-400 mr-2">"{label}": </span>}
                <span>{'{'}</span>
                {!isOpen && <span className="text-muted-foreground text-xs ml-2 cursor-pointer" onClick={() => setIsOpen(true)}>{keys.length} keys...</span>}
                {!isOpen && <span>{'}'}</span>}
                {!isOpen && !isLast && ","}
            </div>
            <CollapsibleContent>
                <div className="pl-2 border-l border-muted/20 ml-1.5">
                    {keys.map((key, index) => (
                        <JsonTreeView
                            key={key}
                            label={key}
                            data={data[key]}
                            isLast={index === keys.length - 1}
                            level={level + 1}
                        />
                    ))}
                </div>
                <div className="font-mono text-sm ml-4">{'}'} {!isLast && ","}</div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default JsonTreeView;
