import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { Icon } from "../Icon"
// @ts-ignore
import { Logo } from "../Logo"

export function Desktop(props) {
    const {
        width,
        authentication,
        loggedIn,
        lang,
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
                width,
                height: 48,
                backgroundColor: "#F7A100",
                color: "white",
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
                        paddingRight: 16,
                    }}
                    direction="horizontal"
                    alignment="center"
                    distribution="end"
                    gap={16}
                >
                    <Stack
                        style={ListItemStyle}
                        onTap={onTapMenu}
                        direction="horizontal"
                        alignment="start"
                        visible={!authentication}
                    >
                        <Icon name="menu" color="white" />
                        <span>Menu</span>
                    </Stack>
                    <Stack
                        style={ListItemStyle}
                        onTap={onTapProfile}
                        direction="horizontal"
                        alignment="start"
                        visible={!authentication}
                    >
                        <Icon name="avatar" color="white" />
                        <span>
                            {!loggedIn
                                ? lang == "NL"
                                    ? "Inloggen"
                                    : "Log in"
                                : displayName}
                        </span>
                    </Stack>
                    <Stack
                        style={ListItemStyle}
                        onTap={onTapLang}
                        direction="horizontal"
                        alignment="start"
                    >
                        <Icon name="international" color="white" />
                        <span>{lang}</span>
                    </Stack>
                </Stack>
            </Stack>
        </Frame>
    )
}

Desktop.defaultProps = {
    fontFamily: "Proxima Nova Regular, Proxima Nova",
    width: 760,
    height: 48,
    authentication: false,
    loggedIn: false,
    lang: "NL",
    username: "",
    fullWidth: false,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Desktop, {
    fullWidth: { type: ControlType.Boolean, defaultValue: false },
    fontFamily: { type: ControlType.String },
    authentication: {
        type: ControlType.Boolean,
        defaultValue: false,
        title: "login.funda.nl",
    },
    loggedIn: {
        type: ControlType.Boolean,
        defaultValue: false,
        hidden(props) {
            return props.authentication === true
        },
    },
    username: {
        type: ControlType.String,
        defaultValue: "Elliot",
        hidden(props) {
            return props.loggedIn === false
        },
    },
    lang: {
        type: ControlType.SegmentedEnum,
        options: ["NL", "EN"],
        title: "Language",
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
