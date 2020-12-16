# ZoekBox Package

This packages allows you to add a fully functional ZoekBox to your prototype as the one you can find at funda.nl and fundainbusiness.nl.

It uses the [ZoekBox API](https://zb.funda.info/suggest/) that gives you location search suggestions on the fly.

## Usage

This packages contains two main components.

### ZoekBoxInput

The ZoekBoxInput is a search input field where you type your search query.

| Prop               | Type          | Default                     | Info                                                    |
| ------------------ | ------------- | --------------------------- | ------------------------------------------------------- |
| Text color         | `Color`       | `$GreyDarker`               | Color of the input text                                 |
| Background color   | `Color`       | `$White`                    | Color of the input background                           |
| Radius             | `FusedNumber` | `4`                         | Border radius of the input field                        |
| Input padding      | `FusedNumber` | `16`                        | Padding for the input field.                            |
| Border             | `FusedNumber` | `0`                         | Border for the input field.                             |
| Type               | `Enum`        | `"Koop"`                    | Channel (Koop/Huur/Nieuwbouw/Recreatie/Europa)          |
| Current Identifier | `String`      | `null`                      | Context of your search.<br>E.g. amsterdam/nieuwe-pijp,0 |
| Initial Value      | `String`      | `"Amsterdam"`               | Immediate search                                        |
| Placeholder        | `String`      | `"Zoek naar een plaats..."` | Placeholder text                                        |
| Max Results        | `Number`      | `5`                         | Ths max ammount of suggestions                          |

### ZoekBoxOutput

The ZoekBoxOutput interacts with the ZoekBoxInput and shows the suggestions based on your search query. The special thing about this component is that it takes custom Design Components. So you can make the suggestions design and look like however you want.

| Prop              | Type          | Default        | Info                                                            |
| ----------------- | ------------- | -------------- | --------------------------------------------------------------- |
| Radius            | `FusedNumber` | `4`            | Border radius of the input field                                |
| Border            | `FusedNumber` | `0`            | Border for the input field.                                     |
| Background color  | `Color`       | `$NaturalBlue` | Color of the input background                                   |
| Empty Design      | `Object`      | `null`         | Design the output when tere are no results                      |
| Suggestion Design | `Object`      | `null`         | Design the output that gets repeated for each search suggestion |
| OnSelect          | `Event`       | `null`         | Add functionality to tapping on a search suggestion             |

### Why two separate components?

Having two separate componente allows you to put the input and output wherever it fits your design. To make them work together you need Overrides. See example below.

**Example Override**

```
import { Data, Override } from "framer"

const appState = Data({
    selection: "",
    results: [],
    query: "",
})

// Override for your ZoekBoxInput component
export const Input: Override = props => {
    return {
        onChange(
            query: string,
            results: any,
            currentIdentifiers: any,
            type: string
        ) {
            console.log(results)
            appState.results = results
            appState.query = query
        },
    }
}

// Override for your ZoekBoxOutput component
export const Output: Override = props => {
    return {
        results: appState.results,
        query: appState.query,
        onSelect(
            name: string,
            niceName: string,
            parent: number,
            parentLabel: string,
            niveau: any,
            niveauLabel: string,
            count: number
        ) {
            appState.selection = niceName
        },
    }
}
```
