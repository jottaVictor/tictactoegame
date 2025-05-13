'use client'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { log } from '@utils/utils'
import { useBlur } from '@providers/blur'
import { useControllerModal } from '@providers/controller-modal'
import '@components/modal/base-modal.css'

export default function BaseModal(
    {
        Head = null, 
        Content = null, 
        Footer = null, 
        title = 'Aviso', 
        description = '',
        isExpanded: defaultExpanded = true,
        alwaysExpanded = true,
        type = 'base',
        style = {},
        children,
        ...props
    }
){
    log("Base Modal rendelizada em: " + Date.now())

    const { showBlur, hideBlur}         = useBlur()
    const { closeModalById }            = useControllerModal()
    const [ isActive, setIsActive ]     = useState(true)
    const [ isExpanded, setIsExpanded ] = useState(defaultExpanded)
    const initRef = useRef(false)

    const closeModal = useCallback(() => {
        setIsActive(false)
        if(isExpanded) hideBlur()
        log("The base Modal was hidden")
    }, [isExpanded, hideBlur, setIsActive])

    const expandModal = useCallback(() => {
        setIsExpanded(true)
    })

    const minimizeModal = useCallback(() => {
        setIsExpanded(false)
    })

    const clickExpand = () => {
        if(alwaysExpanded)
            return

        if(isExpanded){
            minimizeModal()
            hideBlur()
        }
        else{
            showBlur()
            expandModal()
        }
    }

    const copyDescription = useCallback(() => {
        let __title = title?.trim() ? `Titulo: ${title}\n` : ''
        let __description = description?.trim() ? `Descrição: ${description}` : ''
        navigator.clipboard.writeText(`${__title + __description}`)
    })

    const commonProps = {
        ...props,
        title,
        description,
        // isExpanded,
        alwaysExpanded,
        type,
        showBlur,
        hideBlur,
        // isActive,
        setIsActive,
        setIsExpanded,
        closeModal,
        expandModal,
        minimizeModal,
        // clickExpand,
        copyDescription,
    }

    useEffect(
        () => {
            if(isActive && alwaysExpanded){
                return expandModal()
            }
            if(!isActive){
                setTimeout(() => {
                    closeModalById(props.id)
                }, 1000);
            }
        }
    , [isActive, expandModal])

    useEffect(() => {
        if (!initRef.current && defaultExpanded) {
            console.log("ola")
            showBlur()
            initRef.current = true
        }
    }, [])

    // useEffect(
    //     () => {
    //         setTimeout(
    //             () => {
    //                 closeModal()
    //             }
    //         , 5000)
    //     }
    // ,[props.id])

    return (
        <div className={`modal ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''} ${type}`} style={style}  onClick={clickExpand}>
            <div className='head'>
                {Head ? <Head {...commonProps}/> : <BaseHead {...commonProps} /> }
            </div>
            <div className={`content ${isExpanded ? 'expanded' : ''}`} title={!alwaysExpanded ? (isExpanded ? 'Clique para ver menos' : 'Clique para ver mais') : ''}>
                {Content ? <Content {...commonProps}/> : <BaseDescription {...commonProps}/>}
            </div>
            <div className='footer'>
                {Footer && <Footer {...commonProps}/>}
            </div>       
        </div>
    )
}

export function BaseHead({title, copyDescription, closeModal}){
    log("Base Head rendelizada em: " + Date.now())

    return(
        <div className='grid grid-cols-10'>
            <div className='col-span-8 title ml-[8px]'><label>{title}</label></div>
            <BaseAction copyDescription={copyDescription} closeModal={closeModal}/>
        </div>
    )
}

export function BaseDescription({description}){
    log("Base Description rendelizada em: " + Date.now())

    return (
        <p className='description'>{description || 'Conteúdo da mensagem aqui'}</p>
    )
}

export function BaseAction({copyDescription, closeModal}){
    log("Base Action rendelizada em: " + Date.now())

    return (
        <div className='col-span-2 actions pr-2'>
            <div className='copy' title='Copiar conteúdo' onClick={(e) => { copyDescription(); e.stopPropagation()}}><span className="material-symbols-outlined">content_copy</span></div>
            <div className='close' title='Fechar' onClick={(e) => { closeModal(); e.stopPropagation()}}><span className="material-symbols-outlined">close</span></div>
        </div>
    )
}