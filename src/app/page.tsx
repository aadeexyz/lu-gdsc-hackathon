import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
    return (
        <main className="flex h-full space-y-3 flex-col items-center justify-center">
            <Button asChild>
                <Link href="/client">Client</Link>
            </Button>

            <Button asChild>
                <Link href="/admin">Admin</Link>
            </Button>
        </main>
    );
};

export default Home;
