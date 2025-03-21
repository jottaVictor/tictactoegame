import React from 'react';
// import Game from '../../public/components/game.js';
import Board from '../components/tictactoe/board'
import { BaseModal } from '../components/pop-up/base-modal'
import { YesNo } from '../components/pop-up/yes-no'
import { Confirm } from '../components/pop-up/confirm'
import { BlushProvider } from '../providers/blush' 
// import Blush from '../../public/js/components/main'
import './page.css'
import Blush from '../components/blush';

const Page = () => {
    return (
        <>
            {/* <h1>Seja bem-vindo! Este é o seu jogo de Tic Tac Toe!</h1> */}
            {/* <Game/> */}
            <BlushProvider>
                    <Blush/>
                    {/* <GenericPopUp description='OlaMundo OlaMundo OlaMundo OlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundoOlaMundo'/> */}
                    {/* <YesNoPopUp title='Responda' description='Sim ou não?' alwaysExpanded={false} isExpanded={false} timeToClose={500}/> */}
                    <Confirm description='aqui usamos cookies. aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.aqui usamos cookies.'/>
                    <section>
                        <div style = {{ width: '500px', height: '500px'}}>
                            {/* <Board/> */}
                            {/* sBorders="bg-green-500!" firstToPlay="Y"  */}
                        </div>
                    </section>
            </BlushProvider>
        </>
    );
};

//TODO:
/*

POPUP
- Mudar o nome dos popups para modal
- Componentizar melhor tipos de modal (está sendo repetido algumas estruturas)
- componente para a exibição dos modal

GAME
- websocket
- Após a centralização dos tipos de compentes, tratar o exception
*/

export default Page;