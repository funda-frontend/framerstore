import * as React from "react"
import {
    Frame,
    FrameProps,
    Page,
    addPropertyControls,
    ControlType,
} from "framer"
// @ts-ignore
import { isValidComponent, showInstructions, normalizeFields } from "./Utils"
// @ts-ignore
import * as data from "./dummydata.json"

export function Carousel(props) {
    const {
        component,
        filePath,
        max,
        secretKey,
        direction,
        contentWidth,
        contentHeight,
        overflow,
        gap,
        padding,
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop,
        paddingPerSide,
        currentPage,
        dragEnabled,
        momentum,
        wheelEnabled,
        directionLock,
        defaultEffect,
        effect,
        onReady,
        onTapNavigate,
        onTapItem,
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
                onReady(res.response.numFound)
            })
            .catch((err) => setErrors(!err))
    }

    React.useEffect(() => {
        if (filePath !== undefined) {
            fetchData(filePath)
        } else {
            setResults(data.response.docs)
        }
    }, [])

    const calculatedPadding = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : padding

    const instructions = showInstructions(component)

    if (instructions) {
        return instructions
    } else {
        return (
            <Page
                overflow={overflow}
                width="100%"
                height="100%"
                direction={direction}
                contentWidth={contentWidth}
                contentHeight={contentHeight}
                gap={gap}
                style={{ padding: calculatedPadding }}
                currentPage={currentPage}
                dragEnabled={dragEnabled}
                momentum={momentum}
                wheelEnabled={wheelEnabled}
                directionLock={directionLock}
                defaultEffect={defaultEffect}
                effect={effect}
                onTap={onTapNavigate}
            >
                {results.slice(0, max).map((result, index: number) => {
                    const ItemComponent = React.cloneElement(component[0], {
                        key: index,
                        onTap: () => {
                            onTapItem(normalizeFields(result, index, max))
                            onTapNavigate
                        },
                        ...normalizeFields(result, index, max),
                    })
                    return ItemComponent
                })}
            </Page>
        )
    }
}

Carousel.defaultProps = {
    directionLock: true,
    onReady: () => null,
    onTapItem: () => null,
    onTapNavigate: () => null,
}

const pageProps =
    // @ts-ignore
    Page.propertyControls

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Carousel, {
    onTapNavigate: { type: ControlType.EventHandler },
    component: {
        type: ControlType.ComponentInstance,
        title: "Design Component",
    },
    dataSource: {
        type: ControlType.Boolean,
        enabledTitle: "Local file",
        disabledTitle: "URL",
        defaultValue: true,
    },
    filePath: {
        title: "File",
        type: ControlType.File,
        allowedFileTypes: ["json"],
        hidden: (props) => props.dataSource === false,
    },
    url: {
        title: "URL",
        type: ControlType.String,
        defaultValue: "https://api.jsonbin.io/b/5e8def90980e481b8aa0fcbc/1",
        hidden: (props) => props.dataSource === true,
    },
    secretKey: {
        type: ControlType.String,
        hidden: (props) => props.dataSource === true,
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
    direction: pageProps.direction,
    contentWidth: pageProps.contentWidth,
    contentHeight: pageProps.contentHeight,
    gap: pageProps.gap,
    padding: pageProps.padding,
    currentPage: pageProps.currentPage,
    dragEnabled: pageProps.dragEnabled,
    momentum: pageProps.momentum,
    wheelEnabled: pageProps.wheelEnabled,
    directionLock: pageProps.directionLock,
    defaultEffect: pageProps.defaultEffect,
})
