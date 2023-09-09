import '@/styles/globals.css';

import React from 'react';
import { Metadata } from 'next';
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '@/components/Navigation';

import '@/styles/typing-demo.css'; // Typing animation

export const metadata: Metadata = {
  title: 'Project Holodeck',
  description: 'Welcome to Project Holodeck',
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          appearance={{
            baseTheme: dark,
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navigation
              navLinks={[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Play', href: '/play' },
              ]}
            />
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
