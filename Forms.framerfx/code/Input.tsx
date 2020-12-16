import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

Input.defaultProps = {
    width: 384,
    height: 72,
    label: "Label",
    placeholder: "",
    value: "",
    description: "",
    error: "",
    disabled: false,
    hasFocus: false,
    onValueChange: () => null,
    onBlur: () => null,
    onFocus: () => null,
    inputType: "text",
}

addPropertyControls(Input, {
    label: { type: ControlType.String, title: "Label" },
    placeholder: { type: ControlType.String, title: "Placeholder" },
    value: { type: ControlType.String, title: "Value" },
    description: { type: ControlType.String, title: "Description" },
    error: { type: ControlType.String, title: "Error" },
    disabled: { type: ControlType.Boolean, title: "Disabled" },
    onValueChange: { type: ControlType.EventHandler },
    onBlur: { type: ControlType.EventHandler },
    onFocus: { type: ControlType.EventHandler },
    inputType: {
        type: ControlType.Enum,
        options: ["text", "number", "tel", "email", "url", "date"],
        optionTitles: ["Text", "Number", "Tel", "Email", "URL", "Date"],
        title: "Input Type",
    },
})

export function Input(props) {
    const {
        label,
        value,
        placeholder,
        description,
        error,
        disabled,
        hasFocus,
        onValueChange,
        onBlur,
        onFocus,
        inputType,
    } = props
    const [newValue, setValue] = React.useState(value)
    const [focus, setFocus] = React.useState(hasFocus)
    const input = React.useRef(null)

    function inputChange(event) {
        setValue(event.target.value)
        onValueChange(event.target.value)
    }

    function onFocusEvent(value) {
        onFocus(value)
        setFocus(true)
    }

    function onBlurEvent(value) {
        onBlur(value)
        setFocus(false)
    }

    React.useEffect(() => {
        input.current.value = value
    }, [value])

    React.useEffect(() => {
        setFocus(hasFocus)
        if (hasFocus) {
            input.current.focus()
        } else {
            input.current.blur()
        }
    }, [hasFocus])

    return (
        <div style={formRowStyle}>
            <label style={labelStyle} htmlFor="input">
                {label}
            </label>

            <input
                style={{
                    ...inputStyle,
                    backgroundColor: disabled ? "#EDEDED" : "#FFF",
                    borderColor: focus ? "#999" : "#CCC",
                }}
                type={inputType}
                id="input"
                ref={input}
                autoCorrect="false"
                autoComplete="false"
                placeholder={placeholder}
                value={newValue}
                onChange={inputChange}
                disabled={disabled}
                onBlur={() => onBlurEvent(newValue)}
                onFocus={() => onFocusEvent(newValue)}
            />

            <div style={descriptionStyle}>{description}</div>
            <div style={errorStyle}>{error}</div>
        </div>
    )
}

const formRowStyle: React.CSSProperties = {
    width: "auto",
    height: "auto",
    fontFamily: "Proxima Nova Regular, Proxima Nova",
}

const labelStyle: React.CSSProperties = {
    display: "block",
    padding: "4px 0",
    fontSize: "16px",
    fontFamily: "Proxima Nova Regular, Proxima Nova",
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 48px 9px 16px",
    margin: 0,
    fontSize: "16px",
    lineHeight: "24px",
    border: "1px solid #CCCCCC",
    borderRadius: "2px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1) inset",
    outline: "none",
    fontFamily: "Proxima Nova Regular, Proxima Nova",
}

const descriptionStyle: React.CSSProperties = {
    marginTop: "8px",
    color: "#666666",
    fontSize: "12px",
    lineHeight: "20px",
    fontFamily: "Proxima Nova Regular, Proxima Nova",
}

const errorStyle: React.CSSProperties = {
    marginTop: "8px",
    color: "#F03D30",
    fontSize: "16px",
    lineHeight: "24px",
    fontFamily: "Proxima Nova Regular, Proxima Nova",
}
