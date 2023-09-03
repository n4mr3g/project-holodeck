import { Metadata } from 'next';
import { ReactElement, useEffect, useState } from 'react';
import { dark } from '@clerk/themes';
import type { AppProps } from 'next/app';
import React from 'react';
import type { AppType } from 'next/app';
// import { trpc } from '@/utils/trpc';
import { ClerkProvider } from '@clerk/nextjs';

import '@/styles/globals.css';
import '@/styles/typing-demo.css'; // Typing animation
import Navigation from '@/components/Navigation';



export const metadata: Metadata = {
  title: 'Project Holodeck',
  description: 'Welcome to Project Holodeck',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <ClerkProvider
    publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    appearance={{
      baseTheme: dark,
    }}
  >
    <html lang="en">
      <body>
    <Navigation
      navLinks={[
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Play', href: '/play' },
        { name: 'Play2', href: '/play2' },
      ]}
    />
        {children}
        </body>
    </html>
  </ClerkProvider>
  )
}
