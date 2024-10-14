import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

import { Container, Button } from '../components';
import { FormControl } from '../features/form';
import { StatusBanner, StatusCurrent, StatusHistory } from '../features/systemStatus';

import { StatusBannerItem, SystemIncidentItem, SystemStatusItem } from '../types/global';

type SystemStatusData = {
  overall: StatusBannerItem;
  systemComponents: SystemStatusItem[];
  incidentHistory: SystemIncidentItem[];
};

const data: SystemStatusData = {
  overall: {
    status: 'operational',
    statusText: 'All systems works fine',
  },
  systemComponents: [
    {
      label: 'Component 1',
      description: 'Component desctiption 1',
      status: 'operational',
      statusText: 'Operational',
    },
    {
      label: 'Component 2',
      description: 'Component desctiption 2',
      status: 'operational',
      statusText: 'Operational',
    },
    {
      label: 'Component 3',
      description: 'Component desctiption 3',
      status: 'issue',
      statusText: 'Performance issue',
    },
  ],
  incidentHistory: [
    {
      date: '2024-09-06T17:37:16.089Z',
      label: 'some incident',
      description: 'incident description 1',
      status: 'resolved',
    },
    {
      date: '2024-09-02T11:49:16.089Z',
      label: 'Some incident',
      description: 'incident description 2',
      status: 'resolved',
    },
    {
      date: '2024-08-30T22:32:32.089Z',
      label: 'Some incident',
      description: 'incident description 3',
      status: 'resolved',
    },
    {
      date: '2024-08-24T09:01:12.089Z',
      label: 'Some incident',
      description: 'incident description 4',
      status: 'resolved',
    },
    {
      date: '2024-08-20T12:10:47.089Z',
      label: 'Some incident',
      description: 'incident description 5',
      status: 'investigating',
    },
  ],
};

const SystemStatusPage = () => {
  const { t } = useTranslation();

  const initialValues = {
    email: '',
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(t("required", { ns: "validations" }))
      .email(t("email", { ns: "validations" })),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form data', values);
  };

  return (
    <section className='my-16'>
      <Container className='max-w-screen-lg'>
        <StatusBanner className='mb-8 sm:mb-12' status={data.overall.status} statusText={data.overall.statusText} />

        <h3 className='mb-6'>{t('Current status', { ns: 'pageSystemStatus' })}</h3>
        <StatusCurrent className='mb-12' items={data.systemComponents} />

        <h3 className='mb-6'>{t('Past Incidents', { ns: 'pageSystemStatus' })}</h3>
        <StatusHistory logs={data.incidentHistory} />

        <h3 className='mb-6'>{t('Subscribe for updates', { ns: 'pageSystemStatus' })}</h3>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <div className='bg-gray-10 rounded-lg p-8 dark:bg-gray-800'>
            <Form className='mx-auto sm:flex sm:items-start sm:gap-4'>
              <Field
                component={FormControl}
                type='email'
                name='email'
                placeholder={t('Your email (required)', { ns: 'pageSystemStatus' })}
                id='email'
                className='mb-3 sm:mb-0 sm:flex-grow'
              />
              <Button type='submit' className='h-[48px] w-full rounded-2xl sm:w-auto'>
                {t('buttons.subscribe')}
              </Button>
            </Form>
          </div>
        </Formik>
      </Container>
    </section>
  );
};

export default SystemStatusPage;
