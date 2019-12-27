import React, { FormEvent } from "react";
import { RadioGroup } from "@blueprintjs/core";

type SimpleSelectProps = {
  items: SimpleSelectItem[];
  onChange: (item: SimpleSelectItem) => void;
  initialValue: string;
};

type SimpleSelectItem = {
  label: string;
  value: string;
};

const SimpleSelect: React.FC<SimpleSelectProps> = props => {
  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const item = props.items.find(
      item => item.value === event.currentTarget.value
    );
    if (item) {
      props.onChange(item);
    }
  };

  return (
    <RadioGroup
      onChange={onChange}
      label="Choose image..."
      options={props.items}
      selectedValue={props.initialValue}
    />
  );
};

export default SimpleSelect;
