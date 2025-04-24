import { EventHandler } from "react";

export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function log(...args: any) {
    if(process.env.NEXT_PUBLIC_LOG === "true")
        console.log(...args)
}

export function isToHandleButton(e: any){
    if(e.type === "click" || (e.type === "keydown" && e.key === "Enter"))
        return true

    return false
}