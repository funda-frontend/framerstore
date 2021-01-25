import * as React from "react"
import {
    Frame,
    Scroll,
    Stack,
    addPropertyControls,
    ControlType,
    RenderTarget,
} from "framer"
import {
    isValidComponent,
    showInstructions,
    None,
    Suggestion,
    dummyData,
} from "./Utils"
// @ts-ignore
import { colors } from "../canvas"

addPropertyControls(ZoekBoxOutput, {
    radius: {
        type: ControlType.FusedNumber,
        title: "Radius",
        toggleKey: "mixedRadius",
        toggleTitles: ["All", "Individual"],
        valueKeys: ["topLeft", "topRight", "bottomRight", "bottomLeft"],
        valueLabels: ["TL", "TR", "BR", "BL"],
    },
    backgroundColor: { type: ControlType.Color, title: "Background" },
    borderColor: { type: ControlType.Color },
    border: {
        type: ControlType.FusedNumber,
        title: "Border",
        toggleKey: "mixedBorders",
        toggleTitles: ["All", "Individual"],
        valueKeys: ["borderTop", "borderRight", "borderBottom", "borderLeft"],
        valueLabels: ["T", "R", "B", "L"],
    },
    emptyDesign: { type: ControlType.ComponentInstance },
    suggestionDesign: { type: ControlType.ComponentInstance },
    onTapNavigate: { type: ControlType.EventHandler },
    fontFamily: {
        type: ControlType.String,
        defaultValue: "Proxima Nova, Proxima Nova Regular",
    },
})

ZoekBoxOutput.defaultProps = {
    width: 320,
    height: 320,
    radius: 4,
    border: 1,
    borderColor: colors.Grey,
    mixedBorders: false,
    backgroundColor: colors.NaturalBlue,
    fontFamily: "Proxima Nova Regular",
    results: [],
    query: "",
    onSelect: () => null,
    onTapNavigate: () => null,
}

export function ZoekBoxOutput(props) {
    const {
        width,
        height,
        backgroundColor,
        borderColor,
        mixedBorders,
        border,
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        radius,
        mixedRadius,
        topLeft,
        topRight,
        bottomRight,
        bottomLeft,
        fontFamily,
        results,
        query,
        emptyDesign,
        suggestionDesign,
        onSelect,
        onTapNavigate,
        contentOffsetY,
    } = props
    const [focused, setFocused] = React.useState(0)
    const [data, setData] = React.useState(dummyData)

    React.useEffect(() => {
        setData(results)
    }, [results])

    function handleMouseOver(event, index, resultName) {
        setFocused(index)
    }

    function handleClick(
        index,
        resultName,
        resultNiceName,
        resultParent,
        resultParentLabel,
        resultNiveau,
        resultNiveauLabel,
        resultCount
    ) {
        onSelect(
            resultName,
            resultNiceName,
            resultParent,
            resultParentLabel,
            resultNiveau,
            resultNiveauLabel,
            resultCount
        )
    }

    function Thousands(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const borderWidth = mixedBorders
        ? `${borderTop}px ${borderRight}px ${borderBottom}px ${borderLeft}px`
        : border

    const borderRadius = mixedRadius
        ? `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
        : radius

    const EmptyElement = isValidComponent(emptyDesign) ? (
        React.cloneElement(emptyDesign[0], {
            width,
        })
    ) : (
        <None width={width} />
    )

    if (RenderTarget.current() === "CANVAS") {
        return EmptyElement
    }

    if (data.length === 0 && query.length > 1) {
        return EmptyElement
    } else {
        return (
            <Frame
                radius={borderRadius}
                width="100%"
                height="100%"
                backgroundColor={backgroundColor}
                overflow={"hidden"}
                visible={query.length > 1}
                style={{
                    borderColor,
                    borderStyle: "solid",
                    borderWidth,
                }}
            >
                <Scroll
                    width="100%"
                    height="100%"
                    wheelEnabled={true}
                    visible={query.length === 0 ? false : true}
                    contentOffsetY={contentOffsetY}
                    style={{
                        backgroundColor,
                    }}
                >
                    <Stack
                        gap={0}
                        width="100%"
                        height="100%"
                        backgroundColor={"transparent"}
                    >
                        {data.map((result, index) => {
                            const Name = result.Display.Naam
                            const Parent = result.Parent
                            const ParentLabel = result.Display.Parent
                            const Niveau = result.Niveau
                            const NiveauLabel = result.Display.NiveauLabel
                            const SubText = `${NiveauLabel}${
                                ParentLabel === null ? "" : ", " + ParentLabel
                            }`
                            const Count = Thousands(result.Aantal).toString()
                            let NameBeautified = `${Name}${
                                Niveau <= 1 ? "" : `, ${ParentLabel}`
                            }`
                            if (Niveau === 1) {
                                NameBeautified = `Gemeente ${Name}`
                            }

                            const queryStartPos = Name.toLowerCase().indexOf(
                                query
                            )
                            const queryEndPos = queryStartPos + query.length
                            const queryMiddle = Name.substring(
                                queryStartPos,
                                queryEndPos
                            )
                            const queryStart = Name.substring(0, queryStartPos)
                            const queryEnd = Name.substring(
                                queryEndPos,
                                Name.length
                            )

                            if (isValidComponent(suggestionDesign)) {
                                return React.cloneElement(suggestionDesign[0], {
                                    width: "100%",
                                    backgroundColor,
                                    key: index,
                                    Name,
                                    Count,
                                    SubText,
                                    whileHover: {
                                        opacity: 0.5,
                                        transition: { duration: 0.1 },
                                    },
                                    onTap: (event) => {
                                        event.preventDefault()
                                        onTapNavigate()
                                        handleClick(
                                            index,
                                            Name,
                                            NameBeautified,
                                            Parent,
                                            ParentLabel,
                                            Niveau,
                                            NiveauLabel,
                                            result.Aantal
                                        )
                                    },
                                    onMouseOver: (event) => {
                                        event.preventDefault()
                                        handleMouseOver(
                                            event,
                                            index,
                                            result.Display.Naam
                                        )
                                    },
                                    style: {
                                        cursor: "pointer",
                                        display: "block",
                                    },
                                })
                            } else {
                                return (
                                    <Frame
                                        key={index}
                                        radius={radius}
                                        width="100%"
                                        height={56}
                                        backgroundColor={backgroundColor}
                                        onTap={(event) => {
                                            event.preventDefault()
                                            handleClick(
                                                index,
                                                Name,
                                                NameBeautified,
                                                Parent,
                                                ParentLabel,
                                                Niveau,
                                                NiveauLabel,
                                                result.Aantal
                                            )
                                        }}
                                        onMouseOver={(e) => {
                                            e.preventDefault()
                                            handleMouseOver(
                                                event,
                                                index,
                                                result.Display.Naam
                                            )
                                        }}
                                    >
                                        <Suggestion
                                            width="100%"
                                            height="100%"
                                            backgroundColor={
                                                index === focused
                                                    ? "#E6F2F7"
                                                    : "#FFF"
                                            }
                                            Name={""}
                                            SubText={SubText}
                                            Count={Count}
                                        />
                                        <Frame
                                            top={6}
                                            left={48}
                                            height={24}
                                            backgroundColor="transparent"
                                            style={{
                                                fontFamily,
                                                fontSize: 16,
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {queryStart}
                                            <strong>{queryMiddle}</strong>
                                            {queryEnd}
                                        </Frame>
                                    </Frame>
                                )
                            }
                        })}
                    </Stack>
                </Scroll>
            </Frame>
        )
    }
}
