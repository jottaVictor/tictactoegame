'use client'
import React, { useEffect, useRef, useState } from 'react'
import './page.css'

import Blur from '@components/blur'

import { isToHandleButton } from '@utils/utils'

import { useTheme } from '@providers/theme'

import CreateRoom from './create-rooms'

export default function Page(){
    const {theme} = useTheme()

    const [rooms, setRooms] = useState({})
    const [reload, setReload] = useState(false)
    const [roomsVisible, setRoomsVisible] = useState(null)
    const inputRef = useRef(null)
    const erroList = useRef(false)

    const [formIsActive, setFormIsActive] = useState(false)

    useEffect(() => {
        const socket = new WebSocket("ws://172.18.1.16:5000/game")
        const message = {type: 'getRooms'}

        socket.onopen = () => {
            socket.onmessage = ({data}) => {
                try{
                    let _message = JSON.parse(data.toString())

                    if(!_message.success){
                        erroList.current = true
                        return
                    }
                    erroList.current = false
                    setRooms(_message.data.rooms)
                }catch(error){
                    console.error(error)
                    erroList.current = true
                }finally{
                    socket.close()
                }
            }
            socket.send(JSON.stringify(message))
        }

        return () => {
            socket.close()
        }
    }, [reload])

    useEffect(() => {
        updateRoomsVisible()
    }, [rooms])

    const handleReload = (e) => {
        if(isToHandleButton(e))
            setReload(!reload)
    }

    const handleVisualReload = (e) => {
        if(isToHandleButton(e))
            updateRoomsVisible()
    }

    const noRooms = (hasSearch = false) => {
        return(<div className="warning-no-rooms">
            <div className="warning">
                <h1>SALAS NÂO ENCONTRADAS{hasSearch ? " COM ESSE NOME OU ID" : ""}</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </div>
            <button type="button" onClick={handleReload} onKeyDown={handleReload} className='btn reload'>
                <h1>TENTAR NOVAMENTE</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
            </button>
        </div>)
    }

    const iconPublic = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/></svg>
    const iconPrivate = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>

    const updateRoomsVisible = () => {
        if(erroList.current || !rooms){
            setRoomsVisible(noRooms())
            return
        }

        const elements = []
        const search = inputRef.current.value.trim()

        Object.keys(rooms).map((id) => {
            if(search.length != 0 && !(rooms[id].name.includes(search) || id.includes(search))){
                return
            }

            elements.push(
                <div key={id} className="card-room">
                    <div className="description">
                        <h3>NOME: {rooms[id].name}</h3>
                        <h3>{rooms[id].countPlayers}/2</h3>
                        <h3>ID: {id}</h3>
                        <div className="privacity">
                            {rooms[id].isPublic ? iconPublic : iconPrivate}
                            <h3>{rooms[id].isPublic ? 'Pública' : 'Privada'}</h3>
                        </div>
                    </div>
                    <h2>dono: {rooms[id].ownerPlayer ?? 'sem dono'}</h2>
                    <button>ENTRAR</button>
                </div>
            )

            return id
        })
        setRoomsVisible(elements.length > 0 ? elements : noRooms(search))
    }

    const handleCloseCreateRoom = (e) => {
        if(isToHandleButton(e))
            setFormIsActive(false)
    }
    const handleOpenCreateRoom = (e) => {
        if(isToHandleButton(e))
            setFormIsActive(true)
    }

    return(
        <>
            <Blur></Blur>
            <nav className={theme}>
                <a href="./" className="back btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg></a>
                <img alt="Jogo da Velha"/>
                <h1>multiplayer</h1>
            </nav>
            <main className={theme}>
                <div className="head">
                    <h1>SALAS</h1>
                    <button type="button" className='btn' onClick={handleOpenCreateRoom} onKeyDown={handleOpenCreateRoom} title='Crie uma sala'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"/></svg>
                        <span>CRIAR SALA</span>
                    </button>
                </div>
                <div className="row">
                    <div className="search">
                        <input ref={inputRef} onKeyDown={handleVisualReload} type="text" placeholder="Digite aqui o nome ou id da sala"/>
                        <svg onClick={handleVisualReload} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    </div>
                </div>
                <section className="rooms">
                    <section className="list">
                        {roomsVisible}
                    </section>
                </section>
                <CreateRoom formIsActive={formIsActive} handleCloseButton={handleCloseCreateRoom} disableForm={() => setFormIsActive(false)}/>
                <button type="button" title='Ache uma sala pública' className='btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm320-320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440Z"/></svg>
                    <div className="label">
                        <span>ENTRAR</span>
                        <span>ACHAR SALA PÚBLICA</span>
                    </div>
                </button>
            </main>
            <footer></footer>
        </>
    )
}