import PError from '../../../utils/pError'

export default class Player{
    readonly id: string
    readonly alias: string | null
    public timeLimit: number | null
    public timeStarted: number | null
    public isMyTime: boolean

    constructor(id: string, alias: string | null, timeLimit: number | null, timeStarted: number | null, isMyTime: boolean){
        this.id = id
        this.alias = alias
        this.timeLimit = timeLimit
        this.timeStarted = timeStarted
        this.isMyTime = isMyTime
    }

    play(timePlayed: number | null): boolean{
        this.validateTurn();
        this.isMyTime = false;

        if (this.timeLimit === null) return true;

        this.validateTimePlayed(timePlayed);
        this.updateTimeLimit(timePlayed!);

        return true;
    }

    private validateTurn(): void {
        if (!this.isMyTime) {
            throw new PError(`Não é a vez do jogador ${this.alias ?? ''}!`);
        }
    }

    private validateTimePlayed(timePlayed: number | null): void {
        if (timePlayed === null || this.timeStarted === null) {
            throw new Error("Erro de lógica na passagem dos tempos");
        }
    }

    private updateTimeLimit(timePlayed: number): void {
        const timeSpent = timePlayed - this.timeStarted!;
        this.timeLimit! -= timeSpent;

        if (this.timeLimit! < 0) {
            throw new PError("Tempo limite gasto.");
        }
    }
}