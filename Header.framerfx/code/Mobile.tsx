import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"
// @ts-ignore
import { colors } from "@framer/funda.colors/code/canvas.tsx"
import { Logo } from "./Logo"

export function Mobile(props) {
    const {
        authentication,
        anonymous,
        language,
        onTapLogo,
        onTapMenu,
        onTapProfile,
        fontFamily,
    } = props

    return (
        <Frame
            style={{
                width: "100%",
                height: 48,
                backgroundColor: colors.Orange,
                color: colors.White,
                fontFamily: "Proxima Nova Regular, Proxima Nova",
                fontSize: 16,
                lineHeight: 1.5,
            }}
        >
            <Frame style={ContentStyle}>
                <Logo
                    center="y"
                    left={16}
                    style={{ position: "relative" }}
                    onTap={onTapLogo}
                />
                <Stack
                    direction="horizontal"
                    distribution="end"
                    alignment="center"
                    gap={16}
                    paddingRight={16}
                    center
                    style={{ width: "100%", height: 24 }}
                >
                    <Frame
                        onClick={onTapMenu}
                        style={{ ...ListItemStyle, width: 24, height: 24 }}
                        visible={!authentication}
                    >
                        <Icon
                            name="menu"
                            color={colors.White}
                            width={24}
                            height={24}
                        />
                    </Frame>
                    <Frame
                        onClick={onTapProfile}
                        style={{
                            ...ListItemStyle,
                            width: anonymous ? "auto" : 24,
                            height: 24,
                        }}
                        visible={!authentication}
                    >
                        {anonymous ? (
                            <a>Inloggen</a>
                        ) : (
                            <Icon
                                name="avatar"
                                color={colors.White}
                                width={24}
                                height={24}
                            />
                        )}
                    </Frame>
                </Stack>
            </Frame>
        </Frame>
    )
}

Mobile.defaultProps = {
    height: 48,
    width: 320,
    anonymous: false,
    fontFamily: "Proxima Nova Regular, Proxima Nova",
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Mobile, {
    authentication: { type: ControlType.Boolean, defaultValue: false },
    anonymous: {
        type: ControlType.Boolean,
        defaultValue: true,
        hidden(props) {
            return props.authentication === true
        },
    },
    language: {
        type: ControlType.SegmentedEnum,
        options: ["nl", "EN"],
        optionTitles: ["NL", "EN"],
    },
    onTapLogo: { type: ControlType.EventHandler },
    onTapMenu: { type: ControlType.EventHandler },
    onTapProfile: { type: ControlType.EventHandler },
    onTapLang: { type: ControlType.EventHandler },
    fontFamily: { type: ControlType.String },
})

const ContentStyle: React.CSSProperties = {
    position: "relative",
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: 760,
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "flex-start",
}

const ListItemStyle: React.CSSProperties = {
    width: "auto",
    height: 24,
    backgroundColor: "transparent",
}
