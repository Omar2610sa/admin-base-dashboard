import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch';
import api from '@/APis/Axios';
import { Edit, Sliders } from 'lucide-react';
import { Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Loading from '@/components/Loading';
import { SuccessAlert } from '@/components/Alerts/SuccessAlert';
import { UnSuccessAlert } from '@/components/Alerts/UnSuccessAlert';
import MediaUpload from '@/components/media-upload/MediaUpload';
import ActiveSwitcher from '@/components/ActiveSwitcher';
import { Textarea } from '@/components/ui/textarea';

type SliderResponse = {
  id: number;
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
  image: {
    id: number;
    media: string;
  };
};

type SliderEditFormValues = {
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
const EditSliders = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const sliderId = React.useMemo(() => {
    if (!id) return null;
    const parsed = Number(id);
    return Number.isFinite(parsed) ? parsed : null;
  }, [id]);

  const { data: slider, loading } = useFetch<SliderResponse>(
    sliderId ? `/dashboard/admin/sliders/${sliderId}` : ''
  );

  if (loading) return <Loading />;

  const initialValues: SliderEditFormValues = {
    ar: {
      title: slider?.ar?.title ?? '',
      description: slider?.ar?.description ?? ''
    },
    en: {
      title: slider?.en?.title ?? '',
      description: slider?.en?.description ?? ''
    },
    ku: {
      title: slider?.ku?.title ?? '',
      description: slider?.ku?.description ?? ''
    },
    discount: slider?.discount ?? 0,
    type: slider?.type ?? '',
    platform: slider?.platform ?? 'both',
    is_active: slider?.is_active ?? true,
    start_at: slider?.start_at ?? '',
    end_at: slider?.end_at ?? '',
    image: slider?.image?.media ?? '',
  };



  const handleSubmit = async (
    values: SliderEditFormValues,
    { setSubmitting }: FormikHelpers<SliderEditFormValues>
  ) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('ar[title]', values.ar.title);
      formData.append('en[title]', values.en.title);
      formData.append('ku[title]', values.ku.title);
      formData.append('ar[description]', values.ar.description);
      formData.append('en[description]', values.en.description);
      formData.append('ku[description]', values.ku.description);
      formData.append('discount', String(values.discount));
      formData.append('type', values.type);
      formData.append('platform', values.platform);
      formData.append('is_active', values.is_active ? '1' : '0');
      formData.append('order', "1");
      formData.append('start_at', values.start_at);
      formData.append('end_at', values.end_at);
      formData.append('_method', id ? "put" : "post");

      if (values.image) {
        if (typeof values.image === 'object' && !(values.image instanceof File)) {
          const imageData = values.image as Record<string, unknown>;
          formData.append('image[media]', String(imageData.data || imageData));
        }
        else if (typeof values.image === 'string') {
          formData.append('image[media]', values.image);
        }
      }

      await api.post(`/dashboard/admin/sliders/${sliderId}`, formData);

      SuccessAlert('Slider updated successfully');
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
      <BreadCrumb path="Sliders" pathEdit="Edit Slider" icon={Sliders} iconEdit={Edit} />

      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form>
              <Card>
                <CardHeader>
                  <CardTitle>Edit Slider</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                  <Field>
                    <FieldContent>
                      <MediaUpload
                        name="image"
                        label=""
                        disabled={isSubmitting}
                        model='sliders'
                        attachmentType='image'
                        uploadEndpoint='/general/attachments'

                      />
                      {touched.image ? (
                        <FieldError
                          errors={
                            touched.image && errors.image
                              ? [{ message: String(errors.image) }]
                              : []
                          }
                        />
                      ) : null}
                    </FieldContent>
                  </Field>

                  {/* Titles */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Ttile Ar */}
                    <Field>
                      <FieldLabel htmlFor="title_ar">Title (Ar)</FieldLabel>
                      <FieldContent>
                        <Input
                          id="title_ar"
                          name="title_ar"
                          value={values.ar.title}
                          onChange={(e) => setFieldValue('ar.title', e.target.value)}
                        />
                        <FieldError errors={touched.ar?.title ? [{ message: errors.ar?.title }] : []} />
                      </FieldContent>
                    </Field>
                    {/* Title En */}
                    <Field>
                      <FieldLabel htmlFor="title_en">Title (En)</FieldLabel>
                      <FieldContent>
                        <Input
                          id="title_en"
                          name="title_en"
                          value={values.en.title}
                          onChange={(e) => setFieldValue('en.title', e.target.value)}
                        />
                        <FieldError errors={touched.en?.title ? [{ message: errors.en?.title }] : []} />
                      </FieldContent>
                    </Field>
                    {/* Title Ku */}
                    <Field>
                      <FieldLabel htmlFor="title_ku">Title (Ku)</FieldLabel>
                      <FieldContent>
                        <Input
                          id="title_ku"
                          name="title_ku"
                          value={values.ku.title}
                          onChange={(e) => setFieldValue('ku.title', e.target.value)}
                        />
                        <FieldError errors={touched.ku?.title ? [{ message: errors.ku?.title }] : []} />
                      </FieldContent>
                    </Field>

                  </div>

                  {/* Description */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Description Ar */}
                    <Field>
                      <FieldLabel htmlFor="description_ar">Description (Ar)</FieldLabel>
                      <FieldContent>
                        <Textarea
                          id="description_ar"
                          name="description_ar"
                          value={values.ar.description}
                          onChange={(e) => setFieldValue('ar.description', e.target.value)}
                        />
                        <FieldError
                          errors={touched.ar?.description ? [{ message: errors.ar?.description }] : []}
                        />
                      </FieldContent>
                    </Field>

                    {/* Description En */}
                    <Field>
                      <FieldLabel htmlFor="description_en">Description (En)</FieldLabel>
                      <FieldContent>
                        <Textarea
                          id="description_en"
                          name="description_en"
                          value={values.en.description}
                          onChange={(e) => setFieldValue('en.description', e.target.value)}
                        />
                        <FieldError
                          errors={touched.en?.description ? [{ message: errors.en?.description }] : []}
                        />
                      </FieldContent>
                    </Field>
                    {/* Description Ku */}
                    <Field>
                      <FieldLabel htmlFor="description_ku">Description (Ku)</FieldLabel>
                      <FieldContent>
                        <Textarea

                          id="description_ku"
                          name="description_ku"
                          value={values.ku.description}
                          onChange={(e) => setFieldValue('ku.description', e.target.value)}
                        />
                        <FieldError
                          errors={touched.ku?.description ? [{ message: errors.ku?.description }] : []}
                        />
                      </FieldContent>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field>
                      <FieldLabel htmlFor="discount">Discount</FieldLabel>
                      <FieldContent>
                        <Input
                          id="discount"
                          name="discount"
                          type="number"
                          value={values.discount}
                          onChange={(e) => {
                            const raw = e.target.value;
                            setFieldValue('discount', raw === '' ? 0 : Number(raw));
                          }}
                        />
                        <FieldError
                          errors={touched.discount ? [{ message: errors.discount as string }] : []}
                        />
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="type">Type</FieldLabel>
                      <FieldContent>
                        <Input
                          id="type"
                          name="type"
                          value={values.type}
                          onChange={(e) => setFieldValue('type', e.target.value)}
                        />
                        <FieldError errors={touched.type ? [{ message: errors.type }] : []} />
                      </FieldContent>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field>
                      <FieldLabel htmlFor="platform">Platform</FieldLabel>
                      <FieldContent>
                        <Input
                          id="platform"
                          name="platform"
                          value={values.platform}
                          onChange={(e) => setFieldValue('platform', e.target.value)}
                        />
                        <FieldError
                          errors={touched.platform ? [{ message: errors.platform }] : []}
                        />
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="is_active">Is Active</FieldLabel>
                      <FieldContent>
                        <ActiveSwitcher isChecked={values.is_active} onChange={(checked) => setFieldValue('is_active', checked)} />
                      </FieldContent>
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field>
                      <FieldLabel htmlFor="start_at">Start</FieldLabel>
                      <FieldContent>
                        <Input
                          id="start_at"
                          name="start_at"
                          type="datetime-local"
                          value={values.start_at}
                          onChange={(e) => setFieldValue('start_at', e.target.value)}
                        />
                        <FieldError
                          errors={touched.start_at ? [{ message: errors.start_at }] : []}
                        />
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="end_at">End</FieldLabel>
                      <FieldContent>
                        <Input
                          id="end_at"
                          name="end_at"
                          type="datetime-local"
                          value={values.end_at}
                          onChange={(e) => setFieldValue('end_at', e.target.value)}
                        />
                        <FieldError
                          errors={touched.end_at ? [{ message: errors.end_at }] : []}
                        />
                      </FieldContent>
                    </Field>
                  </div>
                </CardContent>

                <CardFooter className='flex justify-between'>
                  <Button className="bg-sidebar-accent" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant='destructive'
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => navigate("/sliders")}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditSliders;