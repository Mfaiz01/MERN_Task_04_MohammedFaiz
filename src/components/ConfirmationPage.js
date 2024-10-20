// src/components/ConfirmationPage.js

import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const { state } = useLocation(); 

  return (
    <div>
      <h1>Application Submitted Successfully!</h1>
      <h2>Submitted Details:</h2>
      <pre>{JSON.stringify(state.formData, null, 2)}</pre>
      
    </div>
  );
};

export default ConfirmationPage;
