'use client'
import React, { createContext, useContext, useState } from 'react';

const BlushContext = createContext({
    showBlush: () => {},
    hideBlush: () => {},
    isActive: false
});

export const BlushProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    const showBlush = () => {
        setIsActive(true)
        console.log("The blush was showed")
    }
    const hideBlush = () => {
        setIsActive(false)
        console.log("The blush was hidden")
    }

    return (
        <BlushContext.Provider value={{ showBlush, hideBlush, isActive }}>
            {children}
        </BlushContext.Provider>
    )
}

export const useBlush = () => useContext(BlushContext)