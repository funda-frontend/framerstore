import { Data, Override } from "framer"

const data = Data({ hasFocus: false })

export function EmailInput(): Override {
    return {
        hasFocus: data.hasFocus,
        onBlur(value: any) {
            data.hasFocus = false
            console.log(`focus = ${data.hasFocus}, ${value}`)
        },
        onFocus(value: any) {
            data.hasFocus = true
            console.log(`focus = ${data.hasFocus}, ${value}`)
        },
    }
}

export function FocusIt(): Override {
    return {
        onTap() {
            data.hasFocus = true
        },
    }
}

export function BlurIt(): Override {
    return {
        onTap() {
            data.hasFocus = false
        },
    }
}
