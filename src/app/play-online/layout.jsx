import { ControllerModalProvider } from '@providers/controller-modal'

export default function GameLayout({ children }) {
    return (
        <ControllerModalProvider>
            {children}
        </ControllerModalProvider>
    )
}