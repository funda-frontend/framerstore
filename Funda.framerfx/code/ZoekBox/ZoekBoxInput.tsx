import * as React from "react"
import { Frame, ControlType, addPropertyControls } from "framer"
import * as $ from "jquery"
import styled from "styled-components"
// @ts-ignore
import { colors } from "../canvas"

addPropertyControls(ZoekBoxInput, {
    customTextColor: { type: ControlType.Color, title: "Text color" },
    customBackground: { type: ControlType.Color, title: "Background color" },
    fontFamily: {
        type: ControlType.String,
        defaultValue: "Proxima Nova, Proxima Nova Regular",
    },
    zbType: {
        type: ControlType.Enum,
        title: "Type",
        defaultValue: "koop",
        options: ["koop", "huur", "nieuwbouw", "recreatie", "europe"],
        optionTitles: ["Koop", "Huur", "Nieuwbouw", "Recreatie", "Europe"],
    },
    currentIdentifiers: {
        type: ControlType.String,
        title: "Current Identifiers",
    },
    value: { type: ControlType.String, title: "Initial value" },
    padding: {
        type: ControlType.FusedNumber,
        toggleKey: "paddingPerSide",
        toggleTitles: ["All Sides", "Per Side"],
        valueKeys: [
            "paddingTop",
            "paddingRight",
            "paddingBottom",
            "paddingLeft",
        ],
        valueLabels: ["T", "R", "B", "L"],
        min: 0,
        title: "Input padding",
        defaultValue: 4,
    },
    borderColor: { type: ControlType.Color },
    borderColorFocus: { type: ControlType.Color },
    border: {
        type: ControlType.FusedNumber,
        title: "Border",
        toggleKey: "mixedBorders",
        toggleTitles: ["All", "Individual"],
        valueKeys: ["borderTop", "borderRight", "borderBottom", "borderLeft"],
        valueLabels: ["T", "R", "B", "L"],
        defaultValue: 1,
    },
    radius: {
        type: ControlType.FusedNumber,
        title: "Radius",
        toggleKey: "mixedRadius",
        toggleTitles: ["All", "Individual"],
        valueKeys: ["topLeft", "topRight", "bottomRight", "bottomLeft"],
        valueLabels: ["TL", "TR", "BR", "BL"],
    },
    reset: { type: ControlType.Boolean, title: "Reset" },
    hasFocus: { type: ControlType.Boolean, title: "Has Focus" },
    placeholder: { type: ControlType.String, title: "Placeholder" },
    maxResults: {
        type: ControlType.Number,
        title: "Max Results",
        displayStepper: true,
        step: 1,
        min: 1,
        max: 10,
    },
    onFocus: { type: ControlType.EventHandler },
    onBlur: { type: ControlType.EventHandler },
    onChange: { type: ControlType.EventHandler },
})

ZoekBoxInput.defaultProps = {
    width: 320,
    height: 44,
    value: "Amsterdam",
    placeholder: "Zoek naar een plaats, buurt, adres, etc.",
    padding: 0,
    paddingPerSide: true,
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 0,
    paddingLeft: 16,
    borderColor: colors.GreyLight,
    borderColorFocus: colors.Grey,
    border: 1,
    mixedBorder: false,
    radius: 4,
    mixedRadius: false,
    zbNiveau: null,
    zbType: "koop",
    zbParent: "",
    customTextColor: colors.GreyDarker,
    customBackground: colors.GreyLighter,
    fontFamily: "Proxima Nova, Proxima Nova Regular",
    reset: false,
    hasFocus: false,
    maxResults: 5,
    onChange: () => null,
    onFocus: () => null,
    onBlur: () => null,
}

