import React, { useEffect, useState, useRef } from 'react'

import './create-room.css'
import '@components/form/form-modal.css'
import Toggle from '@components/toggle'

import { useBlur } from '@providers/blur'
import { useGame } from '@providers/game'

export default function CreateRoom({formIsActive, handleCloseButton, handleCreateRoom, disableForm}){
    const {showBlur, hideBlur} = useBlur()
    const {config, setConfig, gameRef, playerDataRef, wsRef} = useGame()

    const [clicked, setClicked] = useState(false)

    const formRef = useRef(null)

    const [isPublic, setIsPublic] = useState()

    const [hasTimeLimit, setHasTimeLimit] = useState(false)

    const handleClick = () => {
        if(clicked){
            disableForm()
            return
        }

        setClicked(true)

        const form = formRef.current

        const __config = {...config, game: {firstPlayer: "self"}, room: {ownerPlayer: "self"}}
        __config.game.timeLimitByPlayer = form.hasTimeLimit.checked && form.timeLimit.value ? form.timeLimit.value : null
        __config.room.name = form.roomName.value
        __config.room.isPublic = form.isPublic.checked
        __config.room.password = form.password?.value ?? ''
        __config.mode = "playerxsocket"
        setConfig(__config)
        
        if(playerDataRef.current)
            playerDataRef.current.aliasPlayer = form.aliasPlayer.value
        else
            playerDataRef.current = {aliasPlayer: form.aliasPlayer.value}

        wsRef.current = new WebSocket('ws://172.18.16.1:5000/game')

        const playerData = playerDataRef.current
        const ws = wsRef.current

        const __message = {}
        __message.type = 'connectPlayerInGame'
        __message.data = { aliasPlayer: playerData.aliasPlayer }

        ws.onopen = () => ws.send(
            JSON.stringify(__message)
        )

        ws.onmessage = ({data}) => {
            let _message = JSON.parse(data.toString())
            console.log(_message)

            if(data.type === 'connectPlayerInGame'){
                playerDataRef.current = _message.data.playerData
                gameRef.current = _message.data.game
                handleCreateRoom()
                return
            }

            if(data.type === 'markafield'){
                gameRef.current = _message.data.game
                return
            }
            
            console.log(`Received: ${data}`)
        }
        
        disableForm()
    }

    useEffect(() => {
        if(formIsActive) showBlur()
        else hideBlur()
    }, [formIsActive, showBlur, hideBlur])

    return(
        <form ref={formRef} className={`form-modal ${formIsActive ? "active" : ""}`}>
            <button type="button" className="btn-close" onClick={handleCloseButton} onKeyDown={handleCloseButton}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </button>
            <div className="head">
                <h1>CRIAR SALA</h1>
            </div>
            <div className="content">
                <div className="input-box">
                    <label>Nome</label>
                    <input name="roomName" type="text" placeholder='Dê um nome para a sala.'/>
                </div>
                <div className="input-box">
                    <label>Sua sala será pública?</label>
                    <Toggle target={isPublic} onChange={() => {setIsPublic(!isPublic)}} name="isPublic"/>
                </div>
                {isPublic === false? (
                    <div className={`input-box`}>
                        <label>Senha para a sala</label>
                        <input name="password" type="text" placeholder="Digite uma senha"/>
                    </div>
                ) : <></>}
                <div className="input-box">
                    <label>Terá tempo limite por jogadas?</label>
                    <Toggle target={hasTimeLimit} onChange={() => {setHasTimeLimit(!hasTimeLimit)}} name="hasTimeLimit"/>
                </div>
                {hasTimeLimit ? (
                    <div className="input-box">
                        <label>Tempo limite</label>
                        <input name="timeLimit" type="text" placeholder="Digite o tempo (em segundos)"/>
                    </div>
                ) : <></>}
                <hr/>
                <div className="input-box">
                    <label>Seu nome</label>
                    <input name="aliasPlayer" type="text" placeholder="Como quer ser conhecido?"/>
                </div>
                <div className="input-box">
                    <button type='button' className="btn mt-[5px]" onClick={handleClick}>CRIAR SALA</button>
                </div>
            </div>
        </form>
    )
}