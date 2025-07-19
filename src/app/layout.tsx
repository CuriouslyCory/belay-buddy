import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/header";
import { Toaster } from "./_components/ui/sonner";

export const metadata: Metadata = {
	title: "Belay Buddy",
	description: "Find your next climbing partner",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClerkProvider>
			<html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
				<body className="flex flex-col items-center">
					<TRPCReactProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Header />
							{children}
							<Toaster />
						</ThemeProvider>
					</TRPCReactProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
