import React, { useState, useEffect } from "react";

const API = "http://localhost:3000/api";


export const sendCode = async (Code, Language) => {

      const formData = {
        Code: Code,
        Language: Language.id,
      };

      const response = await fetch(`${API}/compile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      const result = await response.json();
      console.log(result)
      return result;
    
    
};
