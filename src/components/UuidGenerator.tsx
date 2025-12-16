import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ResultItem } from "./ResultItem";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export const UuidGenerator = () => {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(6);

    const generateUuid = () => {
        const newUuids = Array.from({ length: count }, () => crypto.randomUUID());
        setUuids(newUuids);
    };

    useEffect(() => {
        setUuids(Array.from({ length: 6 }, () => crypto.randomUUID()));
    }, []);

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="count">Quantidade</Label>
                    <span className="text-sm font-medium">{count}</span>
                </div>
                <Slider
                    id="count"
                    min={1}
                    max={50}
                    step={1}
                    value={[count]}
                    onValueChange={(value) => setCount(value[0])}
                />
            </div>
            <Button onClick={generateUuid} className="w-full sm:w-auto">
                Gerar UUIDs
            </Button>
            {uuids.length > 0 && (
                <div className="space-y-2">
                    {uuids.map((uuid, index) => (
                        <ResultItem key={index} value={uuid} />
                    ))}
                </div>
            )}
        </div>
    );
};
