import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react';

interface FormFieldProps {
    label: string;
    id: string;
    type?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    error?: string;
    touched?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    id,
    type = 'text',
    value,
    onChange,
    error,
    touched,
    placeholder,
    disabled = false,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (type === 'number') {
            onChange(val === '' ? 0 : Number(val));
        } else {
            onChange(val);
        }
    };

    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <FieldContent>
                <Input
                    id={id}
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                <FieldError errors={touched && error ? [{ message: error }] : []} />
            </FieldContent>
        </Field>
    );
};

export default FormField;