import Navigation from "@/app/components/Navigation";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Navigation
        navLinks={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Play", href: "/play" },
        ]}
      />

      <Component {...pageProps} />
    </>
  );
}
