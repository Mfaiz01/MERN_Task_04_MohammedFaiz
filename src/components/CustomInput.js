import React from 'react';
import { Field } from 'formik';

const CustomInput = ({ label, name, type, autoComplete }) => (
  <div className="custom-input">
    <label htmlFor={name}>{label}</label>
    <Field type={type} name={name} id={name} autoComplete={autoComplete} />
  </div>
);

export default CustomInput;
