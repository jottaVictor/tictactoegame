'use client'
import React, { createContext, useContext, useState } from 'react';
import { generateId  } from '../utils/utils';

const ControllerModalContext = createContext({
    activeModals: [],
    setActiveModals: () => {},
    openBaseModal: (title = 'Aviso', description = '', expanded = true, alwaysExpanded = true) => {},
    openConfirmModal: (title = 'Aviso', description = '', confirmFunc = () => {}, expanded = true, alwaysExpanded = true) => {},
    openYesNoModal: () => {},
    closeModalById: () => {}
});

export const ControllerModalProvider = ({ children }) => {
    const [activeModals, setActiveModals] = useState([])
    
    const openBaseModal = (title = 'Aviso', description = '', isExpanded = true, alwaysExpanded = true) => {
        setActiveModals(prevModals => [
            ...prevModals,
            { id: generateId(), title: title, description, isExpanded, alwaysExpanded, type: 'base' }
        ])
    }

    const openConfirmModal = (title = 'Aviso', description = '', confirmFunc = () => {}, isExpanded = true, alwaysExpanded = true) => {
        setActiveModals(prevModals => [
            ...prevModals,
            { id: generateId(), title: title, description, confirmFunc, isExpanded, alwaysExpanded, type: 'confirm' }
        ])
    }

    const openYesNoModal = () => {

    }

    const closeModalById = (id) => {
        setActiveModals(prevModals => prevModals.filter(modal => modal.id !== id));
    }

    return (
        <ControllerModalContext.Provider value={{ activeModals, setActiveModals, openBaseModal, openConfirmModal, openYesNoModal, closeModalById }}>
            {children}
        </ControllerModalContext.Provider>
    );
};

export const useControllerModal = () => useContext(ControllerModalContext)