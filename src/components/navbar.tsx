"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAtom } from "jotai";
import adminAtom from "@/atoms/admin-atom";

const Navbar = () => {
    const [adminMode, setAdminMode] = useAtom(adminAtom);

    const handleAdminModeChange = () => {
        setAdminMode(!adminMode);
    };

    return (
        <>
            <nav className="z-20 fixed inset-x-0 top-0 bg-background/50 backdrop-blur p-4 px-8 text-xl font-bold flex justify-between">
                <div>YumiAI - Your rentals expert</div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="admin-mode">Admin Mode</Label>
                    <Switch
                        id="admin-mode"
                        checked={adminMode}
                        onCheckedChange={handleAdminModeChange}
                    />
                </div>
            </nav>
        </>
    );
};

export { Navbar };
