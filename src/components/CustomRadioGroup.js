import React from "react";
import { Field } from "formik";

const CustomRadioGroup = ({ name, options }) => {
  return (
    <div role="group" aria-labelledby={name}>
      {options.map((option) => (
        <label key={option}>
          <Field type="radio" name={name} value={option} />
          {option}
        </label>
      ))}
    </div>
  );
};

export default CustomRadioGroup;
