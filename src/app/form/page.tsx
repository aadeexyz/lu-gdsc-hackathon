"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Form = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());

    const { toast } = useToast();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePhoneNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPhoneNumber(e.target.value);
    };

    const handleEmailIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailId(e.target.value);
    };

    const isValid = () => {
        return name && phoneNumber && emailId && date;
    };

    const clicked = () => {
        setName("");
        setPhoneNumber("");
        setEmailId("");
        setDate(new Date());

        toast({
            description: `We have scheduled a viewing for ${date?.getMonth()} ${date?.getDate()}.`,
        });
    };

    return (
        <div className="p-4 px-8 space-y-4">
            <div>
                <h1 className="text-3xl font-bold">Form</h1>
            </div>
            <div>
                <Label className="text-lg">Name</Label>
                <Input
                    className="text-lg"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <Label className="text-lg">Phone Number</Label>
                <Input
                    className="text-lg"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </div>
            <div>
                <Label className="text-lg">Email Id</Label>
                <Input
                    className="text-lg"
                    value={emailId}
                    onChange={handleEmailIdChange}
                />
            </div>
            <div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </div>
            <div>
                <Button
                    className="text-lg"
                    disabled={!isValid()}
                    onClick={clicked}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Form;
