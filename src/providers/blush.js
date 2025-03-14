'use client'
import React, { createContext, useContext, useState } from 'react';

const BlushContext = createContext({
    showBlus: () => {},
    hideBlush: () => {},
    blushIsVisible: false
});

export const BlushProvider = ({ children }) => {
    const [blushIsVisible, setBlushIsVisible] = useState(false);

    const showBlush = () => {
        setBlushIsVisible(true)
        console.log("The blush was showed")
    }
    const hideBlush = () => {
        setBlushIsVisible(false)
        console.log("The blush was hidden")
    }

    return (
        <BlushContext.Provider value={{ showBlush, hideBlush, blushIsVisible }}>
            {children}
        </BlushContext.Provider>
    );
};

export const useBlush = () => useContext(BlushContext)