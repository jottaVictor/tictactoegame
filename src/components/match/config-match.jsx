'use client'
import React, { useEffect, useRef, useState } from 'react'
import '@components/modal/config-system.css'
import '@components/form/form-modal.css'
import '@components/match/config-match.css'

import { useGame } from '@/providers/game'
import { isToHandleButton } from '@/utils/utils'
import { useControllerModal } from '@/providers/controller-modal'
import { useBlur } from '@providers/blur'

export default function ConfigMatch(){
    const {showBlur, hideBlur} = useBlur()
    const {mode, configLocalGame, setConfigLocalGame, configOnlineGame, setConfigOnlineGame, wsRef} = useGame()
    const { openConfirmModal } = useControllerModal()

    const [formIsActive, setFormIsActive] = useState(false)

    const keepFormActive = mode === 'playerxsocket' && configOnlineGame.dataToConnect?.createRoom && !configOnlineGame.dataToConnect.aliasPlayer
    const isTryingToConnect = configOnlineGame.idRoom === undefined && wsRef.current == null

    useEffect(() => {
        if(mode === 'playerxsocket' && configOnlineGame.dataToConnect?.createRoom && !configOnlineGame.dataToConnect.aliasPlayer){
            setFormIsActive(true)
            showBlur()
        }
    }, [configOnlineGame, mode, setFormIsActive])

    const formRef = useRef()

    const handleSave = (e) => {
        if(!isToHandleButton(e))
            return
        
        const form = formRef.current

        if(isTryingToConnect && form.aliasPlayer.value.trim().length === 0){
            openConfirmModal('Erro', 'você deve preencher seu nome para prosseguir', () => {}, false, false)
            return
        }

        if(mode === 'playerxplayer' && form.aliasPlayer1.value.trim().length === 0){
            openConfirmModal('Erro', 'você deve preencher o nome do seu adversário para prosseguir', () => {}, false, false)
            return
        }

        setFormIsActive(false)

        if(mode === 'playerxplayer'){
            setConfigLocalGame({
                ...configLocalGame, 
                aliasPlayers: [
                    form.aliasPlayer.value,
                    form.aliasPlayer1.value
                ]
            })
        }else if(isTryingToConnect){
            sessionStorage.setItem('dataToConnect', 
                JSON.stringify({
                    ...configOnlineGame.dataToConnect,
                    aliasPlayer: form.aliasPlayer.value
                })
            )
            window.location.reload()
        }else{
            //env msg to edit with websocket
        }
    }

    const handleCloseButton = (e) => {
        if(keepFormActive){
            openConfirmModal("Esperando dados", "Preencha um nome para entrar na sala", ()=>{}, false, false)
            return
        }

        if(isToHandleButton(e))
            setFormIsActive(false)
    }

    return (
        <>
            <button type="button" tabIndex={formIsActive ? -1 : 0} className={`config btn-expansive ${!formIsActive ? "active" : ""}`} title='Configurações' aria-hidden={formIsActive} onClick={() => {setFormIsActive(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>
            </button>
            <form ref={formRef} className={`form-modal ${formIsActive ? "active" : ""}`}>
                <button type="button" className="btn-close" onClick={handleCloseButton} onKeyDown={handleCloseButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
                <div className="head">
                    <h1>Configurações</h1>
                </div>
                <div className="content">
                    {isTryingToConnect && 
                    <div className="input-box">
                        <label>Seu nome:</label>
                        <input type="text" name="aliasPlayer" placeholder='Digite aqui seu nome'/>
                    </div>}
                    {mode === "playerxplayer" && <div className="input-box">
                        <label>Nome do seu adversário:</label>
                        <input type="text" name="aliasPlayer1" placeholder='Digite aqui seu nome'/>
                    </div>}
                </div>
                <div className="input-box">
                    <button type="button" className='btn save' title="Salvar" aria-label='Salvar configuraçẽos, botão' onClick={handleSave} onKeyDown={handleSave}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
                        <span>SALVAR</span>
                    </button>
                </div>
            </form>
        </>
    )
}