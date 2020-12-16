import * as React from "react"
import { Frame, Scroll, Stack, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { isValidComponent, showInstructions, normalizeFields } from "./Utils"
// @ts-ignore
import * as data from "./Data/dummy.json"

List.defaultProps = {
    height: 128,
    width: 320,
    component: {},
    max: 10,
    onReady: () => null,
    onTapItem: () => null,
    onTapNavigate: () => null,
}

export function List(props) {
    const {
        width,
        height,
        direction,
        gap,
        padding,
        distribution,
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop,
        paddingPerSide,
        alignment,
        overflow,
        expandChildren,
        component,
        dataSource,
        filePath,
        url,
        max,
        secretKey,
        contentOffsetY,
        onReady,
        onTapNavigate,
        onTapItem,
        ...rest
    } = props

    const [isLoading, setLoading] = React.useState(true)
    const [hasErrors, setErrors] = React.useState(false)
    const [results, setResults] = React.useState([])
    const [count, setCount] = React.useState(0)

    async function fetchData(url) {
        const res = await fetch(url)
        res.json()
            .then((res) => {
                setErrors(false)
                setResults(res.response.docs)
                onReady(data.response.docs.slice(0, max))
            })
            .catch((err) => setErrors(!err))
    }

    React.useEffect(() => {
        if (filePath !== undefined) {
            fetchData(filePath)
        } else {
            setResults(data.response.docs)
            onReady(data.response.docs.slice(0, max))
        }
    }, [])

    const instructions = showInstructions(component)

    const calculatedPadding = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : padding

    if (instructions) {
        return instructions
    } else {
        return (
            <Frame
                width="100%"
                height="100%"
                backgroundColor="transparent"
                overflow={overflow}
            >
                <Stack
                    width="100%"
                    height="100%"
                    backgroundColor="transparent"
                    direction={direction}
                    gap={gap}
                    style={{ padding: calculatedPadding }}
                    alignment={alignment}
                    onTap={onTapNavigate}
                >
                    {results.slice(0, max).map((result, index) => {
                        const sizing = expandChildren
                            ? direction === "horizontal"
                                ? { height: "100%" }
                                : { width: "100%" }
                            : {}
                        const ItemComponent = React.cloneElement(component[0], {
                            key: index,
                            onTap: () => {
                                onTapItem(normalizeFields(result, index, max))
                                onTapNavigate
                            },
                            ...sizing,
                            ...normalizeFields(result, index, max),
                        })

                        return ItemComponent
                    })}
                </Stack>
            </Frame>
        )
    }
}

const stackProps =
    // @ts-ignore
    Stack.propertyControls

addPropertyControls(List, {
    onTapNavigate: { type: ControlType.EventHandler },
    component: {
        type: ControlType.ComponentInstance,
        title: "Design Component",
    },
    filePath: {
        title: "File",
        type: ControlType.File,
        allowedFileTypes: ["json"],
        hidden: (props) => props.dataSource === false,
    },
    max: {
        type: ControlType.Number,
        title: "Max amount",
        displayStepper: true,
        min: 1,
        max: 25,
    },
    overflow: {
        type: ControlType.SegmentedEnum,
        title: "Overflow",
        defaultValue: "visible",
        options: ["visible", "hidden"],
        optionTitles: ["Show", "Hide"],
    },
    gap: stackProps.gap,
    padding: stackProps.padding,
    direction: stackProps.direction,

    expandChildren: {
        type: ControlType.Boolean,
        title: "Responsive",
        defaultValue: false,
        enabledTitle: "Yes",
        disabledTitle: "No",
    },

    distribution: {
        ...stackProps.distribution,
        defaultValue: "start",
        hidden: (props) => props.expandChildren,
    },
    alignment: {
        ...stackProps.alignment,
        hidden: (props) => props.expandChildren,
    },
})
