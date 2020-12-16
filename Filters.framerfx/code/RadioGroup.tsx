import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"
import styled from "styled-components"

RadioGroup.defaultProps = {
    width: 228,
    legend: "Dagen op funda",
    options: ["Vandaag", "Sinds 3 dagen", "Sinds 5 dagen", "Sinds 10 dagen"],
    initialValue: "Vandaag",
    borderBottom: true,
    onValueChange: () => null,
}

addPropertyControls(RadioGroup, {
    legend: { type: ControlType.String, defaultValue: "Dagen op funda" },
    options: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
        },
    },
    initialValue: { type: ControlType.String },
})

export function RadioGroup(props) {
    const {
        width,
        legend,
        options,
        initialValue,
        onValueChange,
        borderBottom,
    } = props
    const [hasChecked, setHasChecked] = React.useState(false)
    const [selection, setSelection] = React.useState("")
    const [countArray, setCountArray] = React.useState([])

    function randomCount(min, max) {
        return Math.floor(Math.random() * (max - min + 1))
    }

    React.useEffect(() => {
        let array = []
        for (let option of options) {
            const count = randomCount(0, 10)
            array.push(count)
        }
        setCountArray(array)
    }, [options])

    React.useEffect(() => {
        setHasChecked(initialValue.length > 0)
        setSelection(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        if (hasChecked) {
            onValueChange(selection)
        } else {
            onValueChange("")
        }
    }, [selection, hasChecked])

    return (
        <Frame
            width={width}
            height={hasChecked ? 80 : 32 * options.length + 56}
            backgroundColor="transparent"
        >
            <FieldSet
                style={{
                    borderBottom: borderBottom ? "1px solid #ededed" : "",
                }}
            >
                <RadioLegend>{legend}</RadioLegend>
                <RadioList
                    className={hasChecked ? "has-checked" : ""}
                    width={width}
                >
                    {options.map((option, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    option == selection ? "is-checked" : ""
                                }
                                onClick={() => {
                                    setHasChecked(!hasChecked)
                                    setSelection(option)
                                }}
                            >
                                <div>
                                    <input type="radio" />
                                    <label className="radio-group-item-label">
                                        <span>{option}</span>
                                        <span className="count">
                                            {countArray[index]}
                                        </span>
                                    </label>
                                </div>
                                <label
                                    className="radio-group-item-remove radio-group-row"
                                    title={option}
                                >
                                    <span
                                        className="icon-close-blue"
                                        data-grunticon-embed=""
                                    >
                                        <Icon
                                            name="Close"
                                            width={16}
                                            height={16}
                                        />
                                    </span>
                                    <span>{option}</span>
                                </label>
                            </li>
                        )
                    })}
                </RadioList>
            </FieldSet>
        </Frame>
    )
}

const FieldSet = styled.div`
    font-family: "Proxima Nova";
    font-size: 16px;
    line-height: 2;
    color: #333;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
`

const RadioLegend = styled.legend`
    border: 0;
    padding: 0;
    font-weight: 600;
`
const RadioList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        position: relative;
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
            &.radio-group-item-remove {
                display: none;
            }
            &.radio-group-item-label {
                display: block;
                position: static;
                padding-right: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:before {
                    border: 1px solid #0071b3;
                    background-color: #e6f2f7;
                    border-radius: 10px;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    height: 1rem;
                    width: 1rem;
                    display: inline-block;
                    margin-right: .5rem;
                    content: "";
                    vertical-align: -.125rem;
                    background-color: #e6f2f7;
                }
                span.count {
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #999;
                }
            }
        }
    }
    &.has-checked {
        div {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
        li:not(.is-checked) {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
        li.is-checked {
            label.radio-group-item-remove {
                display: block;
                color: #0071B3;
                background: #e6f2f7;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: .375rem;
                padding-left: .375rem;
                span.icon-close-blue {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    vertical-align: middle;
                    line-height: 1rem;
                    margin-top: -0.25rem;
                    margin-right: 0.25rem;
                }
            }
        }
    }
`
