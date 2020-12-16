import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"
// @ts-ignore
import { colors } from "@framer/funda.colors/code/canvas.tsx"
import { Logo } from "./Logo"

export function Desktop(props) {
    const {
        authentication,
        anonymous,
        language,
        username,
        onTapLogo,
        onTapMenu,
        onTapProfile,
        onTapLang,
        fontFamily,
        fullWidth,
    } = props
    const displayName = username == "" ? "Account" : username

    return (
        <Frame
            style={{
                width: "100%",
                height: 48,
                backgroundColor: colors.Orange,
                color: colors.White,
                fontFamily,
                fontSize: 16,
                lineHeight: 1.5,
            }}
        >
            <Stack
                style={{ ...ContentStyle, maxWidth: fullWidth ? "100%" : 984 }}
                direction="horizontal"
                alignment="start"
                distribution="space-between"
            >
                <Logo
                    center="y"
                    left={16}
                    style={{ position: "relative" }}
                    onTap={onTapLogo}
                />
                <Stack
                    style={{
                        position: "relative",
                        width: "auto",
                        height: "100%",
                        backgroundColor: "red",
                    }}
                    direction="horizontal"
                    alignment="center"
                    distribution="end"
                    gap={16}
                    paddingRight={16}
                >
                    <Stack
                        style={ListItemStyle}
                        onTap={onTapMenu}
                        direction="horizontal"
                        alignment="start"
                        visible={!authentication}
                    >
                        <Icon name="menu" color={colors.White} />
                        <span>Menu</span>
                    </Stack>
                    <Stack
                        style={ListItemStyle}
                        onTap={onTapProfile}
                        direction="horizontal"
                        alignment="start"
                        visible={!authentication}
                    >
                        <Icon name="avatar" color={colors.White} />
                        <span>{anonymous ? "Inloggen" : displayName}</span>
                    </Stack>
                    <Stack
                        style={ListItemStyle}
                        onTap={onTapLang}
                        direction="horizontal"
                        alignment="start"
                    >
                        <Icon name="international" color={colors.White} />
                        <span>{language}</span>
                    </Stack>
                </Stack>
            </Stack>
        </Frame>
    )
}

Desktop.defaultProps = {
    fontFamily: "Proxima Nova Regular, Proxima Nova",
    height: 48,
    authentication: false,
    anonymous: true,
    language: "NL",
    username: "",
    fullWidth: false,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Desktop, {
    fullWidth: { type: ControlType.Boolean, defaultValue: false },
    fontFamily: { type: ControlType.String },
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
        options: ["NL", "EN"],
    },
    username: {
        type: ControlType.String,
        hidden(props) {
            return props.anonymous === true
        },
    },
    onTapLogo: { type: ControlType.EventHandler },
    onTapMenu: { type: ControlType.EventHandler },
    onTapProfile: { type: ControlType.EventHandler },
    onTapLang: { type: ControlType.EventHandler },
})

const ContentStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "0 auto",
    backgroundColor: "red",
}

const ListItemStyle: React.CSSProperties = {
    position: "relative",
    width: "auto",
    height: 24,
    backgroundColor: "transparent",
}
