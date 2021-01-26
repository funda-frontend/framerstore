import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

Radio.defaultProps = {
    height: 44,
    text: "Radio",
    checked: false,
    fontFamily: "Proxima Nova, Proxima Nova Regular",
    onChange: () => null,
}

addPropertyControls(Radio, {
    text: { type: ControlType.String, title: "Text" },
    checked: { type: ControlType.Boolean, title: "Checked" },
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "Proxima Nova",
    },
})

export function Radio(props) {
    const {
        width,
        height,
        text,
        checked,
        fontFamily,
        onChange,
        ...rest
    } = props
    const [state, setState] = React.useState(checked)

    const handleToggle = () => {
        setState(!state)
        onChange(state)
    }

    React.useEffect(() => {
        setState(checked)
    }, [checked])

    return (
        <Frame
            width="auto"
            height={height}
            backgroundColor="transparent"
            style={{ cursor: "pointer" }}
            {...rest}
        >
            <div
                style={{ ...componentStyle, fontFamily }}
                onClick={handleToggle}
            >
                <div style={{ ...radioStyle, fontFamily }}>
                    <Frame visible={state} style={{ ...radioMarkStyle }} />
                </div>

                <div style={{ ...radioLabelStyle, fontFamily }}>{text}</div>
            </div>
        </Frame>
    )
}

const componentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    height: "100%",
}

const radioStyle: React.CSSProperties = {
    position: "relative",
    flexGrow: 0,
    flexShrink: 0,
    width: "16px",
    height: "16px",
    margin: "0px 8px 0 0",
    background: "#E6F2F7",
    border: "1px solid #0071B3",
    borderRadius: "50%",
}

const radioMarkStyle: React.CSSProperties = {
    width: "8px",
    height: "8px",
    top: "3px",
    left: "3px",
    backgroundColor: "#0071B3",
    borderRadius: "50%",
}

const radioLabelStyle: React.CSSProperties = {
    fontSize: "16px",
    lineHeight: "24px",
}
