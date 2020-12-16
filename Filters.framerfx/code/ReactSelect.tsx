import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
// @ts-ignore
import Select from "react-select"

ReactSelect.defaultProps = {
    options: ["Balkon", "Dakterras", "Tuin"],
    defaultSelection: ["Dakterras", "Tuin"],
    onValueChange: () => null,
}

addPropertyControls(ReactSelect, {
    options: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
    defaultSelection: {
        type: ControlType.Array,
        propertyControl: { type: ControlType.String },
    },
})

export function ReactSelect(props) {
    const { options, defaultSelection, onValueChange } = props
    const [newOptions, setNewOptions] = React.useState([])

    React.useEffect(() => {
        const optionsArray = []
        for (let option of options) {
            optionsArray.push({ value: option.toLowerCase(), label: option })
        }
        setNewOptions(optionsArray)
    }, [options])

    const selectionArray = []

    React.useEffect(() => {
        for (let selection of defaultSelection) {
            selectionArray.push({
                value: selection.toLowerCase(),
                label: selection,
            })
        }
    }, [defaultSelection])

    const [selections, setSelections] = React.useState(selectionArray)

    React.useEffect(() => {
        const array = []
        if (selections != null) {
            for (let selection of selections) {
                array.push(selection.label)
            }
            onValueChange(array)
        } else {
            return
        }
    }, [selections])

    return (
        <Frame>
            <Select
                options={newOptions}
                defaultValue={selections}
                onChange={setSelections}
                isMulti={true}
                menuIsOpen={true}
                hideSelectedOptions={false}
            />
        </Frame>
    )
}