export function ZoekBoxInput(props) {
    const {
        width,
        height,
        value,
        maxResults,
        placeholder,
        padding,
        paddingPerSide,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        borderColor,
        borderColorFocus,
        border,
        mixedBorders,
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
        zbType,
        currentIdentifiers,
        onChange,
        onFocus,
        onBlur,
        customBackground,
        customTextColor,
        fontFamily,
        reset,
        hasFocus,
    } = props

    // Store the input's last value in a ref
    const input = React.useRef<HTMLInputElement>()

    const [query, setQuery] = React.useState(value)
    const [focused, setFocused] = React.useState(hasFocus)
    const [results, setResults] = React.useState([])

    const zbURL = "https://zb.funda.info/suggest/"
    const zbAltURL = "https://zb.funda.info/suggest/alternatives/"

    let isMounted = true

    React.useEffect(() => {
        if (isMounted) {
            input.current.value = value
            setQuery(value)
        }
        return () => {
            isMounted = false
        }
    }, [value])

    function fetchZoekBox(url) {
        $.ajax({
            url: url,
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                query: query,
                max: maxResults,
                type: zbType,
                areatype: null,
                currentIdentifiers: `${decodeURI(currentIdentifiers)},0`,
            },
            success: (response) => {
                const results = query.length > 1 ? response.Results : []
                onChange(query, results, currentIdentifiers, zbType)
                setResults(results)
            },
        })
    }

    React.useEffect(() => {
        if (isMounted) {
            fetchZoekBox(zbURL)
        }
        return () => {
            isMounted = false
        }
    }, [query])

    React.useEffect(() => {
        if (isMounted) {
            if (reset) {
                input.current.value = ""
                setQuery("")
            } else {
                input.current.value = value
                setQuery(value)
            }
        }
        return () => {
            isMounted = false
        }
    }, [reset])

    React.useEffect(() => {
        if (hasFocus) {
            input.current.focus()
        } else {
            input.current.blur()
        }
    }, [hasFocus])

    function clearInput() {
        input.current.value = ""
        input.current.focus()
        setQuery("")
    }

    function handleFocus(event, hasFocus) {
        if (hasFocus) {
            onFocus(true)
            onBlur(false)
            input.current.focus()
            setFocused(true)
        } else {
            onBlur(true)
            onFocus(false)
            input.current.blur()
            setFocused(false)
        }
    }

    const paddingValue = paddingPerSide
        ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
        : `${padding}px`

    const borderWidth = mixedBorders
        ? `${borderTop}px ${borderRight}px ${borderBottom}px ${borderLeft}px`
        : border

    const borderRadius = mixedRadius
        ? `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`
        : radius

    return (
        <Frame
            width="100%"
            height={height}
            backgroundColor="transparent"
            overflow="hidden"
            radius={focused && query.length > 1 ? borderRadius : topLeft}
            style={{
                borderColor: focused ? borderColorFocus : borderColor,
                borderStyle: "solid",
                borderWidth: focused && query.length > 1 ? borderWidth : border,
            }}
        >
            <Input
                onChange={(event) => {
                    setQuery(event.target.value)
                }}
                type="search"
                name="search"
                height={height - paddingTop - paddingBottom}
                ref={input}
                fontFamily={fontFamily}
                paddingLeft={paddingLeft}
                paddingRight={paddingRight}
                padding={paddingValue}
                placeholder={placeholder}
                color={customTextColor}
                background={customBackground}
                onFocus={(event) => handleFocus(event, true)}
                onBlur={(event) => handleFocus(event, false)}
            />
        </Frame>
    )
}

const Input = styled.input`
    box-sizing: border-box;
    width: calc(100% - ${(props) => props.paddingLeft}px - ${(props) =>
    props.paddingRight}px);
    height: ${(props) => props.height}px;
    box-sizing: content-box;
    background: ${(props) => props.background};
    border: none;
    outline: none;
    border-radius: ${(props) => props.radius};
    padding: ${(props) => props.padding};
    font-size: 16px;
    line-height: 24px;
    font-family: ${(props) => props.fontFamily}; 
    font-weight: 400,
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    outline: none;    
    -webkit-appearance: none;
    -moz-appearance: none;
    &:focus {
      border-color: #CCC;
      outline: none;
    }
    &::placeholder {
        color: #666;
    }
`

const ClearQuery = styled.div`
    position: absolute;
    width: 44px;
    height: 44px;
    right: 0;
    top: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    svg {
        position: absolute;
        top: 13px; left: 13px;
    }
`
