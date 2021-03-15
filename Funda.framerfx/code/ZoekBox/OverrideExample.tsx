import * as React from "react"
import { Data, Override } from "framer"

const appState = Data({
    selection: "",
    results: [],
    query: "",
    city: "",
    polygon: {},
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
    const gemeentenaam = appState.selection.toLowerCase()
    const url = `https://services.arcgis.com/nSZVuSZjHpEZZbRo/arcgis/rest/services/Gemeentegrenzen_2019_kustlijn/FeatureServer/0/query?where=Gemeentenaam%20%3D%20%27${gemeentenaam}%27&outFields=*&outSR=4326&f=geojson`
    console.log(url)
    React.useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => (appState.polygon = data))
    }, [appState.selection])
    return {
        text: appState.selection === "" ? "Heel Nederland" : appState.selection,
    }
}

export function GetGeoJSON(): Override {
    return {
        geojson: "https://docs.mapbox.com/help/data/stations.geojson",
    }
}
