import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
import { Icon } from "./Icon"
import { colors } from "./canvas"

Button.defaultProps = {
    radius: 2,
    stretch: true,
    padding: 16,
    label: "Save",
    content: "Icon + Label",
    icon: "heart",
    animate: false,
    initialState: false,
    transition: "",
    iconOn: "heartFilled",
    iconOnColor: colors.Red,
    labelOn: "Saved",
    variation: "primary",
    alt: false,
    disabled: false,
    onTap: () => null,
}

addPropertyControls(Button, {
    onTap: {
        type: ControlType.EventHandler,
    },
    content: {
        type: ControlType.Enum,
        options: ["iconLabel", "icon", "label"],
        optionTitles: ["Icon + Label", "Icon", "Label"],
    },
    icon: {
        type: ControlType.String,
        hidden(props) {
            return props.content === "label"
        },
    },
    label: {
        type: ControlType.String,
        hidden(props) {
            return props.content === "icon"
        },
    },
    radius: { type: ControlType.Number },
    stretch: { type: ControlType.Boolean, title: "Stretch width" },
    padding: {
        type: ControlType.Number,
        hidden(props) {
            return props.stretch == true
        },
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
    },
    variation: {
        type: ControlType.Enum,
        title: "Variation",
        defaultValue: "Primary",
        options: ["primary", "secondary", "tertiary", "transparent"],
        optionTitles: ["Primary", "Secondary", "Tertiary", "Transparent"],
        hidden(props) {
            return props.disabled == true
        },
    },
    alt: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "Alternative",
        hidden(props) {
            return props.disabled == true
        },
    },
    animate: {
        type: ControlType.Boolean,
        hidden(props) {
            return props.disabled == true
        },
    },
    initialState: {
        type: ControlType.Boolean,
        enabledTitle: "On",
        disabledTitle: "Off",
        hidden(props) {
            return props.animate == false
        },
    },
    transition: {
        type: ControlType.Transition,
        hidden(props) {
            return props.animate == false
        },
    },
    iconOn: {
        type: ControlType.String,
        hidden(props) {
            return props.animate == false
        },
    },
    iconOnColor: {
        type: ControlType.Color,
        hidden(props) {
            return props.animate == false
        },
    },
    labelOn: {
        type: ControlType.String,
        hidden(props) {
            return props.animate == false
        },
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
        radius,
        stretch,
        padding,
        content,
        label,
        icon,
        alt,
        disabled,
        onTap,
        variation,
        animate,
        initialState,
        transition,
        iconOn,
        iconOnColor,
        labelOn,
    } = props

    const [isOn, setIsOn] = React.useState(initialState)

    React.useEffect(() => {
        setIsOn(initialState)
    }, [initialState])

    const globalStyle = {
        width: stretch ? "100%" : "auto",
        height: stretch ? "100%" : 44,
        padding: content == "icon" ? "0 10px" : `0 ${padding}px`,
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
        radius,
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
            if (animate) {
                setIsOn(!isOn)
            }
        } else {
            return
        }
    }

    return (
        <Stack
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
            {content !== "label" && (
                <Frame backgroundColor="transparent" size={24}>
                    <Icon
                        name={icon}
                        color={
                            disabled
                                ? colors.Grey
                                : variation == "primary"
                                ? "#FFF"
                                : colors.Blue
                        }
                        opacity={animate && isOn ? 0 : 1}
                        animate={
                            animate && isOn
                                ? { scale: 0.5, opacity: 0 }
                                : { scale: 1, opacity: 1 }
                        }
                        transition={transition}
                    />
                    {animate && (
                        <Icon
                            name={iconOn}
                            color={iconOnColor}
                            opacity={isOn ? 1 : 0}
                            animate={
                                animate && isOn
                                    ? { scale: 1, opacity: 1 }
                                    : { scale: 0.5, opacity: 0 }
                            }
                            transition={transition}
                        />
                    )}
                </Frame>
            )}

            {content !== "icon" && (
                <Frame
                    backgroundColor="transparent"
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                >
                    {animate && isOn ? labelOn : label}
                </Frame>
            )}
        </Stack>
    )
}
