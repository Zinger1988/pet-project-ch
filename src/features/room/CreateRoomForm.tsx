import { Field, Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import colors from 'tailwindcss/colors';

import { Spinner } from '../../components';
import FormControl from '../form/FormControl';
import Button from '../../components/Button';

import { IconId } from '../../types/enums';
import { CreateRoomValues } from '../../types/global';
import { ChangeEvent, useState } from 'react';
import RoomCapacityToggle from './RoomCapacityToggle';

interface CreateRoomFormProps {
  loading: boolean;
  onSubmit: (values: CreateRoomValues) => void;
  className?: string;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ loading, onSubmit, className = '' }) => {
  const { t } = useTranslation();
  const [showRoomCapacity, setShowRoomCapacity] = useState(false);

  const initialValues: CreateRoomValues = {
    name: '',
    description: '',
    isPrivate: false,
    newMemberRole: 'speaker',
    maxRoomCapacity: null,
  };

  // prettier-ignore
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('required', { ns: 'validations' }))
      .min(3, t('validations:minLength', { count: 3 })),
    description: Yup.string()
      .required(t('required', { ns: 'validations' }))
      .min(10, t('validations:minLength', { count: 10 })),
    maxRoomCapacity: Yup.number()
      .nullable()
      .integer()
      .positive()
      .test('check-capacity', 'The minimum number of room members must be at least 2', (value) => {
        if (!showRoomCapacity) return true;

        if (value) {
          return value >= 2;
        }

        return false;
      }),
  });

  const handleShowRoomCapacity = (event: ChangeEvent<HTMLInputElement>) => {
    setShowRoomCapacity(event.target.checked);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={className}>
        <Field
          component={FormControl}
          type='text'
          name='name'
          label={t('create.Room name', { ns: 'room' })}
          placeholder={t('create.People will be able to find your room by its name', {
            ns: 'room',
          })}
          id='name'
          className='mb-3'
        />
        <Field
          component={FormControl}
          type='textarea'
          name='description'
          label={t('create.Room description', { ns: 'room' })}
          placeholder={t('create.Tell people something about this room', { ns: 'room' })}
          id='description'
          className='mb-6'
        />
        <Field
          component={FormControl}
          type='select'
          name='newMemberRole'
          label={'Default role for new members'}
          id='newMemberRole'
          className='mb-6'
          options={[
            { value: 'speaker', label: 'Speaker' },
            { value: 'audience', label: 'Audience' },
          ]}
        />
        <RoomCapacityToggle showCapacity={showRoomCapacity} onChange={handleShowRoomCapacity} />
        <Field
          component={FormControl}
          type='checkbox'
          name='isPrivate'
          label={t('create.Create private room', { ns: 'room' })}
          id='isPrivate'
          className='mb-9'
        />
        <div className='flex justify-center'>
          <Button
            type='submit'
            className='sm:w-auto'
            icon={loading ? undefined : IconId.ArrowRight}
            iconPosition='right'
            disabled={loading}
          >
            {loading ? <Spinner fill={colors.gray[100]} /> : t('continue')}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateRoomForm;
