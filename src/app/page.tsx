"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import urlAtom from "@/atoms/url-atom";
import listingAtom from "@/atoms/listing-atom";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ThreeDots } from "react-loader-spinner";
import Logo from "@/assets/logo.png";
import Image from "next/image";

type Listing = {
    title: string;
    price: string;
    location: string;
    listedOn: string;
    unitDetails: string[];
    description: string[];
    walkScore: string[];
    transitScore: string[];
    bikeScore: string[];
    nearByTransit: string[][];
    sellerName: string;
    whenJoined: string;
};

const Client = () => {
    const [url, setUrl] = useAtom(urlAtom);
    const [listing, setListing] = useAtom(listingAtom);

    const [flyingUrl, setFlyingUrl] = useState("");
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        if (listing) {
            router.push("/chat");
        }
    }, [listing, router]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlyingUrl(e.target.value);
    };

    const handleUrl = async () => {
        try {
            const res = await fetch(`/api/url?url=${flyingUrl}`);
            const data = await res.json();
            const listing = data.listing as Listing;

            setListing(listing);
        } catch (e) {
            toast({
                variant: "destructive",
                description:
                    "Something went wrong. Please try again with a different URL.",
            });
        }
    };

    const handleClick = async () => {
        setLoading(true);
        setUrl(flyingUrl);
        await handleUrl();
        setLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && isValidUrl(flyingUrl)) {
            handleClick();
        }
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
                <Image src={Logo} alt="logo" />
                <Label className="text-lg" htmlFor="url">
                    Link to the listing{" "}
                    <p className="text-sm">
                        (Please try again if not redirected)
                    </p>
                </Label>
                <div className="flex space-x-2">
                    <Input
                        className="text-lg"
                        type="url"
                        id="url"
                        placeholder="Link"
                        value={flyingUrl}
                        onChange={handleUrlChange}
                        onKeyDown={handleKeyDown}
                    />
                    <Button
                        className="text-lg"
                        disabled={!isValidUrl(flyingUrl) || loading}
                        onClick={handleClick}
                    >
                        <SendHorizontal size={24} />
                    </Button>
                </div>
                {loading && (
                    <ThreeDots
                        height="50"
                        width="50"
                        radius="5"
                        color="#030712"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                    />
                )}
            </div>
        </main>
    );
};

export default Client;
