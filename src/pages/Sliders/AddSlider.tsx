import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/APis/Axios';
import { Sliders } from 'lucide-react';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SuccessAlert } from '@/components/Alerts/SuccessAlert';
import { UnSuccessAlert } from '@/components/Alerts/UnSuccessAlert';
import MediaUpload from '@/components/media-upload/MediaUpload';
import ActiveSwitcher from '@/components/ActiveSwitcher';
import MultilingualFields from '@/components/InputsFields/Multilingualfields';
import MultilingualTextarea from '@/components/InputsFields/Multilingualtextarea';
import FormField from '@/components/InputsFields/Formfield';

type SliderFormValues = {
  ar: {
    title: string;
    description: string;
  };
  en: {
    title: string;
    description: string;
  };
  ku: {
    title: string;
    description: string;
  };
  discount: number;
  type: string;
  platform: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  image?: string | Record<string, unknown>;
};

const validationSchema = Yup.object({
  ar: Yup.object({
    title: Yup.string().required('Title (Ar) is required'),
    description: Yup.string().required('Description (Ar) is required'),
  }),
  en: Yup.object({
    title: Yup.string().required('Title (En) is required'),
    description: Yup.string().required('Description (En) is required'),
  }),
  ku: Yup.object({
    title: Yup.string().required('Title (Ku) is required'),
    description: Yup.string().required('Description (Ku) is required'),
  }),
  discount: Yup.number()
    .typeError('Discount must be a number')
    .min(0)
    .required('Discount is required'),
  type: Yup.string().required('Type is required'),
  platform: Yup.string().required('Platform is required'),
  is_active: Yup.boolean().required('Status is required'),
  start_at: Yup.string().required('Start date is required'),
  end_at: Yup.string().required('End date is required'),
  image: Yup.mixed().nullable().notRequired(),
});

const AddSlider = () => {
  const navigate = useNavigate();

  const initialValues: SliderFormValues = {
    ar: {
      title: '',
      description: '',
    },
    en: {
      title: '',
      description: '',
    },
    ku: {
      title: '',
      description: '',
    },
    discount: 0,
    type: '',
    platform: 'both',
    is_active: true,
    start_at: '',
    end_at: '',
    image: undefined,
  };

  const handleSubmit = async (
    values: SliderFormValues,
    { setSubmitting }: FormikHelpers<SliderFormValues>
  ) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('ar[title]', values.ar.title);
      formData.append('ar[description]', values.ar.description);
      formData.append('en[title]', values.en.title);
      formData.append('en[description]', values.en.description);
      formData.append('ku[title]', values.ku.title);
      formData.append('ku[description]', values.ku.description);
      formData.append('discount', String(values.discount));
      formData.append('type', values.type);
      formData.append('platform', values.platform);
      formData.append('is_active', values.is_active ? '1' : '0');
      formData.append('order', '1');
      formData.append('start_at', values.start_at);
      formData.append('end_at', values.end_at);

      if (values.image) {
        if (typeof values.image === 'object' && !(values.image instanceof File)) {
          const imageData = values.image as Record<string, unknown>;
          formData.append('image[media]', String(imageData.data || imageData));
        } else if (typeof values.image === 'string') {
          formData.append('image[media]', values.image);
        }
      }

      await api.post('/dashboard/admin/sliders', formData);

      SuccessAlert('Slider created successfully');
      navigate('/sliders');
    } catch (error) {
      console.error('Error:', error);
      UnSuccessAlert({ title: `${error}` });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <BreadCrumb path="Sliders" pathAdd="Add Slider" icon={Sliders} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <Card>
              <CardHeader>
                <CardTitle>Add New Slider</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-5">
                {/* Image Upload */}
                <MediaUpload
                  name="image"
                  label=""
                  disabled={isSubmitting}
                  model="sliders"
                  attachmentType="image"
                  uploadEndpoint="/general/attachments"
                />

                {/* Multilingual Titles */}
                <MultilingualFields
                  label="Title"
                  fieldName="title"
                  values={{
                    ar: values.ar.title,
                    en: values.en.title,
                    ku: values.ku.title,
                  }}
                  errors={{
                    ar: errors.ar?.title as string,
                    en: errors.en?.title as string,
                    ku: errors.ku?.title as string,
                  }}
                  touched={{
                    ar: touched.ar?.title,
                    en: touched.en?.title,
                    ku: touched.ku?.title,
                  }}
                  onChange={(lang, value) => setFieldValue(`${lang}.title`, value)}
                />

                {/* Multilingual Descriptions */}
                <MultilingualTextarea
                  label="Description"
                  fieldName="description"
                  values={{
                    ar: values.ar.description,
                    en: values.en.description,
                    ku: values.ku.description,
                  }}
                  errors={{
                    ar: errors.ar?.description as string,
                    en: errors.en?.description as string,
                    ku: errors.ku?.description as string,
                  }}
                  touched={{
                    ar: touched.ar?.description,
                    en: touched.en?.description,
                    ku: touched.ku?.description,
                  }}
                  onChange={(lang, value) => setFieldValue(`${lang}.description`, value)}
                  placeholder="Enter description"
                />

                {/* Discount & Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Discount"
                    id="discount"
                    type="number"
                    value={values.discount}
                    onChange={(value) => setFieldValue('discount', value)}
                    error={errors.discount as string}
                    touched={touched.discount}
                  />
                  <FormField
                    label="Type"
                    id="type"
                    value={values.type}
                    onChange={(value) => setFieldValue('type', value)}
                    error={errors.type}
                    touched={touched.type}
                  />
                </div>

                {/* Platform & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Platform"
                    id="platform"
                    value={values.platform}
                    onChange={(value) => setFieldValue('platform', value)}
                    error={errors.platform}
                    touched={touched.platform}
                  />
                  <div>
                    <label className="text-sm font-medium mb-2 block">Is Active</label>
                    <ActiveSwitcher
                      isChecked={values.is_active}
                      onChange={(checked) => setFieldValue('is_active', checked)}
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Start Date"
                    id="start_at"
                    type="datetime-local"
                    value={values.start_at}
                    onChange={(value) => setFieldValue('start_at', value)}
                    error={errors.start_at}
                    touched={touched.start_at}
                  />
                  <FormField
                    label="End Date"
                    id="end_at"
                    type="datetime-local"
                    value={values.end_at}
                    onChange={(value) => setFieldValue('end_at', value)}
                    error={errors.end_at}
                    touched={touched.end_at}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button className="bg-sidebar-accent" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Slider'}
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => navigate('/sliders')}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSlider;