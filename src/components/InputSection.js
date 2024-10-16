import React from "react";
import Select from "react-select";


const CustomInputComponent = ({
  label,
  data,
  isLoading,
  clearable,
  searchable,
  onChange,
  disabled,
  mutiple,
  inputValue,
  onInput,
  tootip,
}) => {
  return (
    <div className="input-container" title={tootip}>
      <p className="input-label">{label}</p>
      <div className="select-container">
        <Select
          className="basic-single select-component"
          classNamePrefix="select"
          isLoading={isLoading}
          isMulti={mutiple}
          isClearable={clearable}
          isSearchable={searchable}
          onChange={(value) => onChange(value)}
          name="from"
          placeholder="Select currency"
          options={data}
        />
      </div>
      <input
        type="number"
        value={inputValue}
        onInput={(e) => onInput(e.currentTarget.value)}
        min={1}
        className="input-field"
        disabled={disabled}
        placeholder="0.00"
      />
      <p className="amount-label">{label === "To" ? "Converted" : ""} Amount</p>
    </div>
  );
};

export default CustomInputComponent;
