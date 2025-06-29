import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserVideos = async () => {
    try {
      const storedUser = localStorage.getItem('videotube-user');
      const token = storedUser ? JSON.parse(storedUser)?.token : null;

      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      const res = await axios.get('/videos/getAllUserVideos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setVideos(res.data.userVideos || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserVideos();
  }, []);

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;

    try {
      const storedUser = localStorage.getItem('videotube-user');
      const token = storedUser ? JSON.parse(storedUser)?.token : null;

      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      await axios.delete(`/videos/deleteVideo/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setVideos((prev) => prev.filter((video) => video._id !== videoId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete video");
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-lg text-gray-800 dark:text-gray-200">Loading your videos...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  if (videos.length === 0) {
    return <div className="p-4 text-center text-gray-600 dark:text-gray-400">You haven't uploaded any videos yet.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-6">My Uploaded Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white dark:bg-gray-800 shadow rounded overflow-hidden transition">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                {video.description}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={video.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium"
                >
                  ▶ Watch Video
                </a>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm font-medium"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideos;
