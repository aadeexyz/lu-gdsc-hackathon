"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import urlAtom from "@/atoms/url-atom";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Client = () => {
    const [url, setUrl] = useAtom(urlAtom);
    const [flyingUrl, setFlyingUrl] = useState("");

    const { toast } = useToast();

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const search = searchParams?.get("from");

        if (search === "chat") {
            toast({
                variant: "destructive",
                description: "Enter a listing URL to continue with the chat.",
            });
        }
    }, [searchParams, toast]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlyingUrl(e.target.value);
    };

    const handleClick = () => {
        setUrl(flyingUrl);
        router.push("/chat");
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
                        value={flyingUrl}
                        onChange={handleUrlChange}
                    />
                    <Button
                        className="text-lg"
                        disabled={!isValidUrl(flyingUrl)}
                        onClick={handleClick}
                    >
                        <SendHorizontal size={24} />
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Client;
