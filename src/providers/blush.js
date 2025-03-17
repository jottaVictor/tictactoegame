'use client'
import React, { createContext, useContext, useState } from 'react';

const BlushContext = createContext({
    showBlus: () => {},
    hideBlush: () => {},
    blushIsActive: false
});

export const BlushProvider = ({ children }) => {
    const [blushIsActive, setBlushIsActive] = useState(false);

    const showBlush = () => {
        setBlushIsActive(true)
        console.log("The blush was showed")
    }
    const hideBlush = () => {
        setBlushIsActive(false)
        console.log("The blush was hidden")
    }

    return (
        <BlushContext.Provider value={{ showBlush, hideBlush, blushIsActive }}>
            {children}
        </BlushContext.Provider>
    );
};

export const useBlush = () => useContext(BlushContext)