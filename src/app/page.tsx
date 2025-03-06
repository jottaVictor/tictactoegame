import React from 'react';
// import Game from '../../public/components/game.js';
import Board from '../../public/components/tictactoe/board/board'
import './page.css'

const Page = () => {
    return (
      <div>
          <h1>Seja bem-vindo! Este é o seu jogo de Tic Tac Toe!</h1>
          {/* <Game/> */}
          <section>
              <div style = {{ width: '500px', height: '500px'}}>
                  <Board sBorders="bg-green-500" firstToPlay="Y" />
              </div>
          </section>
      </div>
  );
};

export default Page;