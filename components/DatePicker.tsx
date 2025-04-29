'use client';

import { ChangeEvent } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DatePicker({ value, onChange, className = '' }: DatePickerProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleChange}
      className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}