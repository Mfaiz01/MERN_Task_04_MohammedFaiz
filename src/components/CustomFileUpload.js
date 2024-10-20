import React from 'react';


const CustomFileUpload = ({ label, name, setFieldValue }) => {
  return (
    <div className="file-upload">
      <label htmlFor={name}>{label}</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={(event) => {
          const file = event.currentTarget.files[0];
          if (file) {
            setFieldValue(name, file);
          } else {
            setFieldValue(name, null); // Handle case where no file is selected
          }
        }}
      />
    </div>
  );
};


export default CustomFileUpload;
