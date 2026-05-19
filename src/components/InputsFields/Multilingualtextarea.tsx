import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

interface MultilingualTextareaProps {
    label: string;
    fieldName: string;
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
    placeholder?: string;
}

const MultilingualTextarea: React.FC<MultilingualTextareaProps> = ({
    label,
    fieldName,
    values,
    errors,
    touched,
    onChange,
    placeholder,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Arabic */}
            <Field>
                <FieldLabel htmlFor={`ar.${fieldName}`}>{label} (AR)</FieldLabel>
                <FieldContent>
                    <Textarea
                        id={`ar.${fieldName}`}
                        value={values.ar}
                        placeholder={placeholder}
                        onChange={(e) => onChange('ar', e.target.value)}
                    />
                    <FieldError errors={touched.ar && errors.ar ? [{ message: errors.ar }] : []} />
                </FieldContent>
            </Field>

            {/* English */}
            <Field>
                <FieldLabel htmlFor={`en.${fieldName}`}>{label} (EN)</FieldLabel>
                <FieldContent>
                    <Textarea
                        id={`en.${fieldName}`}
                        value={values.en}
                        placeholder={placeholder}
                        onChange={(e) => onChange('en', e.target.value)}
                    />
                    <FieldError errors={touched.en && errors.en ? [{ message: errors.en }] : []} />
                </FieldContent>
            </Field>

            {/* Kurdish */}
            <Field>
                <FieldLabel htmlFor={`ku.${fieldName}`}>{label} (KU)</FieldLabel>
                <FieldContent>
                    <Textarea
                        id={`ku.${fieldName}`}
                        value={values.ku}
                        placeholder={placeholder}
                        onChange={(e) => onChange('ku', e.target.value)}
                    />
                    <FieldError errors={touched.ku && errors.ku ? [{ message: errors.ku }] : []} />
                </FieldContent>
            </Field>
        </div>
    );
};

export default MultilingualTextarea;