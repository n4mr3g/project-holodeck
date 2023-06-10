import "./globals.css";
import { Inter, Silkscreen } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const silkscreen = Silkscreen({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Project Holodeck",
  description: "Generative text adventures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
