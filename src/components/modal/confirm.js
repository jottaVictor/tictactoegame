'use client';
import '@components/modal/confirm.css'
import 'src/css/index.css'
import React, { memo } from 'react'
import { BaseModal, BaseHead, BaseDescription } from '@components/modal'

export default function Confirm(props){

    const {id, title, description, confirmFunc, isExpanded, alwaysExpanded, style} = props

    const Footer = React.memo((props) => {
        const clickOk = (e) => {
            e.stopPropagation()
            props.confirmFunc()
            props.closeModal()
        }

        return (
            <div className='box-option' onClick={clickOk}>
                <span className='ok-botton' title='OK'>OK</span>
            </div>
        )
    })

    return (
        <BaseModal Head={BaseHead} Content={BaseDescription} Footer={Footer} title={title} description={description} isExpanded={isExpanded} alwaysExpanded={alwaysExpanded} confirmFunc={confirmFunc} type='confirm' id={id} style={style}/>
    )
}

