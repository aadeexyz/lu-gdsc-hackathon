"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Yumi from "@/assets/yumi.png";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";
import urlAtom from "@/atoms/url-atom";
import adminAtom from "@/atoms/admin-atom";
import listingAton from "@/atoms/listing-atom";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Chat = {
    role: "system" | "user" | "assistant";
    content: string;
};

const Chat = () => {
    const [url] = useAtom(urlAtom);
    const [adminMode] = useAtom(adminAtom);
    const [listing] = useAtom(listingAton);

    useEffect(() => {
        if (url === "") {
            redirect("/?from=chat");
        }
    });

    const { toast } = useToast();

    const [messages, setMessages] = useState<Chat[]>([
        {
            role: "assistant",
            content: `Hello, I'm Yumi! I see you're interested in this property. How can I assist you with this listing?`,
        },
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [thinking, setThinking] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            const lineHeight = 20;
            const maxLines = 6;
            const maxHeight = lineHeight * maxLines;

            textarea.style.height = "auto";
            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = `${newHeight}px`;

            if (textarea.scrollHeight > maxHeight) {
                textarea.style.overflowY = "auto";
            } else {
                textarea.style.overflowY = "hidden";
            }
        }
    }, [inputMessage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [messages]);

    const bookedByBot = () => {
        toast({
            description: "A viewing was booked for the property.",
        });
    };

    const openForm = () => {
        const form = window.open("/form", "_blank");
    };

    const chat = async (updatedMessages: Chat[]) => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chats: [
                        {
                            role: "user",
                            content: `Here's details about a listing I'm interested in - in JSON format, help me answer the questions I have: ${JSON.stringify(
                                listing
                            )}`,
                        },
                        ...updatedMessages,
                    ],
                }),
            });

            const data = await res.json();

            let content = data.chat.content;

            if (content.includes("---viewingbookedfunction---")) {
                bookedByBot();

                content = data.chat.content.replace(
                    "---viewingbookedfunction---",
                    ""
                );
            } else if (content.includes("---viewingformfunction---")) {
                openForm();

                content = data.chat.content.replace(
                    "---viewingformfunction---",
                    ""
                );
            }

            setMessages([
                ...updatedMessages,
                { role: "assistant", content: content },
            ]);

            setThinking(false);
        } catch (e) {
            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content:
                        "There was an internal Error. Please refresh the browser. Sorry for the inconvinience.",
                },
            ]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
    };

    const handleKeyDown = async (
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey &&
            inputMessage !== "" &&
            !thinking
        ) {
            setThinking(true);

            e.preventDefault();

            const updatedMessages: Chat[] = [
                ...messages,
                { role: "user", content: inputMessage },
            ];
            setMessages(updatedMessages);

            setInputMessage("");

            await chat(updatedMessages);
        }
    };

    return (
        <>
            <div className="space-y-4 p-4 mb-20">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        ref={
                            index === messages.length - 1
                                ? lastMessageRef
                                : null
                        }
                        style={{ whiteSpace: "pre-line" }}
                        className={cn(
                            "flex flex-col w-full rounded-lg px-3 py-4",
                            message.role === "assistant"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                        )}
                    >
                        <div className="flex gap-2">
                            {message.role == "assistant" ? (
                                <Avatar>
                                    <AvatarImage asChild src={Yumi.src}>
                                        <Image src={Yumi} alt="Yumi" />
                                    </AvatarImage>
                                    <AvatarFallback className="text-white">
                                        Y
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <Avatar>
                                    <AvatarFallback className="text-primary-foreground bg-primary">
                                        Y
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            <p className="flex flex-col justify-center font-semibold text-xl">
                                {message.role == "assistant" ? "Yumi" : "You"}
                            </p>
                        </div>
                        <div className="flex">
                            <div className="min-w-[48px]"></div>
                            <div className="flex w-full flex-col justify-center text-lg">
                                {message.content}
                            </div>
                        </div>
                    </div>
                ))}
                {thinking && (
                    <div
                        ref={lastMessageRef}
                        className="flex flex-col w-full rounded-lg px-3 py-4 bg-primary text-primary-foreground"
                    >
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarImage asChild src={Yumi.src}>
                                    <Image src={Yumi} alt="Yumi" />
                                </AvatarImage>
                                <AvatarFallback className="text-white">
                                    Y
                                </AvatarFallback>
                            </Avatar>
                            <p className="flex flex-col justify-center font-semibold text-xl">
                                Yumi
                            </p>
                        </div>
                        <div className="flex">
                            <div className="min-w-[48px]"></div>
                            <div className="flex w-full flex-col justify-center text-lg">
                                <ThreeDots
                                    height="50"
                                    width="50"
                                    radius="5"
                                    color="##030712"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    visible={true}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="fixed flex inset-x-0 bottom-0 bg-transparent backdrop-blur p-4 px-10 text-[#030712]">
                <div className="relative flex items-end w-full">
                    <Textarea
                        className="text-lg resize-none overflow-hidden min-h-[20px] w-full pr-20"
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            adminMode
                                ? messages[messages.length - 1].role ==
                                  "assistant"
                                    ? "Message as User"
                                    : "Message as Yumi"
                                : "Ask Yumi..."
                        }
                    />
                    <Button
                        className="absolute bottom-0 right-0 mb-4 mr-4 disabled:cursor-not-allowed"
                        disabled={thinking}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Chat;
