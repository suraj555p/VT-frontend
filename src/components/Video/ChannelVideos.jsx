// src/components/ChannelVideos.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios.js';

const ChannelVideos = ({ userId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/getAllChannelVideos/${userId}`);
        setVideos(res.data.videos || []);
      } catch (err) {
        console.error('Error loading channel videos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchVideos();
  }, [userId]);

  if (!userId) return null;
  if (loading) return <p className="text-sm text-gray-500">Loading videos...</p>;
  if (videos.length === 0) return <p className="text-sm text-gray-500">No videos uploaded yet.</p>;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div
          key={video._id}
          className="rounded overflow-hidden shadow bg-white dark:bg-gray-800"
        >
          {/* ✅ Video embed if available */}
          {video.video ? (
            <video
              src={video.video}
              controls
              className="w-full h-40 object-cover bg-black"
            />
          ) : (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
          )}

          {/* Video metadata */}
          <div className="p-3">
            <h4 className="text-base font-semibold text-gray-800 dark:text-white truncate">
              {video.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {video.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelVideos;
