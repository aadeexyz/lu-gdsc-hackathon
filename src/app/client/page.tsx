"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import React, { useState } from "react";

const Client = () => {
    const [url, setUrl] = useState("");

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <main className="flex h-full space-y-3 flex-col items-center justify-center">
            <div className="grid w-full max-w-sm items-center gap-2">
                <Label className="text-lg" htmlFor="url">
                    Link to the listing
                </Label>
                <div className="flex space-x-2">
                    <Input
                        className="text-lg"
                        type="url"
                        id="url"
                        placeholder="Link"
                        value={url}
                        onChange={handleUrlChange}
                    />
                    <Button className="text-lg" disabled={!isValidUrl(url)}>
                        <SendHorizontal size={24} />
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Client;
