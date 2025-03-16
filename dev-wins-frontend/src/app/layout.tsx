import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // import font
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
    title: "Victory Vault 🏆 | Track Your Wins, Stay Motivated",
    description:
        "Celebrate every achievement, big or small. Victory Vault helps you log, track, and reflect on your personal and professional wins.",
    keywords: [
        "achievement tracker",
        "goal tracking",
        "motivation app",
        "progress tracker",
        "habit tracker",
        "life wins",
        "career growth",
        "small wins",
        "success journal",
        "daily accomplishments",
        "personal development",
        "Victory Vault",
    ],
    author: "Victory Vault Team",
    robots: "index, follow",
    canonical: "https://victoryvault.com",

    openGraph: {
        title: "Victory Vault 🏆 | Track Your Wins, Stay Motivated",
        description:
            "Your personal vault of achievements. Log, track, and reflect on your wins—big or small.",
        url: "https://victoryvault.com",
        type: "website",
        images: [
            {
                url: "https://victoryvault.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Victory Vault - Track Your Wins",
            },
        ],
        siteName: "Victory Vault",
    },

    twitter: {
        card: "summary_large_image",
        site: "@VictoryVault",
        title: "Victory Vault 🏆 | Your Achievements Matter",
        description:
            "Capture your victories, track your progress, and stay motivated with Victory Vault.",
        image: "https://victoryvault.com/twitter-card.jpg",
    },

    generator: "Next.js",
    applicationName: "Victory Vault",
    locale: "en_US",
    alternates: {
        canonical: "https://victoryvault.com",
        languages: {
            en: "https://victoryvault.com",
        },
    },
};

// ✅ Move viewport settings to a separate export
export const viewport = {
    themeColor: "#FFD700", // Gold color for branding
    colorScheme: "light dark",
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 5.0,
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
