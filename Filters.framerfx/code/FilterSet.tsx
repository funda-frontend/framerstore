import * as React from "react"
import { Frame, Stack, addPropertyControls, ControlType } from "framer"
import { RadioGroup } from "./RadioGroup"
import { CheckboxGroup } from "./CheckboxGroup"
import { Flyout } from "./Flyout"

export function FilterSet(props) {
    const { width } = props

    return (
        <Stack width={width} height={600} gap={16} backgroundColor="white">
            <RadioGroup initialValue="" width={width} />
            <RadioGroup
                initialValue="Woonhuis"
                options={["Woonhuis", "Appartement", "Parkeergelegenheid"]}
                legend={"Soort aanbod"}
                width={width}
                onValueChange={value => {
                    console.log(value)
                }}
            />
            <RadioGroup
                width={width}
                legend="Aantal kamers"
                initialValue=""
                options={[
                    "1 kamer",
                    "2+ kamers",
                    "3+ kamers",
                    "4+ kamers",
                    "5+ kamers",
                ]}
            />
            <CheckboxGroup
                options={["Balkon", "Tuin", "Dakterras"]}
                initialValue={["Balkon", "", "Dakterras"]}
                width={width}
                onValueChange={value => {
                    console.log(value)
                }}
            />
            <Flyout width={width} />
        </Stack>
    )
}

FilterSet.defaultProps = {
    width: 320,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(FilterSet, {})
