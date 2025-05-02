import React, { useEffect, useState } from 'react'

import './create-room.css'
import '@components/form/form-modal.css'
import Toggle from '@components/toggle'

import { useBlur } from '@providers/blur'
import { useTheme } from '@providers/theme'

export default function CreateRoom({formIsActive, handleCloseButton}){
    const {showBlur, hideBlur} = useBlur()
    const {theme} = useTheme()

    const [config, setConfig] = useState({
        game: {
            timeLimitByPlayer: null,
            firstPlayer: "self",
        },
        room: {
            ownerPlayer: "self",
            isPublic: true,
            password: ""
        }
    })

    const [hasTimeLimit, setHasTimeLimit] = useState(false)

    useEffect(() => {
        if(formIsActive) showBlur()
        else hideBlur()
    }, [formIsActive, showBlur, hideBlur])

    return(
        <>
        <form className={`form-modal ${theme} ${formIsActive ? "active" : ""}`}>
            <button type="button" className="btn-close" onClick={handleCloseButton} onKeyDown={handleCloseButton}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
            <div className="head">
                <h1>CRIAR SALA</h1>
            </div>
            <div className="content">
                <div className="input-box">
                    <label>Nome</label>
                    <input type="text" placeholder='Dê um nome para a sala.'/>
                </div>
                <div className="input-box">
                    <label>Sua sala será pública?</label>
                    <input type="checkbox"/>
                </div>
                <div className={`input-box ${config.isPublic ? 'active' : ''}`}>
                    <label>Senha</label>
                    <input type="text" placeholder="Digite uma senha"/>
                </div>
                <div className="input-box">
                    <label>Terá tempo limite por jogadas?</label>
                    <Toggle target={hasTimeLimit} onChange={() => {setHasTimeLimit(!hasTimeLimit)}}/>
                </div>
                <div className={`input-box ${config.timeLimitByPlayer !== null ? 'active' : ''}`}>
                    <label>Tempo limite</label>
                    <input type="text" placeholder="Digite quanto tempo (em segundos)"/>
                </div>
                <hr/>
                <div className="input-box">
                    <label>Seu nome</label>
                    <input type="text" placeholder="Como quer ser conhecido?"/>
                </div>
                <div className="input-box">
                    <button type='button' className={`btn-${theme} mt-[5px]`}>CRIAR SALA</button>
                </div>
            </div>
        </form>
        </>
    )
}