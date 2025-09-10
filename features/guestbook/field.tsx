'use client';

import styles from '@/app/guestbook/notes.module.css';
import { cn } from '@/lib/utils';
import { useId } from 'react';

interface FieldProps {
  value: string;
  label: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({
  value,
  label,
  onChange,
  name,
  placeholder,
  ...props
}: FieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-y-1">
      <label className="font-medium text-[14px]" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        required
        autoComplete="off"
        autoCorrect="off"
        className={cn(
          'w-full rounded-[6px] bg-[#101B1D]/30 p-3 font-normal text-[16px] text-gray-2 outline-hidden transition-all placeholder:text-[white]/40 focus:bg-gray-1 focus:text-gray-12 focus:placeholder:text-gray-9 ',
          styles.input
        )}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  );
};

export default Field;
