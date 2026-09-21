import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "./globals.css";

const hind = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "भारत पहचान | ग्राम पंचायत",
  description: "गांव के विकास, योजनाओं और समाचार की पूरी जानकारी।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className={`${hind.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
