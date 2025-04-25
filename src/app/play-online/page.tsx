'use client'
import React, { useEffect, useRef, useState } from 'react'
import './page.css'
import Blur from '@components/blur'
import { isToHandleButton } from '@utils/utils'

export default function Page(){
    const [rooms, setRooms] = useState({})
    const [reload, setReload] = useState(false)
    const erroList = useRef(false)

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5000/game")
        const message = {typ: 'get-rooms'}
        
        socket.onopen = () => {
            socket.onmessage = ({data}) => {
                let _message = JSON.parse(data.toString())

                if(!_message.sucess){
                    erroList.current = true
                    return
                }

                erroList.current = false

                setRooms(_message.data.rooms)
            }
            socket.send(JSON.stringify(message))
        }

        socket.close()
    }, [reload])

    const handleReload = (e) => {
        if(isToHandleButton(e))
            setReload(!reload)
    }

    const errorListRooms = (
        <div className="error-list-rooms">
            <h1>Houve um error ao listar a página</h1>
            <button type="button" onClick={handleReload} onKeyDown={handleReload} className='btn-dark'>
                <h1>TENTAR NOVAMENTE</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/></svg>
            </button>
        </div>
    )

    const renderRooms = () => {
        if(!erroList.current)
            errorListRooms

        const elements = []

        Object.keys(rooms).map((room, id) => {
            elements.push(<>
                <div className="card-room">
                    <div className="description">
                        <h3>nome: aoskdasd</h3>
                        <h3>x/2</h3>
                        <h3>id: sadasd</h3>
                        <div className="privacity">
                            <h3>PUBLICO</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/></svg>
                        </div>
                        <h2>criado por: joao victor</h2>
                    </div>
                    <button type="button" className='btn-dark'>ENTRAR</button>
                </div>
            </>)

            return room
        })

        const noRooms = (
            <div className="warning-no-rooms">
                <h1>SEM SALAS NO MOMENTO</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
            </div>
        )

        return Object.keys(rooms).length > 0 ? elements : noRooms
    }

    return (
        <>
            <Blur></Blur>
            <nav className='ola'>
                <img alt="Jogo da Velha"/>
                <h1>multiplayer</h1>
            </nav>
            <main>
                <div className="head">
                    <h1>SALAS</h1>
                    <button type="button" className='btn-dark' title='Crie uma sala'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z"/></svg>
                        <span>CRIAR SALA</span>
                    </button>
                </div>
                <section className="rooms">
                    <section className="list">
                        {renderRooms()}
                    </section>
                </section>
                <button type="button" title='Ache uma sala pública' className='btn-dark'>
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