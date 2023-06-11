import Navigation from "@/app/components/Navigation";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Navigation
        navLinks={[
          { name: "Home", href: "/" },
          { name: "Play", href: "/play" },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}

// export default function MyApp({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//       <nav>
//         <Link href="/">Home</Link>
//         {/* <Link href="/about">
//           About
//         </Link>
//         <Link href="/play">
//           Play
//         </Link>
//         <Link href="/custom">
//           Custom
//         </Link> */}
//       </nav>
//         {children}
//         </body>
//     </html>
//   );
// }

//   {/* TODO: Add nav links */}
