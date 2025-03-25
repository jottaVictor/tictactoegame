'use client'
import React from 'react';
import './page.css'
import { BlurProvider } from '@providers/blur' 
import Blur from '../components/blur'
import { ControllerModalProvider } from '@providers/controller-modal'
import ControllerModal from '@components/modal/controller-modal'
import Board from '@components/tictactoe/board'
import Secao from './secao'

const Page = () => {
    return (
        <>
            {/* <h1>Seja bem-vindo! Este é o seu jogo de Tic Tac Toe!</h1> */}
            {/* <Game/> */}
            <BlurProvider>
                    <Blur/>
                    <ControllerModalProvider>
                        <ControllerModal/>
                        {/* <GenericPopUp description='OlaMundo OlaMundo OlaMundo OlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundo'/> */}
                        {/* <YesNo description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'/> */}
                        {/* <Confirm description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'/> */}
                        {/* <BaseModal description='aaaa' alwaysExpanded={false}/> */}
                        <section>
                            <div style = {{ width: '500px', height: '500px'}}>
                                <Board/>
                            </div>
                        </section>
                        {/* <Secao/> */}
                    </ControllerModalProvider>
            </BlurProvider>
        </>
    );
};

//TODO:
/*

Modal:
    - Gerenciar melhor as props

GAME
- websocket
- Após a centralização dos tipos de compentes, tratar o exception
*/

export default Page;