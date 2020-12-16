import * as React from "react"
import { Frame } from "framer"

export const isValidComponent = (component?: any): boolean => {
    if (!!component) {
        return !!component[0]
    } else {
        return false
    }
}

/**
 * @returns a component with usage instructions if any of the arguments are not valid. If all arguments are valid, returns undefined.
 */
// @ts-ignore
export function showInstructions(component: any[]): JSX.Element | undefined {
    if (isValidComponent(component)) {
        return undefined
    }
    return (
        <Frame
            width="100%"
            height="100%"
            style={{
                fontFamily: "Courier",
                fontSize: 14,
                lineHeight: 1.5,
                padding: 20,
                color: "#bb88ff",
                backgroundColor: "#2f2546",
                border: "1px solid #8855ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <h1>Instructions</h1>
            <p>Use this component to show the output of the ZoekBox Input.</p>
            <h2>Steps</h2>
        </Frame>
    )
}

// @ts-ignore
export function Suggestion(props): JSX.Element | undefined {
    const { width, height, backgroundColor, Name, SubText, Count } = props

    return (
        <Frame
            width={width}
            height={height}
            style={{
                backgroundColor: backgroundColor,
                borderBottom: "0.5px solid #CCC",
            }}
        >
            <Frame
                top={16}
                left={16}
                width={24}
                height={24}
                backgroundColor="transparent"
            >
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zM17.5 9a5.5 5.5 0 0 0-11 0c0 2.846 1.806 6.452 5.5 10.743 3.694-4.291 5.5-7.897 5.5-10.743zm-4.94 12.38a.75.75 0 0 1-1.12 0C7.147 16.558 5 12.431 5 9a7 7 0 1 1 14 0c0 3.431-2.147 7.558-6.44 12.38z"
                        fill="#666666"
                        fillRule="evenodd"
                    />
                </svg>
            </Frame>
            <Frame
                left={48}
                top={30}
                width={width - 48 - 16}
                backgroundColor="transparent"
                height={20}
                style={{
                    color: "#666",
                    fontFamily: "Proxima Nova, sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    textAlign: "left",
                }}
            >
                {SubText}
            </Frame>
            <Frame
                top={18}
                right={16}
                width={"auto"}
                height={20}
                backgroundColor="transparent"
                style={{
                    color: "#666",
                    fontFamily: "Proxima Nova, sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    textAlign: "right",
                }}
            >
                {Count}
            </Frame>
        </Frame>
    )
}

Suggestion.defaultProps = {
    width: 375,
    height: 56,
    backgroundColor: "#FFF",
}

// @ts-ignore
export function None(props): JSX.Element | undefined {
    const { width, height, backgroundColor } = props
    return (
        <Frame backgroundColor={backgroundColor} width={width} height={height}>
            <Frame
                width={24}
                height={24}
                left={16}
                top={16}
                backgroundColor="transparent"
            >
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M17.385 20.05v-8.58l1.5 1.665V20.8a.75.75 0 0 1-.75.75h-12.5a.75.75 0 0 1-.75-.75v-7.665l1.5-1.665v8.58h11zm-7-6.78a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 1 1 1.5 0v1.5zm4.5 0a.75.75 0 1 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5zM8.21 17.38a.75.75 0 0 1 .345-1 7.12 7.12 0 0 1 6.66 0 .75.75 0 1 1-.665 1.345 5.635 5.635 0 0 0-5.34 0 .75.75 0 0 1-1-.345zm12.84-5.08l.005.005a.75.75 0 0 1-1.115 1l-1.055-1.17-1.5-1.665-5.5-6.11-5.5 6.11-1.5 1.665-1.05 1.165a.75.75 0 1 1-1.115-1l8.615-9.56c.015-.035.05-.035.05-.035l.045-.07a.75.75 0 0 1 .185-.11h.09a.75.75 0 0 1 .18-.025c.095.007.189.023.28.05a.75.75 0 0 1 .12.09.725.725 0 0 1 .1.075l.06.03L21.05 12.3z"
                        fill="#666666"
                        fillRule="evenodd"
                    />
                </svg>
            </Frame>
            <Frame
                width={width - 48 - 16}
                height={24}
                left={48}
                top={16}
                backgroundColor="transparent"
                style={{
                    color: "#333",
                    fontFamily: "ProximaNova-Regular",
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.5,
                    textAlign: "left",
                }}
            >
                {"Geen locatie gevonden"}
            </Frame>
        </Frame>
    )
}
None.defaultProps = {
    width: 375,
    height: 56,
    backgroundColor: "#FFF",
}

export const dummyData = [
    {
        Display: {
            Niveau: null,
            NiveauLabel: "Plaats",
            Naam: "Amsterdam",
            Parent: null,
            Postfix: null,
            HuisnummerToevoeging: null,
        },
        Aantal: 3479,
        Niveau: 0,
        Parent: 145110,
        Exact: false,
        Identifier: null,
        GeoIdentifier: "amsterdam",
        GlobalId: 145170,
    },
    {
        Display: {
            Niveau: null,
            NiveauLabel: "Plaats",
            Naam: "Almere",
            Parent: null,
            Postfix: null,
            HuisnummerToevoeging: null,
        },
        Aantal: 742,
        Niveau: 0,
        Parent: 9490,
        Exact: false,
        Identifier: null,
        GeoIdentifier: "almere",
        GlobalId: 9525,
    },
    {
        Display: {
            Niveau: null,
            NiveauLabel: "Plaats",
            Naam: "Amersfoort",
            Parent: null,
            Postfix: null,
            HuisnummerToevoeging: null,
        },
        Aantal: 630,
        Niveau: 0,
        Parent: 188227,
        Exact: false,
        Identifier: null,
        GeoIdentifier: "amersfoort",
        GlobalId: 188234,
    },
]
