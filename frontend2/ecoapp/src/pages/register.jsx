import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('avatar', form.avatar);

      const res = await api.post('/users/register', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});


      console.log('Registered:', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={form.username}
          onChange={handleChange}
          required
        />
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
        <input
          type="file"
          name="avatar"
          className="w-full p-2 border rounded"
          accept="image/*"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
