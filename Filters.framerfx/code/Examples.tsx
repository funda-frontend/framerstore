import { Data, Override } from "framer"

const data = Data({
    singleFilters: [""],
    buitenruimte: [],
})

export function DagenOpFunda(): Override {
    return {
        onValueChange(value) {
            console.log(value)
        },
    }
}

export function BuitenRuimte(): Override {
    return {
        initialValue: data.buitenruimte,
        onValueChange(value) {
            // console.log(value)
        },
    }
}

export function ReactSelect(): Override {
    return {
        defaultSelection: data.buitenruimte,
        onValueChange(array) {
            console.log(array)
            data.buitenruimte = array
        },
    }
}

export function Output(): Override {
    return {
        text: JSON.stringify(data.buitenruimte),
    }
}

export function ChipGroup(): Override {
    console.log(data.buitenruimte)
    return {
        chips: data.buitenruimte,
    }
}
