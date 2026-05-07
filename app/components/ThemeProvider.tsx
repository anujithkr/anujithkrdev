'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

function ThemeAttributeHandler({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const root = window.document.documentElement;
    const activeTheme = theme === 'system' ? resolvedTheme : theme;

    root.classList.remove('light', 'dark');
    if (activeTheme) {
      root.classList.add(activeTheme);
    }
  }, [theme, resolvedTheme]);

  return <>{children}</>;
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <NextThemesProvider {...props} attribute={undefined}>
      <ThemeAttributeHandler>
        {children}
      </ThemeAttributeHandler>
    </NextThemesProvider>
  );
}
