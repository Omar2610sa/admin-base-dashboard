import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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


type SliderResponse = {
  id: number;
  title: string;
  description: string;
  discount: number;
  type: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  image: {
    id: number;
    media: string;
  };
};

type SliderEditFormValues = {
  title: string;
  description: string;
  discount: number;
  type: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  iamge?: string;
};


const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  discount: Yup.number().typeError('Discount must be a number').min(0).required('Discount is required'),
  type: Yup.string().required('Type is required'),
  is_active: Yup.boolean().required(),
  start_at: Yup.string().required('Start date is required'),
  end_at: Yup.string().required('End date is required'),
  iamge: Yup.mixed<File>().notRequired(),
});


const EditSliders = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const sliderId = React.useMemo(() => {

    if (!id) return null;
    const parsed = Number(id);
    return Number.isFinite(parsed) ? parsed : null;
  }, [id]);

  const {
    data: slider,
    loading,
  } = useFetch<SliderResponse>(sliderId ? `/dashboard/admin/sliders/${sliderId}` : '');

  const [previewUrl, setPreviewUrl] = React.useState<string>('');





  // previewUrl starts empty; when data loads we use currentPreviewUrl for the <img>.




  if (loading) {
    return (
      <Loading />
    );
  }



  const initialValues: SliderEditFormValues = {
    title: slider?.title ?? '',
    description: slider?.description ?? '',
    discount: slider?.discount ?? 0,

    type: slider?.type ?? '',
    is_active: slider?.is_active ?? true,
    start_at: slider?.start_at ?? '',
    end_at: slider?.end_at ?? '',
    iamge: slider?.image.media,
  };


  const handleSubmit = async (
    values: SliderEditFormValues,
    { setSubmitting }: FormikHelpers<SliderEditFormValues>
  ) => {

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('discount', String(values.discount));
      formData.append('type', values.type);
      formData.append('is_active', String(values.is_active));
      formData.append('start_at', values.start_at);
      formData.append('end_at', values.end_at);

      if (values.iamge) {
        formData.append('image', values.iamge);
      }


      await api.put(`/dashboard/admin/sliders/${sliderId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      SuccessAlert('Slider updated successfully');
      navigate('/sliders');
    } catch (e) {
      UnSuccessAlert();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <BreadCrumb path="Sliders" pathEdit="Edit Slider" icon={Sliders} iconEdit={Edit} />


      <div >
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

                  <Field className=''>
                    <FieldLabel className='fles justify-center'>Image</FieldLabel>
                    <FieldContent>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-center gap-4">
                          <img
                            src={initialValues.iamge}
                            alt="slider"
                            className="size-24 rounded-full bg-slate-100 object-contain"
                          />
                        </div>


                      </div>

                      {/* Title */}

                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <FieldContent>
                      <Input
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={(e) => setFieldValue('title', e.target.value)}
                      />
                      <FieldError errors={touched.title ? [{ message: errors.title }] : []} />
                    </FieldContent>
                  </Field>

                  {/* Description */}
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <FieldContent>
                      <Input
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={(e) => setFieldValue('description', e.target.value)}
                      />
                      <FieldError
                        errors={touched.description ? [{ message: errors.description }] : []}
                      />
                    </FieldContent>
                  </Field>

                  {/* Discound */}
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
                      <FieldLabel>Is Active</FieldLabel>
                      <FieldContent>
                        <div className="flex items-center gap-4">
                          <Switch
                            checked={values.is_active}
                            onCheckedChange={(v: boolean) => setFieldValue('is_active', v)}
                          />
                        </div>
                      </FieldContent>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field>
                        <FieldLabel htmlFor="start_at">Start At</FieldLabel>
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
                        <FieldLabel htmlFor="end_at">End At</FieldLabel>
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
                  </div>

                </CardContent>

                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
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


