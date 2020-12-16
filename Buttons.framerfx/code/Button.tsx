import * as React from "react"
import {
    Frame,
    addPropertyControls,
    ControlType,
    PropertyControls,
} from "framer"
// @ts-ignore
import { colors } from "@framer/funda.colors/code/canvas"

const transition = {
    ease: [0.23, 1, 0.32, 1],
    duration: 0.25,
}

export function Button(props) {
    const { width, height, text, alt, disabled, onTap, variation } = props

    const ButtonStyles = {
        width: "100%",
        height: "100%",
        padding: "10px 24px",
        fontSize: "16px",
        lineHeight: "24px",
        fontFamily: "Proxima Nova Regular, Proxima Nova",
        borderRadius: "2px",
        boxShadow: "0 1px 0 rgba(0,0,0,.1), inset 0 0 0 rgba(0,0,0,.1)",
        cursor: disabled ? "auto" : "pointer",
        transition,
    }

    const primaryTint = alt ? "Blue" : "Orange"
    const secondaryTint = alt ? "White" : "Blue"

    const primaryVariants = {
        primaryInitial: {
            ...ButtonStyles,
            backgroundColor: disabled ? colors.GreyLight : colors[primaryTint],
            color: "white",
        },
        primaryWhileHover: {
            backgroundColor: colors[`${primaryTint}Darker`],
            transition,
        },
        primaryWhileTap: {
            backgroundColor: colors[`${primaryTint}Darker`],
            boxShadow: "0 1px 0 rgba(0,0,0,0), inset 0 0 0 rgba(0,0,0,0)",
            transition,
        },
    }

    const secondaryVariants = {
        secondaryInitial: {
            ...ButtonStyles,
            backgroundColor: alt ? "transparent" : colors.White,
            color: disabled ? colors.GreyLight : colors[secondaryTint],
            border: `1px solid ${
                disabled ? colors.GreyLight : colors[secondaryTint]
            }`,
        },
        secondaryWhileHover: {
            backgroundColor: !alt
                ? colors.NaturalBlue
                : "rgba(255,255,255,0.25)",
            transition,
        },
        secondaryWhileTap: {
            backgroundColor: !alt
                ? colors.NaturalBlue
                : "rgba(255,255,255,0.25)",
            boxShadow: "0 1px 0 rgba(0,0,0,0), inset 0 0 0 rgba(0,0,0,0)",
            transition,
        },
    }

    if (disabled) {
        return (
            <Frame
                variants={
                    variation === "Primary"
                        ? primaryVariants
                        : secondaryVariants
                }
                initial={
                    variation === "Primary"
                        ? "primaryInitial"
                        : "secondaryInitial"
                }
            >
                {text}
            </Frame>
        )
    } else {
        return (
            <Frame
                variants={
                    variation === "Primary"
                        ? primaryVariants
                        : secondaryVariants
                }
                initial={
                    variation === "Primary"
                        ? "primaryInitial"
                        : "secondaryInitial"
                }
                whileHover={
                    variation === "Primary"
                        ? "primaryWhileHover"
                        : "secondaryWhileHover"
                }
                onTap={onTap}
                whileTap={
                    variation === "Primary"
                        ? "primaryWhileTap"
                        : "secondaryWhileTap"
                }
            >
                {text}
            </Frame>
        )
    }
}

Button.defaultProps = {
    width: 320,
    height: 44,
    text: "Submit",
    variation: "Primary",
    alt: false,
    disabled: false,
    onTap: () => null,
}

addPropertyControls(Button, {
    onTap: {
        type: ControlType.EventHandler,
    },
    text: {
        type: ControlType.String,
        title: "Text",
    },
    variation: { type: ControlType.Enum, options: ["Primary", "Secondary"] },
    alt: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Alternative",
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
    },
})
