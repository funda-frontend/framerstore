import * as React from "react"
import { Frame, addPropertyControls, ControlType, FrameProps } from "framer"
// @ts-ignore
import { colors } from "@framer/funda.colors/code/canvas"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"

type Props = Partial<FrameProps> & {
    onChange: (isSaved: boolean) => void
}

export function ButtonIcon(props) {
    const {
        width,
        height,
        onTap,
        initialState,
        onChange,
        disabled,
        iconOff,
        iconOn,
        iconColorOn,
        iconColorOff,
        button,
        backgroundColor,
        borderColor,
    } = props
    const [isSaved, setSaved] = React.useState(initialState)

    React.useEffect(() => {
        setSaved(initialState)
        onChange(initialState)
    }, [initialState])

    const transition = {
        ease: [0.23, 1, 0.32, 1],
        duration: 0.15,
    }

    const heartbeat = {
        ease: [0.68, -0.55, 0.265, 1.55],
        duration: 0.35,
    }

    const variants = {
        initial: {
            width: "100%",
            height: height,
            backgroundColor: button ? backgroundColor : "",
            fontFamily: "Proxima Nova",
            border: button ? `1px solid ${borderColor}` : "",
            borderRadius: "2px",
            boxShadow: button
                ? "0 1px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 rgba(0,0,0,.1)"
                : "none",
            cursor: !disabled ? "pointer" : "auto",
            transition,
        },
    }

    return (
        <Frame
            variants={variants}
            initial={"initial"}
            onTap={() => {
                if (!disabled) {
                    setSaved(!isSaved)
                    onChange(!isSaved)
                    onTap()
                }
            }}
        >
            <Frame
                width={24}
                height={24}
                background="transparent"
                center
                scale={initialState ? 0.5 : 1}
                animate={{ scale: !isSaved ? 1 : 0.5 }}
                transition={transition}
            >
                <Icon
                    width="100%"
                    height="100%"
                    name={iconOff}
                    color={iconColorOff}
                />
            </Frame>
            <Frame
                width={24}
                height={24}
                background="transparent"
                center
                opacity={initialState ? 1 : 0}
                animate={{
                    opacity: !isSaved ? 0 : 1,
                    scale: !isSaved ? 0.25 : 1,
                }}
                transition={heartbeat}
            >
                <Icon
                    width="100%"
                    height="100%"
                    name={iconOn}
                    color={iconColorOn}
                />
            </Frame>
        </Frame>
    )
}

ButtonIcon.defaultProps = {
    height: 44,
    width: 44,
    color: "Blue",
    initialState: false,
    iconOff: "heart",
    iconOn: "heartFilled",
    onChange: () => null,
    onTap: () => null,
}

addPropertyControls(ButtonIcon, {
    button: { type: ControlType.Boolean, title: "Button", defaultValue: true },
    iconOff: { type: ControlType.String },
    iconOn: { type: ControlType.String },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "transparent",
        hidden(props) {
            return props.button === false
        },
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border",
        defaultValue: colors.Blue,
        hidden(props) {
            return props.button === false
        },
    },
    iconColorOff: {
        type: ControlType.Color,
        title: "Icon Off",
        defaultValue: colors.Blue,
    },
    iconColorOn: {
        type: ControlType.Color,
        title: "Icon On",
        defaultValue: colors.Blue,
    },
    initialState: {
        type: ControlType.Boolean,
        defaultValue: false,
        enabledTitle: "On",
        disabledTitle: "Off",
    },
    disabled: { type: ControlType.Boolean, defaultValue: false },
    onTap: { type: ControlType.EventHandler },
})
