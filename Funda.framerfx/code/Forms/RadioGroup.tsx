import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
import { Radio } from "./Radio"

RadioGroup.defaultProps = {
    width: 228,
    height: 220,
    label: "Aangeboden sinds",
    optionHeight: 44,
    options: ["Vandaag", "3 dagen", "5 dagen", "10 dagen", "30 dagen"],
    initialValue: "Vandaag",
    borderBottom: true,
    fontFamily: "Proxima Nova",
    gap: 0,
    padding: 0,
    direction: "vertical",
    distribution: "start",
    alignment: "start",
    onValueChange: () => null,
}

const stackProps =
    // @ts-ignore
    Stack.propertyControls

addPropertyControls(RadioGroup, {
    label: { type: ControlType.String },
    options: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
        },
    },
    initialValue: { type: ControlType.String },
    fontFamily: { type: ControlType.String, title: "Font Family" },
    optionHeight: { type: ControlType.Number, min: 24, max: 56 },
    gap: { ...stackProps.gap, defaultValue: 0 },
    padding: stackProps.padding,
    direction: stackProps.direction,
    distribution: {
        ...stackProps.distribution,
        defaultValue: "start",
    },
    alignment: {
        ...stackProps.alignment,
        defaultValue: "start",
    },
})

export function RadioGroup(props) {
    const {
        width,
        height,
        label,
        options,
        initialValue,
        onValueChange,
        borderBottom,
        fontFamily,
        direction,
        optionHeight,
        gap,
        padding,
        distribution,
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop,
        paddingPerSide,
        alignment,
    } = props
    const [selection, setSelection] = React.useState(initialValue)

    React.useEffect(() => {
        onValueChange(selection)
    }, [selection])

    React.useEffect(() => {
        setSelection(initialValue)
    }, [initialValue])

    return (
        <Stack
            distribution="start"
            alignment="start"
            gap={4}
            width="auto"
            height="auto"
        >
            <div
                style={{
                    fontFamily,
                    fontSize: 16,
                    lineHeight: 1.5,
                    textAlign: "left",
                }}
            >
                {label}
            </div>
            <Stack
                gap={gap}
                distribution={distribution}
                alignment={"start"}
                direction={direction}
                padding={padding}
                width="auto"
                height="auto"
            >
                {options.map((option, index) => (
                    <Radio
                        key={index}
                        checked={option == selection}
                        text={option}
                        onChange={() => setSelection(option)}
                        fontFamily={fontFamily}
                        height={optionHeight}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
