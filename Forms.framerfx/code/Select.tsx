import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"

export function Select(props) {
    const {
        width,
        height,
        showLabel,
        label,
        options,
        value,
        onValueChange,
        fontFamily,
    } = props
    const [initialValue, setInitialValue] = React.useState(value)

    return (
        <Frame width="100%" height={height} backgroundColor="transparent">
            <Frame
                left={12}
                top={10}
                style={{ ...labelStyle, fontFamily }}
                visible={showLabel}
            >
                {label}
            </Frame>
            <select
                style={{
                    ...selectStyle,
                    paddingLeft: showLabel ? "56px" : "16px",
                    fontFamily,
                }}
                onChange={(event) => {
                    setInitialValue(event.target.value)
                    onValueChange(event.target.value)
                }}
                value={initialValue}
            >
                {options.map((option, index) => (
                    <option value={option} key={index}>
                        {option}
                    </option>
                ))}
            </select>
            <Frame
                width={24}
                height={24}
                backgroundColor="transparent"
                right={8}
                top={10}
            >
                <Icon name="arrowDown" />
            </Frame>
        </Frame>
    )
}

Select.defaultProps = {
    height: 44,
    width: 240,
    showLabel: false,
    label: "Van",
    options: [
        "€ 0",
        "€ 50.000",
        "€ 100.000",
        "€ 150.000",
        "€ 200.000",
        "€ 250.000",
        "€ 300.000",
        "€ 350.000",
        "€ 400.000",
    ],
    value: "€ 0",
    onValueChange: () => null,
    fontFamily: "Proxima Nova",
}

addPropertyControls(Select, {
    showLabel: { type: ControlType.Boolean, defaultValue: false },
    label: {
        type: ControlType.String,
        hidden(props) {
            return props.showLabel === false
        },
    },
    value: { type: ControlType.String },
    options: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "Proxima Nova",
    },
})

const labelStyle: React.CSSProperties = {
    width: "auto",
    height: "24px",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#666",
    backgroundColor: "transparent",
}

const selectStyle: React.CSSProperties = {
    width: "100%",
    height: "44px",
    margin: "0",
    background: "#fff",
    borderRadius: "2px",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    fontSize: "16px",
    padding: "0 32px 0 16px",
    color: "#333",
    lineHeight: "24px",
    cursor: "pointer",
    boxShadow: "inset 0 1px 2px 0 rgba(0,0,0,.2)",
    transition: "border .2s cubic-bezier(.23,1,.32,1)",
    paddingLeft: "3rem",
    border: "1px solid #ededed",
}
