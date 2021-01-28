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
    variation: "primary",
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
    variation: {
        type: ControlType.Enum,
        title: "Variation",
        defaultValue: "Primary",
        options: ["primary", "secondary", "tertiary"],
        optionTitles: ["Primary", "Secondary", "Tertiary"],
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
        variation,
    } = props

    const globalStyle = {
        fontFamily: "Proxima Nova, Proxima Nova Regular, sans-serif",
        fontSize: 16,
        lineHeight: 1.5,
        color: disabled
            ? colors.Grey
            : variation == "primary"
            ? "#FFF"
            : colors.LinkNormal,
        background: disabled
            ? colors.GreyLighter
            : variation == "primary"
            ? alt
                ? colors.Blue
                : colors.Orange
            : alt
            ? colors.NaturalBlue
            : "#FFF",
        radius: 2,
        boxShadow: !disabled
            ? variation == "primary"
                ? "0px -1px 0px 0px rgba(0,0,0,0.25) inset"
                : variation == "secondary"
                ? "0px 1px 0px 0px rgba(0,0,0,0.25)"
                : ""
            : "",
        border:
            variation == "primary" || variation == "tertiary"
                ? ""
                : !disabled
                ? `1px solid ${colors.LinkNormal}`
                : "",
        cursor: disabled ? "not-allowed" : "pointer",
    }

    function handleTap() {
        if (!disabled) {
            onTap()
        } else {
            return
        }
    }

    return (
        <Stack
            size="100%"
            direction="horizontal"
            distribution="center"
            alignment="center"
            gap={8}
            onTap={handleTap}
            width={width}
            height={height}
            style={globalStyle}
            whileHover={
                disabled
                    ? null
                    : {
                          background:
                              variation == "primary"
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
                        disabled
                            ? colors.Grey
                            : variation == "primary"
                            ? "#FFF"
                            : colors.Blue
                    }
                />
            ) : null}

            {onlyIcon ? null : <span>{label}</span>}
        </Stack>
    )
}
