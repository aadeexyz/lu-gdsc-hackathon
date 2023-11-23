import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Yumi",
    description: "Your personal property assistant",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" style={{ height: "100%" }}>
            <head>
                <style>
                    {`html, body {
                  margin: 0;
                  padding: 0;
                  min-height: 100%;
                  width: 100%;
              }`}
                </style>
            </head>
            <body
                className={`${inter.className} flex justify-center p-4 px-10`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full min-h-full mt-14">
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
