import Header from '../layout/Header';
import Button from '../components/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useToggle from '../hooks/useToggle';

const NewPage: React.FC = () => {
  const [isTextVisible, toggleText] = useToggle();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email format').required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <div className='container mx-auto mt-12 rounded bg-white p-6 shadow-md'>
        <h1 className='mb-4 text-3xl font-semibold text-indigo-600'>Welcome to the New Page</h1>

        <Button onClick={toggleText}>{isTextVisible ? 'Hide Text' : 'Show Text'}</Button>

        {isTextVisible && (
          <p className='mt-6 text-lg text-gray-700'>Surprise! Here's the hidden text you've revealed.</p>
        )}

        <p className='my-6 text-lg text-gray-700'>Lorem ipsum dolor sit</p>

        <div className='my-6 border-t border-gray-200'></div>

        <h2 className='mb-4 text-2xl font-semibold text-green-500'>Discover More</h2>
        <form onSubmit={formik.handleSubmit} className='m-auto mt-6 flex w-max flex-col justify-center space-y-4'>
          <div className='flex w-72 flex-col'>
            <label htmlFor='email' className='mb-2 font-semibold text-gray-700'>
              Email Address
            </label>
            <input
              className='rounded border px-3 py-2 focus:border-indigo-500'
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='mt-1 text-red-500'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='flex w-72 flex-col'>
            <label htmlFor='password' className='mb-2 font-semibold text-gray-700'>
              Password
            </label>
            <input
              className='rounded border px-3 py-2 focus:border-indigo-500'
              id='password'
              name='password'
              type='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='mt-1 text-red-500'>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className='mt-4'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPage;
