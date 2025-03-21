'use client'
import React, { useEffect, useState } from 'react'
import { useBlush } from '../../providers/blush'
import './base-modal.css'

export function BaseModal(
    {
        Head = null, 
        Content = null, 
        Footer = null, 
        title = '', 
        description = '',
        isExpanded: defaultExpanded = true,
        alwaysExpanded = true,
        ...props
    }
){

    const {showBlush, hideBlush} = useBlush()
    const [isActive, setIsActive] = useState(true)
    const [isExpanded, setIsExpanded] = useState(defaultExpanded)

    useEffect(
        () => {
            if(isActive && alwaysExpanded){
                return expandModal()
            }
            if(!isActive)
                hideBlush()
        }
    , [isActive])

    useEffect(
        () => {
            if(isExpanded)
                showBlush()
            else
                hideBlush()
        }
    , [isExpanded])

    const closeModal = () => {
        setIsActive(false)
        console.log("The generic Modal was hidden")
    }

    const expandModal = () => {
        setIsExpanded(true)
    }

    const minimizeModal = () => {
        setIsExpanded(false)
    }

    const clickExpand = () => {
        if(alwaysExpanded)
            return
        
                console.log("Pass here")

        if(isExpanded)
            minimizeModal()
        else
            expandModal()
    }

    const copyDescription = () => {
        let __title = title?.trim() ? `Titulo: ${title}\n` : ''
        let __description = description?.trim() ? `Descrição: ${description}` : ''
        navigator.clipboard.writeText(`${__title + __description}`)
    }

    const commonProps = {
        ...props,
        title,
        description,
        showBlush,
        hideBlush,
        isActive,
        setIsActive,
        setIsExpanded,
        closeModal,
        expandModal,
        minimizeModal,
        clickExpand,
        copyDescription,
      };

    return (
        <div className={`modal ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}>
            <div className='head'>
                {Head && <Head {...commonProps}/>}
            </div>
            <div className={`content ${isExpanded ? 'expanded' : ''}`} title={isExpanded ? 'Clique para minimizar' : 'Clique para expandir'} onClick={() => clickExpand()}>
                {Content && <Content {...commonProps}/>}
            </div>
            <div className='footer'>
                {Footer && <Footer {...commonProps}/>}
            </div>       
        </div>
    )
}

export function BaseDescription({description}){
    return (
        <p className='description'>{description}</p>
    )
}

export function BaseAction({copyDescription, closeModal}){
    return (
        <div className='col-span-2 actions pr-2'>
            <div className='copy' title='Copiar conteúdo' onClick={() => copyDescription()}><span className="material-symbols-outlined">content_copy</span></div>
            <div className='close' title='Fechar' onClick={() => closeModal()}><span className="material-symbols-outlined">close</span></div>
        </div>
    )
}