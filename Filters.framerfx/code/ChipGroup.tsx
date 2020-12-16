import * as React from "react"
import { Frame, Scroll, Stack, addPropertyControls, ControlType } from "framer"
import { Chip } from "./Chip"

ChipGroup.defaultProps = {
    height: 128,
    width: 240,
    chips: ["Tuin", "Balkon", "Dakterras"],
    onValueChange: () => null,
    onChipRemove: () => null,
    onHeightChange: () => null,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(ChipGroup, {
    chips: {
        title: "Chips",
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
})

export function ChipGroup(props) {
    const {
        width,
        height,
        chips,
        onValueChange,
        onHeightChange,
        onChipRemove,
    } = props

    const [items, dispatch] = React.useReducer((state, action) => {
        switch (action.type) {
            case "remove":
                return state.filter((_, index) => index != action.index)
            case "update":
                return (state = chips)
            default:
                return state
        }
    }, chips)
    const [chipsHeight, setChipsHeight] = React.useState(24)

    const inner = React.useRef(null)

    React.useEffect(() => {
        dispatch({ type: "update" })
        setChipsHeight(
            inner.current.clientHeight > 0 ? inner.current.clientHeight : 24
        )
    }, [chips])

    React.useEffect(() => {
        onHeightChange(chipsHeight)
    }, [chipsHeight])

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    }

    return (
        <Frame width={width + 8} height={height} backgroundColor="transparent">
            <Frame
                ref={inner}
                style={{
                    paddingTop: 8,
                    display: items.length > 0 ? "flex" : "none",
                    width,
                    height: "auto",
                    flexWrap: "wrap",
                    backgroundColor: "white",
                }}
            >
                {items.map((item, index) => {
                    return (
                        <Chip
                            key={index}
                            label={item}
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            onTap={() => {
                                dispatch({ type: "remove", index })
                                onChipRemove(item)
                                setChipsHeight(inner.current.clientHeight)
                            }}
                        />
                    )
                })}
            </Frame>
        </Frame>
    )
}
