// src/components/CustomSelect.js

import React from "react";
import { Field, ErrorMessage } from "formik";

const CustomSelect = ({ label, options, ...props }) => {
  return (
    <div>
      <label>{label}</label>
      <Field as="select" {...props}>
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Field>
      <ErrorMessage name={props.name} component="div" style={{ color: 'red' }} />
    </div>
  );
};

export default CustomSelect;
