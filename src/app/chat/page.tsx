"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Yumi from "../assets/yumi.png";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            role: "agent",
            content: "Hi, how can I help you today?",
        },
        {
            role: "user",
            content: "Hey, I'm having trouble with my account.",
        },
        {
            role: "agent",
            content: "What seems to be the problem?",
        },
        {
            role: "user",
            content: "I can't log in.",
        },
        {
            role: "user",
            content: "I can't log in.",
        },
        {
            role: "user",
            content:
                "In a serene and lush forest, there lies a hidden glade where the sun filters through the dense canopy, casting dappled shadows on the forest floor. Here, a variety of wildlife peacefully coexists, from graceful deer grazing in the clearings to nimble squirrels darting among the trees. The air is filled with the melodious chirping of birds, creating a symphony that resonates with the rustling leaves. A gentle stream meanders through the glade, its crystal-clear waters reflecting the vibrant hues of the surrounding flora. Amidst this natural beauty, a sense of tranquility prevails, offering a sanctuary from the hustle and bustle of the outside world. This hidden gem in the heart of the forest stands as a testament to the enduring splendor of nature, untouched and unspoiled by human hands.",
        },
        {
            role: "agent",
            content:
                "In a serene and lush forest, there lies a hidden glade where the sun filters through the dense canopy, casting dappled shadows on the forest floor. Here, a variety of wildlife peacefully coexists, from graceful deer grazing in the clearings to nimble squirrels darting among the trees. The air is filled with the melodious chirping of birds, creating a symphony that resonates with the rustling leaves. A gentle stream meanders through the glade, its crystal-clear waters reflecting the vibrant hues of the surrounding flora. Amidst this natural beauty, a sense of tranquility prevails, offering a sanctuary from the hustle and bustle of the outside world. This hidden gem in the heart of the forest stands as a testament to the enduring splendor of nature, untouched and unspoiled by human hands.",
        },
        {
            role: "user",
            content:
                "In a serene and lush forest, there lies a hidden glade where the sun filters through the dense canopy, casting dappled shadows on the forest floor. Here, a variety of wildlife peacefully coexists, from graceful deer grazing in the clearings to nimble squirrels darting among the trees. The air is filled with the melodious chirping of birds, creating a symphony that resonates with the rustling leaves. A gentle stream meanders through the glade, its crystal-clear waters reflecting the vibrant hues of the surrounding flora. Amidst this natural beauty, a sense of tranquility prevails, offering a sanctuary from the hustle and bustle of the outside world. This hidden gem in the heart of the forest stands as a testament to the enduring splendor of nature, untouched and unspoiled by human hands.",
        },
        {
            role: "agent",
            content:
                "In a serene and lush forest, there lies a hidden glade where the sun filters through the dense canopy, casting dappled shadows on the forest floor. Here, a variety of wildlife peacefully coexists, from graceful deer grazing in the clearings to nimble squirrels darting among the trees. The air is filled with the melodious chirping of birds, creating a symphony that resonates with the rustling leaves. A gentle stream meanders through the glade, its crystal-clear waters reflecting the vibrant hues of the surrounding flora. Amidst this natural beauty, a sense of tranquility prevails, offering a sanctuary from the hustle and bustle of the outside world. This hidden gem in the heart of the forest stands as a testament to the enduring splendor of nature, untouched and unspoiled by human hands.",
        },
    ]);

    const [inputMessage, setInputMessage] = useState("");
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

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            setMessages([...messages, { role: "user", content: inputMessage }]);

            setInputMessage("");
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
                            message.role === "agent"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                        )}
                    >
                        <div className="flex gap-2">
                            {message.role == "agent" ? (
                                <Avatar>
                                    <AvatarImage src={Yumi.src} />
                                    <AvatarFallback className="text-white">
                                        Y
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <Avatar>
                                    <AvatarFallback className="text-primary-foreground bg-primary">
                                        U
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            <p className="flex flex-col justify-center font-semibold text-xl">
                                {message.role == "agent" ? "Yumi" : "You"}
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
            </div>

            <div className="fixed flex inset-x-0 bottom-0 bg-transparent backdrop-blur p-4 text-white">
                <div className="relative flex items-end w-full">
                    <Textarea
                        className="text-lg resize-none overflow-hidden min-h-[20px] w-full pr-20"
                        ref={textareaRef}
                        value={inputMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask Yumi..."
                    />
                    <Button className="absolute bottom-0 right-0 mb-4 mr-4">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Chat;
