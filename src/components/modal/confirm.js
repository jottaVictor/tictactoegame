'use client';
import '@components/modal/confirm.css'
import 'src/css/index.css'
import React, { memo } from 'react'
import { log } from '@utils/tils'
import { BaseModal, BaseHead, BaseDescription } from '@components/modal'

export default function Confirm(props){
    log("Modal Confirm rendelizada em: " + Date.now())

    const {id, title, description, confirmFunc, isExpanded, alwaysExpanded, style} = props

    const Footer = ({confirmFunc, closeModal}) => {
        log("Footer Confirm rendelizada em: " + Date.now())

        const clickOk = (e) => {
            e.stopPropagation()
            confirmFunc()
            closeModal()
        }

        return (
            <div className='box-option' onClick={clickOk}>
                <span className='ok-botton' title='OK'>OK</span>
            </div>
        )
    }

    return (
        <BaseModal Head={BaseHead} Content={BaseDescription} Footer={Footer} title={title} description={description} isExpanded={isExpanded} alwaysExpanded={alwaysExpanded} confirmFunc={confirmFunc} type='confirm' id={id} style={style}/>
    )
}

