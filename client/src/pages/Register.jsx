import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { register, reset } from '../features/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      toast.success('User Registered Successfully');
      navigate('/features');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dmdlgpurh/image/upload/v1736879584/pexels-souvenirpixels-1542493_dke22u.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ToastContainer />
      <section className="mx-auto border border-gray-300 backdrop-blur-sm shadow-md md:w-96 px-4 py-4 text-center rounded-3xl">
        <form onSubmit={onSubmit} className="md:w-full w-64">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="text"
              className="py-2.5 px-3 border-2 w-64 focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl md:w-80 caret-yellow-500 text-rose-500 mb-8"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              className="py-2.5 px-3 border-2 w-64 focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl md:w-80 caret-yellow-500 text-rose-500 mb-8"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className="py-2.5 px-3 border-2 w-64 focus:outline-none focus:ring-1 backdrop-blur-sm bg-neutral-900 focus:ring-gray-500 rounded-xl md:w-80 caret-yellow-500 text-rose-500 mb-8"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-sky-400 hover:bg-sky-500 md:w-40 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign Up
            </button>
          </div>
          <div>
            <p className="font-medium text-1xl mt-3">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-sky-600 hover:text-sky-700 font-extrabold"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
