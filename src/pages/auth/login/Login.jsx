import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/reducers/authSlice';

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required.'),
});

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // @ts-ignore
  const { loginStatus, error, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (loginStatus === 'succeeded' && user) {
      navigate('/dashboard');
    }
  }, [loginStatus, user, navigate]);

  return loginStatus === 'failed' ? (
    <div>{error}</div>
  ) : loginStatus === 'loading' ? (
    <div></div>
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-emerald-600 to-cyan-600">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <Typography
            component="h1"
            variant="h3"
            sx={{ marginBottom: 4 }}
            className="text-black text-center"
          >
            Log in
          </Typography>
        </div>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // @ts-ignore
              dispatch(loginUser(values));
            } catch (err) {
              console.error(err);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            // @ts-ignore
            setFieldValue,
          }) => (
            <Form className="space-y-4 w-full">
              <FormControl fullWidth className="!mb-8">
                <TextField
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </FormControl>

              <FormControl fullWidth className="!mb-8">
                <TextField
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                className="!text-white !text-2xl bg-gradient-to-r from-emerald-600 to-cyan-600"
              >
                Log in
              </Button>
            </Form>
          )}
        </Formik>

        <Divider>
          <Typography className="text-gray-500">or</Typography>
        </Divider>

        <Typography
          className="text-center text-gray-600 dark:text-gray-400"
          sx={{ marginTop: 2 }}
        >
          Don't have an account?{' '}
          <Link to={'/register'} className="text-blue-600 underline">
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
}
