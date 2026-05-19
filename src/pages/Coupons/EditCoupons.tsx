import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useFetch from '@/hooks/useFetch';
import api from '@/APis/Axios';
import { Edit, Ticket } from 'lucide-react';
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
import MultilingualFields from '@/components/InputsFields/Multilingualfields';
import FormField from '@/components/InputsFields/Formfield';

type CouponResponse = {
  id: number;
  ar: { name: string; slug: string };
  en: { name: string; slug: string };
  ku: { name: string; slug: string };
  image: {
    id: number;
    media: string;
    alt: string | null;
  };
  code: string;
  type: string;
  reward: string;
  price: number;
  is_active: boolean;
  start_at: string;
  end_at: string;
  discount: number;
  discount_type: string;
  limit: number;
  limit_for_user: number;
  min_order_total: number;
  max_order_total: number;
  used_count: number;
};

type CouponEditFormValues = {
  ar: { name: string; slug: string };
  en: { name: string; slug: string };
  ku: { name: string; slug: string };
  code: string;
  type: string;
  reward: string;
  price: number;
  discount: number;
  discount_type: string;
  limit: number;
  limit_for_user: number;
  min_order_total: number;
  max_order_total: number;
  is_active: boolean;
  start_at: string;
  end_at: string;
  image?: string | Record<string, unknown>;
};

const validationSchema = Yup.object({
  ar: Yup.object({
    name: Yup.string().required('Name in Arabic is required'),
    slug: Yup.string().required('Slug in Arabic is required'),
  }),
  en: Yup.object({
    name: Yup.string().required('Name in English is required'),
    slug: Yup.string().required('Slug in English is required'),
  }),
  ku: Yup.object({
    name: Yup.string().required('Name in Kurdish is required'),
    slug: Yup.string().required('Slug in Kurdish is required'),
  }),
  code: Yup.string().notRequired(),
  type: Yup.string().required('Type is required'),
  reward: Yup.string().required('Reward is required'),
  price: Yup.number().notRequired(),
  discount: Yup.number().min(0)
    .typeError('Discount must be a number')
    .min(0)
    .required('Discount is required'),
  discount_type: Yup.string().required('Discount type is required'),
  limit: Yup.number()
    .typeError('Limit must be a number')
    .min(0)
    .required('Limit is required'),
  limit_for_user: Yup.number()
    .typeError('Limit for user must be a number')
    .min(0)
    .required('Limit for user is required'),
  min_order_total: Yup.number()
    .typeError('Min order total must be a number')
    .min(0)
    .required('Min order total is required'),
  max_order_total: Yup.number()
    .typeError('Max order total must be a number')
    .min(0)
    .required('Max order total is required'),
  is_active: Yup.boolean().required('Status is required'),
  start_at: Yup.string().required('Start date is required'),
  end_at: Yup.string().required('End date is required'),
  image: Yup.mixed().nullable().notRequired(),
});

