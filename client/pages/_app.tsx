import Navigation from "@/app/components/Navigation";
import { ClerkProvider, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
/* Typing animation */
import "@/styles/typing-demo.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
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
