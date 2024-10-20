import React from "react";
import { useField } from "formik";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const DatePickerContainer = styled.div`
  margin-bottom: 20px;
`;

const CustomDatePicker = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <DatePickerContainer>
      <label>{label}</label>
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={date => helpers.setValue(date)}
        {...props}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </DatePickerContainer>
  );
};

export default CustomDatePicker;