const EditCoupons = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const couponId = React.useMemo(() => {
    if (!id) return null;
    const parsed = Number(id);
    return Number.isFinite(parsed) ? parsed : null;
  }, [id]);

  const { data: coupon, loading } = useFetch<CouponResponse>(
    couponId ? `/dashboard/admin/coupons/${couponId}` : ''
  );

  const { data: couponsList } = useFetch<Array<{ id: number; code: string }>>(
    '/dashboard/admin/coupons?limit=1000'
  );

  if (loading) return <Loading />;

  const initialValues: CouponEditFormValues = {
    ar: {
      name: coupon?.ar.name ?? '',
      slug: coupon?.ar.slug ?? '',
    },
    en: {
      name: coupon?.en.name ?? '',
      slug: coupon?.en.slug ?? '',
    },
    ku: {
      name: coupon?.ku.name ?? '',
      slug: coupon?.ku.slug ?? '',
    },
    code: coupon?.code ?? '',
    type: coupon?.type ?? '',
    reward: coupon?.reward ?? '',
    price: coupon?.price ?? 0,
    discount: coupon?.discount ?? 0,
    discount_type: coupon?.discount_type ?? 'percentage',
    limit: coupon?.limit ?? 0,
    limit_for_user: coupon?.limit_for_user ?? 0,
    min_order_total: coupon?.min_order_total ?? 0,
    max_order_total: coupon?.max_order_total ?? 0,
    is_active: coupon?.is_active ?? true,
    start_at: coupon?.start_at ?? '',
    end_at: coupon?.end_at ?? '',
    image: coupon?.image?.media ?? '',
  };

  const handleSubmit = async (
    values: CouponEditFormValues,
    { setSubmitting }: FormikHelpers<CouponEditFormValues>
  ) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('ar[name]', values.ar.name);
      formData.append('ar[slug]', values.ar.slug);
      formData.append('en[name]', values.en.name);
      formData.append('en[slug]', values.en.slug);
      formData.append('ku[name]', values.ku.name);
      formData.append('ku[slug]', values.ku.slug);
      formData.append('code', values.code);
      formData.append('type', values.type);
      formData.append('reward', values.reward);
      formData.append('price', String(values.price));
      formData.append('discount', String(values.discount));
      formData.append('discount_type', values.discount_type);
      formData.append('limit', String(values.limit));
      formData.append('limit_for_user', String(values.limit_for_user));
      formData.append('min_order_total', String(values.min_order_total));
      formData.append('max_order_total', String(values.max_order_total));
      formData.append('is_active', values.is_active ? '1' : '0');
      formData.append('start_at', values.start_at);
      formData.append('end_at', values.end_at);
      formData.append('_method', couponId ? 'put' : 'post');

      if (values.image) {
        if (typeof values.image === 'object' && !(values.image instanceof File)) {
          const imageData = values.image as Record<string, unknown>;
          formData.append('image[media]', String(imageData.data || imageData));
        } else if (typeof values.image === 'string') {
          formData.append('image[media]', values.image);
        }
      }

      await api.post(`/dashboard/admin/coupons/${couponId}`, formData);
      SuccessAlert('Coupon updated successfully');
      navigate('/coupons');
    } catch (error) {
      console.error('Error:', error);
      UnSuccessAlert({ title: `${error}` });
    } finally {
      setSubmitting(false);
    }
  };

  const couponCodeOptions = (couponsList || []).map((item) => ({
    id: item.id,
    label: item.code,
    value: item.code,
  }));

  return (
    <div className="flex flex-col gap-5">
      <BreadCrumb path="Coupons" pathEdit="Edit Coupon" icon={Ticket} iconEdit={Edit} />

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
                <CardTitle>Edit Coupon</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-5">
                {/* Image Upload */}
                <MediaUpload
                  name="image"
                  label=""
                  disabled={isSubmitting}
                  model="coupons"
                  attachmentType="image"
                  uploadEndpoint="/general/attachments"
                />

                {/* Multilingual Names */}
                <MultilingualFields
                  label="Name"
                  fieldName="name"
                  values={{
                    ar: values.ar.name,
                    en: values.en.name,
                    ku: values.ku.name,
                  }}
                  errors={{
                    ar: errors.ar?.name as string,
                    en: errors.en?.name as string,
                    ku: errors.ku?.name as string,
                  }}
                  touched={{
                    ar: touched.ar?.name,
                    en: touched.en?.name,
                    ku: touched.ku?.name,
                  }}
                  onChange={(lang, value) => setFieldValue(`${lang}.name`, value)}
                />

                {/* Multilingual Slugs */}
                <MultilingualFields
                  label="Slug"
                  fieldName="slug"
                  values={{
                    ar: values.ar.slug,
                    en: values.en.slug,
                    ku: values.ku.slug,
                  }}
                  errors={{
                    ar: errors.ar?.slug as string,
                    en: errors.en?.slug as string,
                    ku: errors.ku?.slug as string,
                  }}
                  touched={{
                    ar: touched.ar?.slug,
                    en: touched.en?.slug,
                    ku: touched.ku?.slug,
                  }}
                  onChange={(lang, value) => setFieldValue(`${lang}.slug`, value)}
                />

                {/* Type & Reward */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Type"
                    id="type"
                    value={values.type}
                    onChange={(value) => setFieldValue('type', value)}
                    error={errors.type}
                    touched={touched.type}
                  />
                  <FormField
                    label="Reward"
                    id="reward"
                    value={values.reward}
                    onChange={(value) => setFieldValue('reward', value)}
                    error={errors.reward}
                    touched={touched.reward}
                  />
                </div>

                {/* Price & Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Price"
                    id="price"
                    type="number"
                    value={values.price}
                    onChange={(value) => setFieldValue('price', value)}
                    error={errors.price}
                    touched={touched.price}
                  />
                  <FormField
                    label='Code'
                    id='code'
                    value={values.code}
                    onChange={(value) => setFieldValue("code", value)}
                    error={errors.code}
                    touched={touched.code}
                  />
                </div>

                {/* Discount & Discount Type */}
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
                    label="Discount Type"
                    id="discount_type"
                    value={values.discount_type}
                    onChange={(value) => setFieldValue('discount_type', value)}
                    error={errors.discount_type}
                    touched={touched.discount_type}
                  />
                </div>

                {/* Limit & Limit for User */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Limit"
                    id="limit"
                    type="number"
                    value={values.limit}
                    onChange={(value) => setFieldValue('limit', value)}
                    error={errors.limit as string}
                    touched={touched.limit}
                  />
                  <FormField
                    label="Limit for User"
                    id="limit_for_user"
                    type="number"
                    value={values.limit_for_user}
                    onChange={(value) => setFieldValue('limit_for_user', value)}
                    error={errors.limit_for_user as string}
                    touched={touched.limit_for_user}
                  />
                </div>

                {/* Min & Max Order Total */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="Min Order Total"
                    id="min_order_total"
                    type="number"
                    value={values.min_order_total}
                    onChange={(value) => setFieldValue('min_order_total', value)}
                    error={errors.min_order_total as string}
                    touched={touched.min_order_total}
                  />
                  <FormField
                    label="Max Order Total"
                    id="max_order_total"
                    type="number"
                    value={values.max_order_total}
                    onChange={(value) => setFieldValue('max_order_total', value)}
                    error={errors.max_order_total as string}
                    touched={touched.max_order_total}
                  />
                </div>

                {/* Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    type="date"
                    value={values.start_at}
                    onChange={(value) => setFieldValue('start_at', value)}
                    error={errors.start_at}
                    touched={touched.start_at}
                  />
                  <FormField
                    label="End Date"
                    id="end_at"
                    type="date"
                    value={values.end_at}
                    onChange={(value) => setFieldValue('end_at', value)}
                    error={errors.end_at}
                    touched={touched.end_at}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button className="bg-sidebar-accent" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => navigate('/coupons')}
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

export default EditCoupons;