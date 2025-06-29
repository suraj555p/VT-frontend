import React, { useState } from 'react';
import axios from '../../api/axios.js';

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return setMessage('Please select an image.');

    const formData = new FormData();
    formData.append('avatarImage', avatar); // must match backend field name

    try {
      const storedUser = localStorage.getItem('videotube-user');
      if (!storedUser) {
        setMessage('User not logged in.');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const token = parsedUser?.token;

      if (!token) {
        setMessage('Authentication token missing. Please login again.');
        return;
      }

      await axios.patch('/users/changeAvatarImage', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Optional if you're also using cookies
      });

      setMessage('Avatar updated successfully!');
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      setMessage('Failed to update avatar.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Avatar Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UpdateAvatar;
