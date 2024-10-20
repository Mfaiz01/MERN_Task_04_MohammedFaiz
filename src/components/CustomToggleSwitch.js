import React from 'react';
import { Field } from 'formik';

const CustomToggleSwitch = ({ label, name }) => (
  <div className="custom-toggle-switch">
    <label>
      <Field type="checkbox" name={name} id={name} />
      {label}
    </label>
  </div>
);

export default CustomToggleSwitch;
