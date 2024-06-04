// components/Input.tsx
"use client"; // This marks the component as a client component

import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const CustomInput: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  );
};

