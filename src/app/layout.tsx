import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Toaster } from "~/components/ui/toaster";
import Providers from "~/Context/Providers";

const font = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: "300",
});

export const metadata: Metadata = {
	title: "Casetum",
	description: "Custom cases with your own image, style, and flair.",
	openGraph: {
		title: "Casetum",
		description: "Custom cases with your own image, style, and flair.",
		images: [{ url: "/step-3.png" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Casetum",
		description: "Custom cases with your own image, style, and flair.",
		creator: "@SomePlaceholderTwitterHandle",
		images: ["/step-3.png"],
	},
	icons: "/favicon.ico",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Navbar />
				<main className="grainy-bg flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
					<div className="flex h-full flex-1 flex-col">
						<Providers>{children}</Providers>
					</div>
					<Footer />
				</main>
				<Toaster />
			</body>
		</html>
	);
}
