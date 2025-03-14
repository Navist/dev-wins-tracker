import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // import font
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
    title: "Wins Tracker 🏆",
    description: "Track your wins, no matter the size!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // add font to className, also add antialiased and dark mode
        <html
            lang="en"
            className={`${GeistSans.className} antialiased dark:bg-gray-950`}
        >
            <body className="ml-40">
                <NavBar />
                {children}
            </body>
        </html>
    );
}
