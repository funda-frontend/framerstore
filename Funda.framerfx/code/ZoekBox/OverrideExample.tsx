import { Data, Override } from "framer"

const appState = Data({
    selection: "",
    results: [],
    query: "",
    city: "",
})

export const Input: Override = (props) => {
    return {
        onChange(
            query: string,
            results: any,
            currentIdentifiers: any,
            type: string
        ) {
            appState.results = results
            appState.query = query
        },
        onFocus() {
            // console.log("focus")
        },
        onBlur() {
            // console.log("blur")
        },
    }
}

export const Output: Override = () => {
    return {
        query: appState.query,
        results: appState.results,
        onSelect(
            resultName,
            resultNiceName,
            resultParent,
            resultParentLabel,
            resultNiveau,
            resultNiveauLabel,
            resultCount
        ) {
            appState.selection = resultNiceName
            appState.city =
                resultParentLabel == null ? resultName : resultParentLabel
        },
    }
}

export function LocationTitle(): Override {
    return {
        text: appState.selection === "" ? "Heel Nederland" : appState.selection,
    }
}

export function LocationPhoto(): Override {
    return {
        search: appState.selection === "" ? "Heel Nederland" : appState.city,
    }
}
