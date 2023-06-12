import Navigation from "@/app/components/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider {...pageProps}>
        <Navigation
          navLinks={[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Play", href: "/play" },
          ]}
        />
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
}
