import React from 'react'
import { createContext, useContext, useState, useEffect } from "react";

type ThemeContextValue = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};

export default function ThemeProvider({children}: Readonly<{children: React.ReactNode}>) {
    const savedTheme = localStorage.getItem("theme");
    const [theme ,setTheme] = useState(() => savedTheme || 'light' )

    // Trigger the user laptop or phone setting mode , check if user setting is dark -> true and not -> false
    const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    // Dark Mode
    const darkMode = (root:any) => {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
    };

    // Light Mode
    const lightMode = (root:any) => {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
    };



    // Switch the Mode depond the localstorage
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("dark", "light");
         if (theme == "dark") {
            darkMode(root);
        } else if (theme == "light") {
            lightMode(root);
        }
    }, [theme]);


    return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}
