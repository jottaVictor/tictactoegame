'use client'
import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({
    setTheme: () => {}
})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(false)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)