import * as React from "react"
import { Multiselect } from "multiselect-react-dropdown"

export function CheckBoxGroupDropdown(props) {
    function onSelect(selectedList, selectedItem) {
        console.log(selectedList, selectedItem)
    }

    function onRemove(selectedList, selectedItem) {
        console.log(selectedList, selectedItem)
    }

    return (
        <Multiselect
            options={[
                { name: "Dakterras", id: 1 },
                { name: "Balkon", id: 2 },
            ]}
            displayValue="name"
            onSelect={onSelect}
            onRemove={onRemove}
            selectedValues={[{ name: "Dakterras", id: 1 }]}
            showCheckbox={true}
        />
    )
}
