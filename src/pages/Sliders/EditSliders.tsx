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
import { time } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

type SliderResponse = {
  id: number;
  title: string;
  description: string;
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
  title_ar: string;
  title_en: string;
  title_ku: string;
  description_ar: string;
  description_en: string;
  description_ku: string;
  discount: number;
  type: string;
  platform: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  image?: string | Record<string, unknown>;
};

const validationSchema = Yup.object({
  title_ar: Yup.string().required('Title (Ar) is required'),
  title_en: Yup.string().required('Title (En) is required'),
  title_ku: Yup.string().required('Title (Ku) is required'),
  description_ar: Yup.string().required('Description (Ar) is required'),
  description_en: Yup.string().required('Description (En) is required'),
  description_ku: Yup.string().required('Description (Ku) is required'),
  discount: Yup.number().typeError('Discount must be a number').min(0).required('Discount is required'),
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
    title_ar: slider?.title ?? '',
    title_en: slider?.title ?? '',
    title_ku: slider?.title ?? '',
    description_ar: slider?.description ?? '',
    description_en: slider?.description ?? '',
    description_ku: slider?.description ?? '',
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
      formData.append('ar[title]', values.title_ar);
      formData.append('en[title]', values.title_en);
      formData.append('ku[title]', values.title_ku);
      formData.append('ar[description]', values.description_ar);
      formData.append('en[description]', values.description_en);
      formData.append('ku[description]', values.description_ku);
      formData.append('discount', String(values.discount));
      formData.append('type', values.type);
      formData.append('platform', values.platform);
      formData.append('is_active', values.is_active ? '1' : '0');
      formData.append('order', "1");
      formData.append('start_at', values.start_at);
      formData.append('end_at', values.end_at);
      formData.append('_method', id ? "put" : "post");

      // ✅ بعت الـ image response object بدل الـ filename
      if (values.image) {
        // لو كان object (الـ response من الـ upload)
        if (typeof values.image === 'object' && !(values.image instanceof File)) {
          const imageData = values.image as Record<string, unknown>;
          formData.append('image', String(imageData.data || imageData));
        }
        else if (typeof values.image === 'string') {
          formData.append('image', values.image);
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
                          value={values.title_ar}
                          onChange={(e) => setFieldValue('title_ar', e.target.value)}
                        />
                        <FieldError errors={touched.title_ar ? [{ message: errors.title_ar }] : []} />
                      </FieldContent>
                    </Field>
                    {/* Title En */}
                    <Field>
                      <FieldLabel htmlFor="title_en">Title (En)</FieldLabel>
                      <FieldContent>
                        <Input
                          id="title_en"
                          name="title_en"
                          value={values.title_en}
                          onChange={(e) => setFieldValue('title_en', e.target.value)}
                        />
                        <FieldError errors={touched.title_en ? [{ message: errors.title_en }] : []} />
                      </FieldContent>
                    </Field>
                    {/* Title Ku */}
                    <Field>
                      <FieldLabel htmlFor="title_ku">Title (Ku)</FieldLabel>
                      <FieldContent>
                        <Input
                          id="title_ku"
                          name="title_ku"
                          value={values.title_ku}
                          onChange={(e) => setFieldValue('title_ku', e.target.value)}
                        />
                        <FieldError errors={touched.title_ku ? [{ message: errors.title_ku }] : []} />
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
                          value={values.description_ar}
                          onChange={(e) => setFieldValue('description_ar', e.target.value)}
                        />
                        <FieldError
                          errors={touched.description_ar ? [{ message: errors.description_ar }] : []}
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
                          value={values.description_en}
                          onChange={(e) => setFieldValue('description_en', e.target.value)}
                        />
                        <FieldError
                          errors={touched.description_en ? [{ message: errors.description_en }] : []}
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
                          value={values.description_ku}
                          onChange={(e) => setFieldValue('description_ku', e.target.value)}
                        />
                        <FieldError
                          errors={touched.description_ku ? [{ message: errors.description_ku }] : []}
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

                <CardFooter>
                  <Button className="bg-sidebar-accent" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
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