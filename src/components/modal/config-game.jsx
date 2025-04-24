'use client';
import 'src/css/index.css'
import './config-game.css'
import React, { useEffect, useState } from 'react'
import { log } from '@utils/utils'
import { useTheme } from '@providers/theme'
import { useBlur } from '@providers/blur'
import { isToHandleButton } from "@utils/utils"

export default function ConfigGame(){
    const [formIsActive, setFormIsActive] = useState(false)
    const {showBlur, hideBlur} = useBlur()
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        if(formIsActive) showBlur()
        else hideBlur()
    }, [formIsActive, showBlur, hideBlur])

    const handleCloseButton = (e) => {
        if(isToHandleButton(e))
            setFormIsActive(false)
    }

    const handleChangeSelect = (e) => {
        setTheme(e.target.value)
        log("Novo tema selecionado", e.target.value)
    }

    return (
        <>
            <button type="button" tabIndex={formIsActive ? -1 : 0} className={`config ${!formIsActive ? "active" : ""}`} title='Configurações' aria-hidden={formIsActive} onClick={() => {setFormIsActive(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>
            </button>
            <form className={`game-config ${formIsActive ? "active" : ""}`}>
                <button type="button" className="btn-close" onClick={handleCloseButton} onKeyDown={handleCloseButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
                <div className="head">
                    <h1>Configurações</h1>
                </div>
                <div className="content">
                    <div className="input-box">
                        <label>Tema:</label>
                        <select name="theme" value={theme} onChange={handleChangeSelect}>
                            <option value="dark">Escuro</option>
                            <option value="light" disabled>Claro</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label>Idioma:</label>
                        <select name="language" value="pt-br" onChange={() => {}}>
                            <option value="pt-br">Português (Brasil)</option>
                            <option value="others" disabled>Outros idiomas disponíveis em breve</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    )
}

