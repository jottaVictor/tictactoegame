import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"

import { ThemeProvider } from "@providers/theme"
import { BlurProvider } from "@providers/blur"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Jogo da Velha",
  description: "Jogo da velha feito por João Victor Rodrigues dos Santos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <BlurProvider>
            {children}
          </BlurProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
