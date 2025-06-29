import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const UploadVideo = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnail: null,
    video: null,
  });

  const [loading, setLoading] = useState(false);
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

    if (!form.title || !form.thumbnail || !form.video) {
      alert('Title, thumbnail, and video are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('thumbnail', form.thumbnail);
    formData.append('video', form.video);

    try {
      setLoading(true);
      const res = await axios.post('/videos/uploadVideo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(res.data.message);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to upload video!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-lg transition-colors"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
          {loading ? 'Uploading...' : 'Upload Video'}
        </h2>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Video Title"
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
          disabled={loading}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Video Description (optional)"
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          disabled={loading}
        ></textarea>

        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Thumbnail Image</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-3 p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
          disabled={loading}
        />

        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Video File</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
          className="w-full mb-4 p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded transition duration-200 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
