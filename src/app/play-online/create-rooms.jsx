import React, { useEffect, useState, useRef } from 'react'

import './create-room.css'
import '@components/form/form-modal.css'
import Toggle from '@components/toggle'

import { useBlur } from '@providers/blur'

import { generateId } from '@utils/utils'

export default function CreateRoom({formIsActive, handleCloseButton, disableForm}){
    const {showBlur, hideBlur} = useBlur()

    const formRef = useRef(null)

    const [isPublic, setIsPublic] = useState(true)

    const [hasTimeLimit, setHasTimeLimit] = useState(false)

    const handleClick = () => {
        const form = formRef.current

        const dataToConnect = {
            idPlayer: generateId(),
            createRoom: true,
        }

        const dataToEdit = {
            game: {
                firstPlayer: "self",
                timeLimitByPlayer: form.hasTimeLimit.checked && form.timeLimit.value ? form.timeLimit.value : null,
            },
            room: {
                nameRoom: form.roomName.value,
                ownerPlayer: "self",
                isPublic: form.isPublic.checked,
                password: form.password?.value ?? ''
            }
        }

        sessionStorage.setItem("dataToConnect", JSON.stringify(dataToConnect))
        sessionStorage.setItem("dataToEdit", JSON.stringify(dataToEdit))

        window.location.href = "../../match?m=playerxsocket"
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
                    <button type='button' className="btn mt-[5px]" onClick={handleClick}>CRIAR SALA</button>
                </div>
            </div>
        </form>
    )
}