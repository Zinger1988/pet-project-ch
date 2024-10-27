import { ChangeEvent, useEffect } from 'react';
import { Checkbox, FormControl } from '../form';
import { Field, useFormikContext } from 'formik';

interface RoomCapacityToggleProps {
  showCapacity: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RoomCapacityToggle: React.FC<RoomCapacityToggleProps> = ({ showCapacity, onChange }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue('maxRoomCapacity', showCapacity ? 2 : null);
  }, [showCapacity, setFieldValue]);

  return (
    <>
      <Checkbox className='mb-6' label='Limit the number of room members' onChange={onChange} />
      {showCapacity && (
        <Field
          component={FormControl}
          type='number'
          name='maxRoomCapacity'
          label='Specify the maximum number of room members'
          id='maxRoomCapacity'
          className='mb-6'
          min='2'
        />
      )}
    </>
  );
};

export default RoomCapacityToggle;
