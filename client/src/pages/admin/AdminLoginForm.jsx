import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/custom-colors.css';

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await axios.post('http://localhost:5000/api/login', values);
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard');
        } else {
          setFieldError('username', 'Invalid username or password');
        }
      } catch (err) {
        setFieldError('username', 'Login failed. Try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Admin Login</h1>
          <p className="col-lg-10 fs-4">
            Only authorized users can access this section. Please log in with your admin credentials.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                id="adminUsername"
                placeholder="admin1"
                {...formik.getFieldProps('username')}
              />
              <label htmlFor="adminUsername">Admin Username</label>
              {formik.touched.username && formik.errors.username && (
                <div className="invalid-feedback">{formik.errors.username}</div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                id="adminPassword"
                placeholder="Password"
                {...formik.getFieldProps('password')}
              />
              <label htmlFor="adminPassword">Password</label>
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>
            <button 
              className="w-100 btn btn-lg btn-sunrise-coral"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Logging in...' : 'Admin Login'}
            </button>
            <hr className="my-4" />
            <small className="text-body-secondary">
              Go back to <Link to="/dashboard">User Login</Link>.
            </small> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
