'use client';
// import { log } from "@utils/utils"
import '@components/modal/yes-no.css'
import 'src/css/index.css'
import React, { useCallback, useEffect, useState } from 'react'
import { BaseModal, BaseDescription, BaseAction } from '@components/modal'
import { log } from '@utils/utils';

export default function YesNo(props){
    log("YesNo rendelizada em: " + Date.now())

    const {id, title, description, yesFunc, noFunc, isExpanded, alwaysExpanded, style} = props

    const Head = ({copyDescription, closeModal, title}) => {
        log("Head YesNo rendelizada em: " + Date.now())

        return (
            <div className='grid grid-cols-10'>
                <div className='col-span-8 title'><i className="material-symbols-outlined">person_raised_hand</i><label>{title}</label></div>
                <BaseAction copyDescription={copyDescription} closeModal={closeModal}/>
            </div>
        )
    }
    
    const Footer = ({closeModal}) => {
        log("Footer YesNo rendelizada em: " + Date.now())

        const stopPropagation = (e) => e.stopPropagation()

        const yesClick = (e) => {
            stopPropagation(e)
            yesFunc()
            closeModal()
        }

        const noclick = (e) => {
            stopPropagation(e)
            noFunc()
            closeModal()
        }

        return (
            <>
                <div className='box-option' onClick={noclick}>
                    <span className='no-botton' title='Recusar'>Não</span><i className="material-symbols-outlined">close</i>
                </div>
                <div className='box-option' onClick={yesClick}>
                    <span className='yes-botton' title='Confirmar'>Sim</span><i className="material-symbols-outlined">check</i>
                </div>
            </>
        )
    }

    return (
        <BaseModal Head={Head} Content={BaseDescription} Footer={Footer} title={title} description={description} isExpanded={isExpanded} alwaysExpanded={alwaysExpanded} yesFunc={yesFunc} noFunc={noFunc} type='yes-no' id={id} style={style}/>
    )
}
