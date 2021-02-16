import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { colors } from "./canvas"

// Learn more: https://framer.com/api

export function MiniLogo(props) {
    const { width, height, alt, mono, monoColor } = props
    return (
        <Frame backgroundColor="transparent" {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 449.344 449.344"
            >
                <g transform="matrix(1.33333 0 0 -1.33333 0 449.344)">
                    <path
                        fill="#53251c"
                        fillOpacity={mono ? 0 : 1}
                        d="M260.276 178.134V85.476h-106.25c-43.292 0-76.503 42.595-76.503 86.092v78.464h102.634c43.3 0 80.12-28.41 80.12-71.898"
                    ></path>
                    <path
                        fill={
                            mono
                                ? monoColor
                                : alt
                                ? colors.BrightBlue
                                : colors.Orange
                        }
                        d="M260.276 85.476h-106.25c-43.292 0-76.503 42.595-76.503 86.092v78.465h102.634c43.3 0 80.12-28.41 80.12-71.9zM180.157 276.14H51.415V171.568c0-57.99 44.89-112.2 102.611-112.2h131.566v118.758c0 57.998-47.706 98.014-105.435 98.014"
                    ></path>
                    <path
                        fill={mono ? monoColor : "#fff"}
                        fillRule="evenodd"
                        d="M155.982 104.91h18.706v72.513h21.77v14.383h-21.77v12.352c0 5.717 2.028 7.74 8.072 7.74h13.697V229.6h-15.164c-14.49 0-25.31-7.929-25.31-25.44v-12.353H134.55l4.081-14.383h17.351z"
                    ></path>
                </g>
            </svg>
        </Frame>
    )
}

MiniLogo.defaultProps = {
    alt: false,
    mono: false,
    monoColor: colors.GreyDarker,
}

addPropertyControls(MiniLogo, {
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
