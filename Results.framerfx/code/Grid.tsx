import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import { isValidComponent, showInstructions, normalizeFields } from "./Utils"
// @ts-ignore
import * as data from "./Data/dummy.json"

export function Grid(props) {
    const {
        columns,
        gap,
        component,
        secretKey,
        filePath,
        dataSource,
        url,
        max,
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
        const res = await fetch(url, {
            headers: {
                "secret-key": `${secretKey}`,
                "version-control": "true",
            },
        })
        res.json()
            .then((res) => {
                console.log(res.response.docs)
                setErrors(false)
                setResults(res.response.docs)
            })
            .catch((err) => setErrors(!err))
    }

    React.useEffect(() => {
        console.log(filePath)
        if (filePath !== undefined) {
            dataSource ? fetchData(filePath) : fetchData(url)
        } else {
            setResults(data.response.docs)
            onReady(data.response.docs.slice(0, max))
        }
    }, [])

    const instructions = showInstructions(component)

    if (instructions) {
        return instructions
    } else {
        return (
            <Frame
                width="100%"
                height="100%"
                backgroundColor="transparent"
                style={{ position: "relative" }}
            >
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "grid",
                        gridTemplateColumns: `repeat(${columns},1fr)`,
                        gridGap: gap,
                    }}
                >
                    {results.slice(0, max).map((result, index) => {
                        const ItemComponent = React.cloneElement(component[0], {
                            key: index,
                            onTap: () => {
                                onTapItem(normalizeFields(result, index, max))
                                onTapNavigate
                            },
                            ...normalizeFields(result, index, 16),
                            style: { position: "relative", width: "100%" },
                        })

                        return <li>{ItemComponent}</li>
                    })}
                </ul>
            </Frame>
        )
    }
}

Grid.defaultProps = {
    columns: 1,
    gap: 16,
    height: 128,
    width: 320,
    dataSource: false,
    url: "https://api.jsonbin.io/b/5e8c8ad9ff9c906bdf1d7c1e/",
    component: {},
    max: 10,
    onReady: () => null,
    onTapItem: () => null,
    onTapNavigate: () => null,
}

addPropertyControls(Grid, {
    component: {
        type: ControlType.ComponentInstance,
        title: "Design Component",
    },
    max: {
        type: ControlType.Number,
        title: "Max amount",
        displayStepper: true,
        min: 1,
        max: 25,
    },
    columns: {
        type: ControlType.Number,
        defaultValue: 1,
        min: 1,
        max: 5,
        step: 1,
        displayStepper: true,
    },
    gap: {
        type: ControlType.Number,
        defaultValue: 16,
        min: 0,
        max: 100,
        step: 1,
    },
    dataSource: {
        type: ControlType.Boolean,
        enabledTitle: "Local file",
        disabledTitle: "URL",
        defaultValue: false,
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
})
