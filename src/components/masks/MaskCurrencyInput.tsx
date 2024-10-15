'use client'

import React from 'react';
import { Input } from '../ui/input';

interface MaskedCurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MaskedCurrencyInput: React.FC<MaskedCurrencyInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Remove tudo que não é número
    inputValue = inputValue.replace(/R\$\s?|[\.\-]/g, '').replace(/\D/g, '');

    // Formata o valor para R$ x,xx
    const formattedValue = inputValue
      ? 'R$ ' + (parseFloat(inputValue) / 100).toFixed(2).replace('.', ',')
      : 'R$ 0,00';

    onChange(formattedValue);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      className="col-span-3"
      placeholder="R$ 0,00"
    />
  );
};

export default MaskedCurrencyInput;