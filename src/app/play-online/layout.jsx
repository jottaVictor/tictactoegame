import { GameProvider } from "@providers/game"

export default function GameLayout({ children }) {
    return (
        <GameProvider>
            {children}
        </GameProvider>
    )
}