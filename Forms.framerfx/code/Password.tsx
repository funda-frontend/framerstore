import * as React from "react"
import { Frame, addPropertyControls, ControlType, transform } from "framer"
// @ts-ignore
// import { Icon } from "@framer/funda.icons/code/Icon"

Password.defaultProps = {
    width: 384,
    height: 76,
    label: "Wachtwoord",
    initialValue: "",
    showStrengthIndicator: false,
    description: "",
    error: "",
    disabled: false,
    fontFamily: "Proxima Nova",
}

addPropertyControls(Password, {
    showStrengthIndicator: {
        type: ControlType.Boolean,
        title: "Show Strength Indcator",
    },
    initialValue: { type: ControlType.String, title: "Value" },
    label: { type: ControlType.String, title: "Label" },
    description: { type: ControlType.String, title: "Description" },
    error: { type: ControlType.String, title: "Error" },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
    },
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "Proxima Nova",
    },
})

export function Password(props) {
    const { initialValue, fontFamily, disabled } = props
    const [password, setPassword] = React.useState(String)
    const [showPassword, setShowPassword] = React.useState(Boolean)
    const [value, setValue] = React.useState(initialValue)
    const inputPassword = React.useRef<HTMLInputElement>()

    React.useEffect(() => {
        setValue(props.value)
    }, [initialValue])

    const inputChange = (event) => {
        setPassword(event.target.value)
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div style={componentStyle}>
            <label style={{ ...labelStyle, fontFamily }} htmlFor="password">
                {props.label}
            </label>

            <div style={{ ...inputcontainerStyle, fontFamily }}>
                <input
                    ref={inputPassword}
                    style={inputStyle}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="passsword"
                    onChange={inputChange}
                    autoCorrect="false"
                    autoComplete="false"
                    disabled={disabled}
                />

                <div
                    style={{ ...toggleStyle, fontFamily }}
                    onClick={togglePassword}
                >
                    {/*showPassword ? <Icon name="Hide" /> : <Icon name="Show" />*/}
                </div>
            </div>

            <StrengthIndicator
                password={password}
                show={props.showStrengthIndicator}
                fontFamily={fontFamily}
            />

            <div style={{ ...descriptionStyle, fontFamily }}>
                {props.description}
            </div>
            <div style={{ ...errorStyle, fontFamily }}>{props.error}</div>
        </div>
    )
}

function StrengthIndicator(props) {
    const { fontFamily } = props
    if (!props.show) {
        return null
    }

    const text = () => {
        if (props.password.length <= 5) {
            return "zwak"
        }

        if (props.password.length >= 6 && props.password.length <= 8) {
            return "gemidddeld"
        }

        if (props.password.length >= 9) {
            return "goed"
        }
    }

    const width = () => {
        const percentage = transform(props.password.length, [0, 10], [0, 100])

        return `${percentage}%`
    }

    const color = () => {
        if (props.password.length <= 5) {
            return "#F03D30"
        }

        if (props.password.length >= 6 && props.password.length <= 8) {
            return "#F7CE00"
        }

        if (props.password.length >= 9) {
            return "#22AB34"
        }
    }

    return (
        <div style={{ ...strengthIncicatorStyle, fontFamily }}>
            <div style={strengthIncicatorBackgroundStyle}>
                <Frame
                    animate={{
                        width: width(),
                        background: color(),
                    }}
                    transition={{ type: "tween" }}
                    style={strengthIncicatorBarStyle}
                />
            </div>

            <div style={strengthIncicatorTextStyle}>
                Wachtwoordsterkte: {text()}
            </div>
        </div>
    )
}

const componentStyle: React.CSSProperties = {
    width: "auto",
    height: "auto",
}

const labelStyle = {
    display: "block",
    padding: "4px 0",
    fontSize: "16px",
}

const inputcontainerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "44px",
}

const inputStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    padding: "9px 48px 9px 16px",
    fontSize: "16px",
    lineHeight: "24px",
    border: "1px solid #CCCCCC",
    borderRadius: "2px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1) inset",
    outline: "none",
}

const toggleStyle: React.CSSProperties = {
    position: "absolute",
    width: "24px",
    height: "24px",
    top: "12px",
    right: "16px",
    cursor: "pointer",
}

const strengthIncicatorStyle: React.CSSProperties = {
    width: "100%",
    marginTop: "12px",
}

const strengthIncicatorBackgroundStyle: React.CSSProperties = {
    width: "100%",
    height: "4px",
    background: "#EDEDED",
    borderRadius: "2px",
}

const strengthIncicatorBarStyle: React.CSSProperties = {
    width: "0px",
    height: "4px",
    borderRadius: "2px",
}

const strengthIncicatorTextStyle: React.CSSProperties = {
    display: "block",
    marginTop: "8px",
    fontSize: "12px",
    lineHeight: "20px",
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
