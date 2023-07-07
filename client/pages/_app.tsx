import Navigation from "@/app/components/Navigation";
import { useEffect, useState } from "react";
import { dark } from "@clerk/themes";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

/* Typing animation */
import "@/styles/typing-demo.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function MyApp({ Component, pageProps }: AppProps) {
  // const [sessions, setSessions] = useState<Session[]>([]); //TODO: sessions

  // function fetchSessions() {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   if (userId)
  //   {
  //     fetch(`http://localhost:3001/sessions/${userId}`, requestOptions)
  //       .then((data) => data.json())
  //       .then((data) => sortSessions(data))
  //       .then((data = []) => setSessions(data));
  //   }
  // }

  // useEffect(() => {
  //   fetchSessions();
  // }, []);

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
