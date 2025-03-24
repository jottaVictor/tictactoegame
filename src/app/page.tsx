import React from 'react';
// import Game from '../../public/components/game.js';
import Board from '../components/tictactoe/board'
import { Confirm } from '../components/modal/confirm'
import { YesNo } from '../components/modal/yes-no'
import { BlurProvider } from '../providers/blur' 
import './page.css'
import Blur from '../components/blur';

const Page = () => {
    return (
        <>
            {/* <h1>Seja bem-vindo! Este é o seu jogo de Tic Tac Toe!</h1> */}
            {/* <Game/> */}
            <BlurProvider>
                    <Blur/>
                    {/* <GenericPopUp description='OlaMundo OlaMundo OlaMundo OlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundo'/> */}
                    <YesNo description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'/>
                    {/* <Confirm description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'/> */}
                    <section>
                        <div style = {{ width: '500px', height: '500px'}}>
                            {/* <Board/> */}
                            {/* sBorders="bg-green-500!" firstToPlay="Y"  */}
                        </div>
                    </section>
            </BlurProvider>
        </>
    );
};

//TODO:
/*

POPUP
- Mudar o nome dos popups para modal *
- Componentizar melhor tipos de modal (está sendo repetido algumas estruturas)
- componente para a exibição dos modal !!!

GAME
- websocket
- Após a centralização dos tipos de compentes, tratar o exception
*/

export default Page;