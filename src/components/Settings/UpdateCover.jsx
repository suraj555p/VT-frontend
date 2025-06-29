import React, { useState } from 'react';
import axios from '../../api/axios';

const UpdateCover = () => {
  const [cover, setCover] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cover) return setMessage('Please select an image.');

    const formData = new FormData();
    formData.append('coverImage', cover); // ✅ field must match backend key

    try {
      const storedUser = localStorage.getItem('videotube-user');
      if (!storedUser) {
        return setMessage('User not logged in.');
      }

      const token = JSON.parse(storedUser)?.token;

      if (!token) {
        return setMessage('Authentication token missing. Please login again.');
      }

      await axios.patch('/users/changeCoverImage', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // ✅ optional if you switch to cookie auth
      });

      setMessage('Cover image updated successfully!');
    } catch (error) {
      console.error('Error uploading cover image:', error.response?.data || error.message);
      setMessage('Failed to update cover image.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Cover Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UpdateCover;
