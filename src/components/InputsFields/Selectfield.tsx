import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface SelectOption {
    id: number | string;
    label: string;
    value: string;
}

interface SelectFieldProps {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    error?: string;
    touched?: boolean;
    placeholder?: string;
    disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    id,
    value,
    onChange,
    options,
    error,
    touched,
    placeholder = 'Select an option',
    disabled = false,
}) => {
    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <FieldContent>
                <Select value={value} onValueChange={onChange} disabled={disabled}>
                    <SelectTrigger id={id}>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options && options.length > 0 ? (
                            options.map((option) => (
                                <SelectItem key={option.id} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        ) : (
                            <SelectItem value="" disabled>
                                No options available
                            </SelectItem>
                        )}
                    </SelectContent>
                </Select>
                <FieldError errors={touched && error ? [{ message: error }] : []} />
            </FieldContent>
        </Field>
    );
};

export default SelectField;