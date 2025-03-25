import Player from './player'
import { generateId } from "@utils/utils"
import PError from '@utils/pError'

type Board = (number | null)[][]

enum indexPlayer {
    First = 0,
    Second = 1
}

export default class Game{
    private board: Board
    private timeLimitByPlayer: number | null
    private players: [Player | null, Player | null]
    private indexPlayerFirst: indexPlayer
    private winnerID: string | null

    constructor(timeLimitByPlayer: number | null, indexPlayerFirst: indexPlayer){
        this.timeLimitByPlayer = timeLimitByPlayer
        this.board = Array.from({ length: 3 }, () => Array(3).fill(null));
        this.players = [null, null]
        this.indexPlayerFirst = indexPlayerFirst
        this.winnerID = null
    }

    joinInGame(alias: string | null): Player{
        if(this.players[0] !== null && this.players[1] !== null)
            throw new Error("O jogo já está lotado.")

        const newPlayer = new Player(generateId(), alias, this.timeLimitByPlayer, null, false)
        
        if(this.players[0] === null){
            this.players[0] = newPlayer
        }else{
            this.players[1] = newPlayer
        }

        return newPlayer
    }

    getIndexPlayerById(id: string): indexPlayer{
        if(this.players[0]?.id === id)
            return 0
        if(this.players[1]?.id === id)
            return 1

        throw new PError(`O jogador não faz parte do jogo!`)
    }

    getPlayerById(id: string): Player{
        console.log('player aqui', this.players[this.getIndexPlayerById(id)])
        return this.players[this.getIndexPlayerById(id)]
    }

    getIndexOpposingPlayerById(id: string): indexPlayer{
        if(this.players[0]?.id === id && this.players[1] !== null)
            return 1
        if(this.players[1]?.id === id && this.players[0] !== null)
            return 0

        throw new PError(`Não foi achado um jogador oponente!`)
    }

    startGame(){
        const fPlayer = this.players[this.indexPlayerFirst]!
        fPlayer.isMyTime = true

        if(this.timeLimitByPlayer)
            fPlayer.timeStarted = Date.now()
    }

    markAField(idPlayer: string, row: number, col: number){
        if(this.winnerID)
            throw new PError("O jogo já terminou! Comece outro para jogar novamente")

        const indexCurrentPlayer = this.getIndexPlayerById(idPlayer)
        const currentPlayer = this.players[indexCurrentPlayer]!
        const opposingPlayerById = this.players[this.getIndexOpposingPlayerById(idPlayer)]!

        this.validateField(row, col)
        
        try{
            currentPlayer.play(Date.now())
        }catch(e){
            if(e instanceof PError && e.message === "Tempo limite gasto.")
                this.winnerID = opposingPlayerById.id

            throw e
        }

        opposingPlayerById.isMyTime = true
        opposingPlayerById.timeStarted = Date.now()

        this.board[row][col] = indexCurrentPlayer

        const resultEndGame = this.checkEndGame()

        if(!resultEndGame)
            return true

        if(resultEndGame !== true){
            this.winnerID = resultEndGame
        }

        throw new PError("Fim de jogo!")
    }
    
    private validateField(row: number, col: number): void {
        if (this.board[row][col] !== null) {
            throw new PError("A posição já foi preenchida, jogue em uma posição válida!");
        }
    }

    /**
     * Return the `idPlayer` who won, `true` when the game has ended and `false` when the game don't end
     * @returns {String | boolean}
     */
    private checkEndGame(){
        let winnerSymbols: (number | null)[] = []
        let hasFieldsToPlay = false

        for(let i = 0; i < 3; i++){
            let currents = [
                this.board[i][i],
                this.board[i][2-i],
                this.board[0][i],
                this.board[1][i],
                this.board[2][i],
                this.board[i][0],
                this.board[i][1],
                this.board[i][2]
            ]


            if(i == 0){
                winnerSymbols = [...currents]
            }

            for(let k = 0; k < 8; k++){
                if(currents[k] === null){
                    hasFieldsToPlay = true
                }

                if(i !== 0 && winnerSymbols[k] !== currents[k]){
                    winnerSymbols[k] = null
                }

                if(i == 2 && winnerSymbols[k] !== null){
                    console.log(`O jogador ${(winnerSymbols[k]+1)} ganhou!`)
                    return this.players[winnerSymbols[k]]?.id
                }
            }
        }

        if(!hasFieldsToPlay)
            return true

        return false
    }
}
