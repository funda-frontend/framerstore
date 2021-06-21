import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
// @ts-ignore
import { Icon } from "../Icon";

Select.defaultProps = {
  height: 44,
  width: 240,
  inlineLabel: true,
  label: "Van",
  options: [
    "€ 0",
    "€ 50.000",
    "€ 100.000",
    "€ 150.000",
    "€ 200.000",
    "€ 250.000",
    "€ 300.000",
    "€ 350.000",
    "€ 400.000",
  ],
  value: "€ 0",
  onValueChange: () => null,
  fontFamily: "Proxima Nova",
};

addPropertyControls(Select, {
  inlineLabel: { type: ControlType.Boolean, defaultValue: false },
  label: {
    type: ControlType.String,
  },
  value: { type: ControlType.String },
  options: {
    type: ControlType.Array,
    propertyControl: { type: ControlType.String },
  },
  fontFamily: {
    type: ControlType.String,
    title: "Font Family",
    defaultValue: "Proxima Nova",
  },
});

export function Select(props) {
  const {
    width,
    height,
    inlineLabel,
    label,
    options,
    value,
    onValueChange,
    fontFamily,
  } = props;
  const [initialValue, setInitialValue] = React.useState(value);

  React.useEffect(() => {
    setInitialValue(value);
  }, [value]);

  return (
    <div
      style={{
        position: "relative",
        fontFamily: "Proxima Nova, Proxima Nova Regular",
        fontSize: 16,
        lineHeight: 1.5,
      }}
    >
      <div style={inlineLabel ? inlineLabelStyle : labelStyle}>{label}</div>
      <div style={{ position: "relative", height: 44 }}>
        <select
          style={{
            ...selectStyle,
            paddingLeft: inlineLabel ? "56px" : "16px",
            fontFamily,
          }}
          onChange={(event) => {
            setInitialValue(event.target.value);
            onValueChange(event.target.value);
          }}
          value={initialValue}
        >
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
        <Icon
          name="arrowDown"
          style={{
            position: "absolute",
            top: 10,
            right: 8,
          }}
        />
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  position: "relative",
  paddingBottom: 4,
};

const inlineLabelStyle: React.CSSProperties = {
  position: "absolute",
  left: 16,
  top: 10,
  width: "auto",
  height: "44px",
  fontSize: "16px",
  lineHeight: "24px",
  color: "#666",
  backgroundColor: "transparent",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  height: "44px",
  margin: "0",
  background: "#fff",
  borderRadius: "2px",
  outline: "none",
  appearance: "none",
  WebkitAppearance: "none",
  fontSize: "16px",
  padding: "0 32px 0 16px",
  color: "#333",
  lineHeight: "24px",
  cursor: "pointer",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1) inset",
  transition: "border .2s cubic-bezier(.23,1,.32,1)",
  paddingLeft: "3rem",
  border: "1px solid #CCCCCC",
};
