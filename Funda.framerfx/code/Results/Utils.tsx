import * as React from "react"
import { Frame } from "framer"

// converts List fields to a format that Framer understands
export const normalizeFields = (fields: any, index: number, total: number) => {
    const result = {}

    for (const key of Object.keys(fields)) {
        const value = fields[key]
        const Woonplaats = fields["Woonplaats"]
        const Woonoppervlakte = fields["WoonOppervlakteVan"]
        const Perceeloppervlakte = fields["Perceeloppervlakte"]
        const AantalKamers = fields["AantalKamers"]
        result["Number"] = (index + 1).toString()
        result["Total"] = total.toString()
        if (key == "HoofdFoto") {
            result[
                key
            ] = `https://cloud.funda.nl/valentina_media${value.replace(
                ".jpg",
                ""
            )}_720x480.jpg`
        }
        if (key == "Adres") {
            result[key] = value
        }
        if (key == "Postcode") {
            result["PostcodeWoonplaats"] = `${value} ${Woonplaats}`
        }
        if (key == "KoopPrijs") {
            result["Prijs"] = `€ ${value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} k.k.`
        }
        if (key == "WoonOppervlakteVan") {
            result["Kenmerken"] = `${Woonoppervlakte} m² ${
                Perceeloppervlakte != undefined
                    ? `/ ${Perceeloppervlakte} m² `
                    : ""
            }• ${AantalKamers} kamers`
        }
        if (key == "KantoorNaam") {
            result["KantoorNaam"] = value
        }
    }
    return result
}

export const isValidComponent = (component?: any): boolean => {
    if (!!component) {
        return !!component[0]
    } else {
        return false
    }
}

/**
 * @returns a component with usage instructions if any of the arguments are not valid. If all arguments are valid, returns undefined.
 */
// @ts-ignore
export function showInstructions(component: any[]): JSX.Element | undefined {
    if (isValidComponent(component)) {
        return undefined
    }

    return (
        <Frame style={InstructionStyle}>
            <h1>Instructions</h1>
            <p>
                Use this component to generate a list of houses from a Solr json
                file based on your custom design.
            </p>
            <h2>Steps</h2>
            <ol>
                <li>
                    👩🏻‍🎨 Create a Design Component that contains Frames with these
                    exact Layer names:
                    <ul>
                        <li>
                            <strong>HoofdFoto</strong> - Frame with image
                            background
                        </li>
                        <li>
                            <strong>Adres</strong> - Text
                        </li>
                        <li>
                            <strong>PostcodeWoonplaats</strong> - Text
                        </li>
                        <li>
                            <strong>Kenmerken</strong> - Text
                        </li>
                        <li>
                            <strong>Prijs</strong> - Text
                        </li>
                        <li>
                            <strong>Kantoornaam</strong> - Text
                        </li>
                    </ul>
                </li>
                <li>🔗 Link the Design Component to this Component.</li>
                <li>
                    🏡 Generate a JSON file on&nbsp;
                    <a
                        href="http://beta.fre-01-008.prod.funda.nl:8080/searcher/#/funda/query"
                        target="_blank"
                        style={{ color: "white" }}
                    >
                        Solr.
                    </a>
                </li>
                <li>Add this JSON file to this component.</li>
            </ol>
        </Frame>
    )
}

const InstructionStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    fontFamily: "Courier",
    fontSize: 14,
    lineHeight: 1.5,
    padding: 20,
    color: "#bb88ff",
    backgroundColor: "#2f2546",
    border: "1px solid #8855ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden",
}
