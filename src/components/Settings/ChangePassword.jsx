import React, { useState } from 'react';
import axios from '../../api/axios';

const ChangePassword = () => {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldpassword || !newpassword) {
      setMessage('Both fields are required.');
      return;
    }

    try {
      const storedUser = localStorage.getItem('videotube-user');
      if (!storedUser) {
        setMessage('User not logged in.');
        return;
      }

      const token = JSON.parse(storedUser)?.token;

      if (!token) {
        setMessage('Authentication token missing. Please log in again.');
        return;
      }

      const res = await axios.patch(
        '/users/changePassword',
        { oldpassword, newpassword }, // ✅ must match backend controller
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setMessage(res.data?.message || 'Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Password change error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Old Password"
          value={oldpassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Change Password
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ChangePassword;
