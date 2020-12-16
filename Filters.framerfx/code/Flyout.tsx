import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { CheckboxGroup } from "./CheckboxGroup"
import styled from "styled-components"
// @ts-ignore
import { Icon } from "@framer/funda.icons/code/Icon"
// @ts-ignore
import { colors } from "@framer/funda.colors/code/canvas"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Flyout(props) {
    const { width, legend, options, initialValue } = props
    const [active, setActive] = React.useState(false)
    const [value, setValue] = React.useState(initialValue)
    const [items, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [...state, { id: Math.random(), name: action.name }]
            case "remove":
                return state.filter((_, name) => name != action.name)
            default:
                return state
        }
    }, [])

    // Add selected list items
    React.useEffect(() => {
        for (let val of value) {
            dispatch({ type: "add", name: val })
        }
    }, [value])

    const previewText = options.join(", ")

    return (
        <Frame backgroundColor="transparent" height={60 + 40 * items.length}>
            <Frame
                width={width}
                backgroundColor="white"
                style={{
                    position: "relative",
                    height: 64,
                    marginBottom: 16,
                    paddingBottom: 16,
                    borderBottom: "1px solid #EDEDED",
                    cursor: "pointer",
                }}
                onTap={() => {
                    setActive(!active)
                }}
            >
                <Legend width={width}>{legend}</Legend>
                <Frame
                    width={width}
                    height={12}
                    backgroundColor="transparent"
                    visible={items.length > 0 ? false : true}
                >
                    <Preview>{previewText}</Preview>
                </Frame>
                <Frame
                    width={24}
                    height={24}
                    right={0}
                    top={0}
                    backgroundColor="transparent"
                >
                    <Icon name="SimpleRight" />
                </Frame>
            </Frame>
            <Frame backgroundColor="transparent" top={24}>
                <List>
                    {items.map((item, index) => {
                        return (
                            <ListItem
                                key={item.id}
                                onClick={() =>
                                    dispatch({ type: "remove", index: item.id })
                                }
                            >
                                {item.name}
                            </ListItem>
                        )
                    })}
                </List>
            </Frame>
            <Frame
                visible={active}
                left={width + 16}
                width={228 + 48}
                height={80 + 32 * options.length + 8}
                top={0}
                backgroundColor="white"
                radius={4}
                style={{
                    padding: "8px 24px 0 24px",
                    boxShadow: "0 0 12px 0 rgba(0,0,0,.25)",
                }}
            >
                <CheckboxGroup
                    initialValue={value}
                    options={options}
                    legend={legend}
                    borderBottom={false}
                    onValueChange={(value, selected, isChecked) => {
                        if (isChecked) {
                            dispatch({ type: "add", name: selected })
                        } else {
                            dispatch({ type: "remove", name })
                        }
                    }}
                />
            </Frame>
        </Frame>
    )
}

Flyout.defaultProps = {
    width: 228,
    legend: "Bouwperiode",
    options: [
        "Voor 1906",
        "1906-1930",
        "1931-1944",
        "1945-1959",
        "1960-1970",
        "1971-1980",
        "1981-1990",
        "1991-2000",
        "2001-2010",
        "Na 2010",
    ],
    initialValue: [],
    onValueChange: () => null,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Flyout, {
    legend: { type: ControlType.String },
    options: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
    initialValue: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
})

function Chip(props) {
    const { label } = props
    return (
        <Frame
            width={228}
            height={32}
            style={{
                fontFamily: "Proxima Nova",
                textAlign: "left",
                fontSize: 16,
                color: colors.Blue,
            }}
        >
            {label}
        </Frame>
    )
}

const Legend = styled.legend`
    font-family: "Proxima Nova";
    font-size: 16px;
    line-height: 1.5;
    padding-bottom: 10px;
    font-weight: 600;
    padding-right: 0;
    padding-left: 0;
    color: #333;
`

const Preview = styled.small`
    font-family: "Proxima Nova";
    display: block;
    font-size: 12px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
    white-space: nowrap;
    margin: 0;
    padding: 0 16px 0 0;
    font-weight: 400;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
`

const ListItem = styled.li`
    font-family: "Proxima Nova";
    font-size: 16px;
    line-height: 1.5;
    height: 32px;
    position: relative;
    margin: 8px 0 0 0;
    padding-top: 2px;
    padding-right: .375rem;
    padding-left: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #e6f2f7;
    color: #0071b3;
    border-radius: 2px;
    cursor: pointer;
    border: 1px solid #e6f2f7;
    &:hover {
        color: #00517f;
        border-color: #0071b3;
    }
    &:after {
        content: "✕";
        display: block;
        position: absolute;
        left: 8px;
        top: 6px;
        font-size: 0.75rem;
    }
`
