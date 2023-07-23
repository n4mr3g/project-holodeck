'use client';
import Navigation from '@/components/Navigation';
import { StyledEngineProvider } from '@mui/material/styles';
import { ReactElement, useEffect, useState } from 'react';
import { dark } from '@clerk/themes';
import type { AppProps } from 'next/app';
import React from 'react';
import '@/styles/globals.css';

/* Typing animation */
import '@/styles/typing-demo.css';
import { ClerkProvider } from '@clerk/nextjs';

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <StyledEngineProvider injectFirst>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        {...pageProps}
        appearance={{
          baseTheme: dark,
        }}
      >
        <Navigation
          navLinks={[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'Play', href: '/play' },
          ]}
        />
        <Component {...pageProps} />
      </ClerkProvider>
    </StyledEngineProvider>
  );
}
