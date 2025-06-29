import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    avatarImage: null,
    coverImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('fullname', form.fullname);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('avatarImage', form.avatarImage);
    formData.append('coverImage', form.coverImage);

    try {
      const res = await axios.post('/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(res.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Register
        </h2>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          required
        />

        <input
          type="text"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          required
        />

        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Avatar Image</label>
        <input
          type="file"
          name="avatarImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-3 p-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          required
        />

        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Cover Image</label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4 p-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
