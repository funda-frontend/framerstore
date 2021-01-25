import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
import { Icon } from "./Icon"
import { colors } from "./canvas"

Button.defaultProps = {
    width: 320,
    height: 44,
    label: "Save",
    showIcon: true,
    nameIcon: "heart",
    onlyIcon: false,
    primary: false,
    alt: false,
    disabled: false,
    onTap: () => null,
}

addPropertyControls(Button, {
    onTap: {
        type: ControlType.EventHandler,
    },
    showIcon: { type: ControlType.Boolean },
    nameIcon: {
        type: ControlType.String,
        title: "Icon Name",
        hidden(props) {
            return props.showIcon === false
        },
    },
    onlyIcon: { type: ControlType.Boolean },
    label: {
        type: ControlType.String,
        title: "Text",
        hidden(props) {
            return props.onlyIcon === true
        },
    },
    primary: {
        type: ControlType.Boolean,
        title: "Variation",
        enabledTitle: "Primary",
        disabledTitle: "Secondary",
    },
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

const transition = {
    ease: [0.23, 1, 0.32, 1],
    duration: 0.25,
}

export function Button(props) {
    const {
        width,
        height,
        label,
        showIcon,
        nameIcon,
        onlyIcon,
        alt,
        disabled,
        onTap,
        primary,
    } = props

    const globalStyle = {
        fontFamily: "Proxima Nova, Proxima Nova Regular, sans-serif",
        fontSize: 16,
        lineHeight: 1.5,
        color: disabled ? colors.Grey : primary ? "#FFF" : colors.LinkNormal,
        background: disabled
            ? colors.GreyLighter
            : primary
            ? alt
                ? colors.Blue
                : colors.Orange
            : alt
            ? colors.NaturalBlue
            : "#FFF",
        radius: 2,
        boxShadow: primary
            ? "0px -1px 0px 0px rgba(0,0,0,0.25) inset"
            : "0px 1px 0px 0px rgba(0,0,0,0.25)",
        border: primary ? "" : `1px solid ${colors.LinkNormal}`,
        cursor: disabled ? "not-allowed" : "pointer",
    }

    return (
        <Stack
            size="100%"
            direction="horizontal"
            distribution="center"
            alignment="center"
            gap={8}
            onTap={disabled ? onTap : null}
            width={width}
            height={height}
            style={globalStyle}
            whileHover={
                disabled
                    ? null
                    : {
                          background: primary
                              ? alt
                                  ? colors.BlueDark
                                  : colors.OrangeDarker
                              : alt
                              ? "#FFF"
                              : colors.NaturalBlue,
                      }
            }
            transition={transition}
        >
            {showIcon ? (
                <Icon
                    name={nameIcon}
                    color={
                        disabled ? colors.Grey : primary ? "#FFF" : colors.Blue
                    }
                />
            ) : null}

            {onlyIcon ? null : <span>{label}</span>}
        </Stack>
    )
}
