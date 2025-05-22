import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', form);

      console.log('Login successful:', res.data);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      localStorage.setItem('accessToken', res.data.data.accessToken);
      localStorage.setItem('refreshToken', res.data.data.refreshToken);

      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Login unsuccessful';
      setLoginError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      {loginError && (
        <div className="mb-4 text-red-600 text-center">{loginError}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/changepassword')}
          className="text-sm text-blue-600 hover:underline"
        >
          Change Password
        </button>
        <button
          onClick={() => navigate('/updatedetails')}
          className="text-sm text-blue-600 hover:underline"
        >
          Update Details
        </button>
      </div>
    </div>
  );
};

export default Login;
