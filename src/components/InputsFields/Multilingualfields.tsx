import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React from 'react';

interface MultilingualFieldsProps {
    label: string;
    fieldName: string; // 'name' or 'slug'
    values: {
        ar: string;
        en: string;
        ku: string;
    };
    errors: {
        ar?: string;
        en?: string;
        ku?: string;
    };
    touched: {
        ar?: boolean;
        en?: boolean;
        ku?: boolean;
    };
    onChange: (lang: 'ar' | 'en' | 'ku', value: string) => void;
    type?: string;
}

const MultilingualFields: React.FC<MultilingualFieldsProps> = ({
    label,
    fieldName,
    values,
    errors,
    touched,
    onChange,
    type = 'text',
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Arabic */}
            <Field>
                <FieldLabel htmlFor={`ar.${fieldName}`}>{label} (AR)</FieldLabel>
                <FieldContent>
                    <Input
                        id={`ar.${fieldName}`}
                        type={type}
                        value={values.ar}
                        onChange={(e) => onChange('ar', e.target.value)}
                    />
                    <FieldError errors={touched.ar && errors.ar ? [{ message: errors.ar }] : []} />
                </FieldContent>
            </Field>

            {/* English */}
            <Field>
                <FieldLabel htmlFor={`en.${fieldName}`}>{label} (EN)</FieldLabel>
                <FieldContent>
                    <Input
                        id={`en.${fieldName}`}
                        type={type}
                        value={values.en}
                        onChange={(e) => onChange('en', e.target.value)}
                    />
                    <FieldError errors={touched.en && errors.en ? [{ message: errors.en }] : []} />
                </FieldContent>
            </Field>

            {/* Kurdish */}
            <Field>
                <FieldLabel htmlFor={`ku.${fieldName}`}>{label} (KU)</FieldLabel>
                <FieldContent>
                    <Input
                        id={`ku.${fieldName}`}
                        type={type}
                        value={values.ku}
                        onChange={(e) => onChange('ku', e.target.value)}
                    />
                    <FieldError errors={touched.ku && errors.ku ? [{ message: errors.ku }] : []} />
                </FieldContent>
            </Field>
        </div>
    );
};

export default MultilingualFields;