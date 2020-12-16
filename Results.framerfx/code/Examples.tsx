import { Data, Override } from "framer"

const appState = Data({ HoofdFoto: "", Adres: "Piet Heinkade 167" })

export function List(): Override {
    return {
        onTapItem(details) {
            console.log(details)
            appState.HoofdFoto = details.HoofdFoto
            appState.Adres = details.Adres
        },
    }
}

export function DetailHoofdFoto(): Override {
    return {
        background: {
            src: appState.HoofdFoto,
        },
    }
}

export function DetailAdres(): Override {
    return {
        text: appState.Adres,
    }
}

function scaleEffect(info) {
    const { normalizedOffset } = info
    console.log()
    return {
        scale: Math.max(0, 1 + Math.min(0, normalizedOffset * -1)),
    }
}

function fadeEffect(info) {
    const { normalizedOffset } = info
    console.log(Math.min(0.5, normalizedOffset * -1))
    return {
        opacity: Math.max(0.5, 1 + Math.min(0.5, normalizedOffset * -1)),
    }
}

export function Carousel(): Override {
    return {
        effect: fadeEffect,
        onTapItem(details) {},
    }
}

export function TwoColumn(): Override {
    return {
        onReady(results) {
            console.log(results)
        },
    }
}
