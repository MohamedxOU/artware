"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="acid"
      themes={["acid", "synthwave"]}
      enableSystem={false}
      storageKey="theme-storage"
    >
      {children}
    </NextThemesProvider>
  );
}
