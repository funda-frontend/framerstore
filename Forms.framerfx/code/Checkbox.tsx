import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"

Checkbox.defaultProps = {
    width: 384,
    height: 44,
    text: "Checkbox",
    checked: false,
    fontFamily: "Proxima Nova",
}

addPropertyControls(Checkbox, {
    text: { type: ControlType.String, title: "Text" },
    checked: { type: ControlType.Boolean, title: "Checked" },
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "Proxima Nova",
    },
})

export function Checkbox(props) {
    const { width, height, text, checked, fontFamily } = props
    const [state, setState] = React.useState(checked)

    function handleToggle() {
        setState(!state)
    }

    return (
        <Frame
            width="100%"
            height={height}
            backgroundColor="transparent"
            onTap={handleToggle}
        >
            <div style={{ ...componentStyle }}>
                <div style={checkboxStyle}>
                    <Frame
                        size={16}
                        backgroundColor="transparent"
                        top={-0.55}
                        left={-1}
                        visible={state}
                    >
                        <Icon width={16} height={16} name="checkBold" />
                    </Frame>
                </div>

                <div style={{ ...checkboxLabelStyle, fontFamily }}>{text}</div>
            </div>
        </Frame>
    )
}

const componentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "top",
    width: "auto",
    padding: "10px 0",
}

const checkboxStyle: React.CSSProperties = {
    position: "relative",
    flexGrow: 0,
    flexShrink: 0,
    width: "16px",
    height: "16px",
    margin: "4px 8px 0 0",
    background: "#E6F2F7",
    border: "1px solid #0071B3",
    borderRadius: "2px",
}

const checkboxLabelStyle: React.CSSProperties = {
    fontSize: "16px",
    lineHeight: "1.5",
    width: "1fr",
}
