import * as React from "react"
import { Data, Override } from "framer"

const appState = Data({
    selection: "",
    results: [],
    query: "",
    city: "",
    polygon: {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [4.86968994140625, 52.387963405382365],
                            [4.85870361328125, 52.374760798535036],
                            [4.866943359375, 52.35065062061594],
                            [4.898529052734375, 52.338066174105585],
                            [4.956207275390625, 52.345407536546354],
                            [4.953117370605469, 52.37769505233968],
                            [4.9349212646484375, 52.39445847705198],
                            [4.885826110839844, 52.39718193234288],
                            [4.86968994140625, 52.387963405382365],
                        ],
                    ],
                },
            },
        ],
    },
    searchInputHasFocus: false,
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
        hasFocus: true,
        onFocus() {
            console.log("focus")
        },
        onBlur() {
            console.log("blur")
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
