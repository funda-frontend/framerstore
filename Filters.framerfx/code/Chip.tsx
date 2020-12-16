import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
// @ts-ignore
// import { IconClose } from "./canvas"
// @ts-ignore
import { colors } from "@framer/funda.colors/code/canvas"
// @ts-ignore
// import { Icon } from "@framer/funda.icons/code/Icon"

Chip.defaultProps = {
    height: 128,
    width: 240,
    label: "Label",
    quick: false,
    onTap: () => null,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Chip, {
    label: {
        title: "label",
        type: ControlType.String,
        defaultValue: "",
    },
    quick: { title: "Quick", type: ControlType.Boolean },
})

export function Chip(props) {
    const { label, onTap, ...rest } = props

    return (
        <Frame
            style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Proxima Nova",
                fontSize: 16,
                lineHeight: 2,
                width: "auto",
                height: 32,
                backgroundColor: colors.NaturalBlue,
                padding: "0 8px",
                borderRadius: 4,
                color: colors.Blue,
                position: "relative",
                margin: "0 8px 8px 0",
            }}
            {...rest}
            onTap={onTap}
        >
            <span style={{ paddingRight: 4 }}>{label}</span>
            <span
                style={{
                    width: 16,
                    height: 16,
                    marginTop: 2,
                    marginRight: 0,
                }}
            ></span>
        </Frame>
    )
}
