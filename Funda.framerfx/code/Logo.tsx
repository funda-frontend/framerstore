import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { colors } from "./canvas"

export function Logo(props) {
    const { width, height, alt, monoColor, mono } = props
    return (
        <Frame backgroundColor="transparent" {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.12 150.44">
                <path
                    fill={
                        mono
                            ? monoColor
                            : alt
                            ? colors.BrightBlue
                            : colors.Orange
                    }
                    d="M425.12 150.29l-26-92.43C388.52 21.4 353.81 0 321.76 0H0l25.64 92.59v.14c10.65 36.78 45.39 57.36 75.64 57.71zM47.82 86.38c-.07-.2-12.17-44.1-17.51-63.35h291.4c21.69 0 47.47 14.6 55.23 41.16.08.29 15.51 56 17.52 63.21H102.09c-22.1 0-46.77-15.33-54.28-41z"
                ></path>
                <path
                    fill={colors.Brown}
                    fillOpacity={mono ? 0 : 1}
                    d="M47.81 86.38c-.07-.2-12.17-44.1-17.51-63.35h291.4c21.69 0 47.47 14.6 55.23 41.16.08.29 15.51 56 17.52 63.21H102.09c-22.09 0-46.77-15.33-54.28-41.02z"
                ></path>
                <path
                    fill={mono ? monoColor : "#fff"}
                    fillRule="evenodd"
                    d="M94.56 107.12h10.2V64.21h11.88V56.4h-11.88v-6.71c0-3.11 1.11-4.21 4.41-4.21h7.47v-9.62h-8.28c-7.91 0-13.81 4.31-13.81 13.82v6.71h-11.7l2.23 7.81h9.48zm35-17.02c0 11.52 9 17.62 17 17.62a16.19 16.19 0 0013.12-6h.2v5.41h10.21V56.35h-10.22v30.24c0 6.91-4.32 10.92-10 10.92s-10.11-4-10.11-10.92V56.35h-10.2zm58.59 17.02h10.22V76.88c0-6.91 4.3-10.92 10.12-10.92s10 4 10 10.92v30.24h10.21V73.37c0-11.52-9-17.63-16.92-17.63a16.27 16.27 0 00-13.22 6h-.2v-5.41h-10.21zm85.85 0h10.22v-71.3H274v25.94c-3.8-3.61-7.9-6-13.11-6a16.58 16.58 0 00-13.62 6.61c-2.8 3.6-3.6 6.91-3.6 19.33s.81 15.82 3.6 19.43a16.56 16.56 0 0013.62 6.6 17.88 17.88 0 0013.11-5.91zM264 66c9.52 0 10 8.41 10 15.73s-.5 15.82-10 15.82-10.1-7.91-10.1-15.82S254.38 66 264 66zm64.71 41.12h10.21V72.47c0-12.52-8.6-16.73-21.12-16.73-7.61 0-13.23 2-17.13 7.41l8 6.11c1.81-2.9 4.32-3.9 9.62-3.9 7.31 0 10.41 1.7 10.41 6.51v5.34h-14.14c-10.9 0-16.52 6.91-16.52 15 0 8.81 6.6 15.52 17.92 15.52 6.91 0 10.42-1.6 12.52-5.1h.2zm0-17.83c0 7.91-2.9 8.81-11.42 8.81-6.91 0-9.62-3-9.62-6.41 0-3.7 2.81-6.11 8.82-6.11h12.22z"
                    className="cls-3"
                ></path>
            </svg>
        </Frame>
    )
}

Logo.defaultProps = {
    width: 90,
    height: 32,
    alt: false,
    mono: false,
    monoColor: colors.GreyDarker,
}

addPropertyControls(Logo, {
    alt: { type: ControlType.Boolean },
    mono: { type: ControlType.Boolean },
    monoColor: {
        title: "Color",
        type: ControlType.Color,
        hidden(props) {
            return props.mono === false
        },
    },
})
