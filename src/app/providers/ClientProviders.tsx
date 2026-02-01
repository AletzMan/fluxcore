"use client";
import { LambdaConfigProvider, ThemeProvider } from "lambda-ui-components";
import SessionProvider from "./SessionProvider";
export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LambdaConfigProvider lang="en" >
            <ThemeProvider
                defaultTheme="slate"
                lightTheme="mint"
                darkTheme="slate"
                disableTransitionOnChange
                enableColorScheme={true}
            >
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </LambdaConfigProvider>
    );
}
