import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import styled from "styled-components"

Checkbox.defaultProps = {
    onChange: () => null,
}

CheckboxGroup.defaultProps = {
    width: 228,
    legend: "Buitenruimte",
    options: ["Balkon", "Dakterras", "Tuin"],
    initialValue: ["Balkon", "Dakterras", "Tuin"],
    borderBottom: true,
    onValueChange: () => null,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(CheckboxGroup, {
    legend: { type: ControlType.String, defaultValue: "Buitenruimte" },
    options: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
    initialValue: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
})

export function CheckboxGroup(props) {
    const {
        width,
        legend,
        options,
        initialValue,
        onValueChange,
        borderBottom,
    } = props
    const [value, setValue] = React.useState(initialValue)
    const [countArray, setCountArray] = React.useState([])

    function randomCount(min, max) {
        return Math.floor(Math.random() * (max - min + 1))
    }

    React.useEffect(() => {
        let array = []

        for (let option of options) {
            const count = randomCount(0, 51)
            array.push(count)
        }
        setCountArray(array)
    }, [options])

    React.useEffect(() => {
        let initialValues = []
        for (let option of options) {
            initialValues.push("")
        }
        for (let value of initialValue) {
            const valueIndex = options.indexOf(value)
            initialValues[valueIndex] = value
        }
        setValue(initialValues)
    }, [initialValue])

    function ValueChange(isChecked, index) {
        let newValue = value
        let filteredValue = []
        if (isChecked) {
            newValue = [...value, options[index]]
        } else {
            newValue.splice(newValue.indexOf(options[index]), 1)
        }
        filteredValue = newValue.filter((el) => {
            return el != ""
        })
        setValue(filteredValue)
        onValueChange(filteredValue, options[index], isChecked)
    }

    return (
        <Frame
            width={width}
            height={80 + 32 * options.length}
            backgroundColor="white"
        >
            <Legend>{legend}</Legend>
            <CheckboxList
                style={{
                    borderBottom: borderBottom ? "1px solid #ededed" : "",
                }}
            >
                {options.map((option, index) => {
                    return (
                        <Checkbox
                            key={index}
                            index={index}
                            option={option}
                            isChecked={initialValue[index] == option}
                            count={countArray[index]}
                            onChange={(isChecked, index) => {
                                ValueChange(isChecked, index)
                            }}
                        />
                    )
                })}
            </CheckboxList>
        </Frame>
    )
}

function Checkbox(props) {
    const { option, count, isChecked, index, onChange } = props
    const [checked, setChecked] = React.useState(false)

    React.useEffect(() => {
        setChecked(isChecked)
    }, [isChecked])

    return (
        <li>
            <input
                type="checkbox"
                id={option}
                className="custom-checkbox"
                checked={checked}
                onChange={() => {
                    setChecked(!checked)
                    onChange(!checked, index)
                }}
            />
            <label htmlFor={option} className="label-text">
                {option}
            </label>
            <span>{count}</span>
        </li>
    )
}

const Legend = styled.legend`
    font-family: "Proxima Nova";
    font-size: 16px;
    line-height: 2;
    padding-bottom: 10px;
    font-weight: 600;
    padding-right: 0;
    padding-left: 0;
    color: #333;
`

const CheckboxList = styled.ul`
    font-family: "Proxima Nova";
    font-size: 16px;
    color: #333;
    line-height: 2;
    padding: 0 0 16px 0;
    margin: 0 ;
    list-style: none;
    li {
        margin: 0;
        display: flex;
        flex: 1 1 auto;
        height: 32px;
        word-break: normal;
        cursor: pointer;
        .custom-checkbox:checked~.label-text:before {
            background-image: url(data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNNi41OSA5LjQ1bDUtNUExIDEgMCAxMTEzIDUuODhsLTUuNjcgNS42NmExIDEgMCAwMS0uNzkuMjkgMSAxIDAgMDEtLjY5LS4yOUwzIDguN2ExIDEgMCAwMTEuNDMtMS40MXoiIGZpbGw9IiMwMjcxYjMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg);
        }
        
        input {
            position: absolute;
            height: 1px;
            width: 1px;
            margin: -1px;
            padding: 0;
            border: 0;
            clip: rect(0 0 0 0);
            overflow: hidden;
        }
        label {
            line-height: 1.3;
            white-space: normal;
            padding-left: 32px;
            padding-top: 8px;
            padding-bottom: .5rem;
            padding-right: 1rem;
            display: flex;
            flex: 1 1 auto;
            &:before {
                height: 1rem;
                width: 1rem;
                display: inline-block;
                border: 1px solid #0071b3;
                background-color: #e6f2f7;
                background-repeat: no-repeat;
                background-position: 50%;
                border-radius: 2px;
                transition: border-color .2s cubic-bezier(.23,1,.32,1),background-image .2s cubic-bezier(.23,1,.32,1);
                margin-right: .5rem;
                content: "";
                vertical-align: -.125rem;
                background-color: #e6f2f7;
                flex: 0 0 auto;
                margin-left: -2rem;
            }
        }
        span {
            display: inline;
            top: 0;
            right: 0;
            line-height: 1.3;
            position: relative;
            -webkit-box-flex: 0;
            flex: 0 0 auto;
            padding-top: 8px;
            color: #999;
        }
    }
`
