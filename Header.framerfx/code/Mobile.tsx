import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"
// @ts-ignore
import { Logo } from "./Logo"

export function Mobile(props) {
    const {
        authentication,
        loggedIn,
        lang,
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
                backgroundColor: "#F7A100",
                color: "white",
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
                    alignment="end"
                    gap={16}
                    paddingRight={16}
                    center="y"
                    style={{ position: "relative", width: "1fr", height: 24 }}
                >
                    <Frame
                        onClick={onTapMenu}
                        size={24}
                        backgroundColor="transparent"
                        visible={!authentication}
                    >
                        <Icon
                            name="menu"
                            color="white"
                            width={24}
                            height={24}
                        />
                    </Frame>
                    <Frame
                        onClick={onTapProfile}
                        backgroundColor="transparent"
                        width={!loggedIn ? "auto" : 24}
                        height={24}
                        visible={!authentication}
                    >
                        {!loggedIn ? (
                            <a>{lang == "NL" ? "Inloggen" : "Log in"}</a>
                        ) : (
                            <Icon
                                name="avatar"
                                color="white"
                                width={24}
                                height={24}
                            />
                        )}
                    </Frame>
                    <Frame
                        size={24}
                        visible={authentication}
                        backgroundColor="transparent"
                    >
                        <Icon
                            name="international"
                            color="white"
                            width={24}
                            height={24}
                        />
                    </Frame>
                </Stack>
            </Frame>
        </Frame>
    )
}

Mobile.defaultProps = {
    height: 48,
    width: 320,
    loggedIn: false,
    fontFamily: "Proxima Nova Regular, Proxima Nova",
    lang: "NL",
    authentication: false,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Mobile, {
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
    backgroundColor: "transparent",
    width: "100%",
    maxWidth: 760,
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
}

const ListItemStyle: React.CSSProperties = {
    width: "auto",
    height: 24,
    backgroundColor: "transparent",
}
