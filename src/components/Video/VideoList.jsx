import React, { useEffect, useState } from 'react';
import axios from '../../api/axios.js';
import { Link } from 'react-router-dom';
import SubscribedChannels from './SubscribedChannels.jsx'; // update path as needed

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchVideos = async () => {
    try {
      const res = await axios.get('/videos/getAllvideos');
      setVideos(res.data['All videos ']);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();

    const storedUser = localStorage.getItem('videotube-user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex">
      {/* Sidebar: Subscribed Channels */}
  {isLoggedIn && (
  <aside className="w-64 hidden sm:flex flex-col p-4 border-r bg-gray-50 dark:bg-gray-900 overflow-y-auto max-h-screen">
    <SubscribedChannels />
  </aside>
)}


      {/* Main Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No videos found.
          </p>
        ) : (
          videos.map((video) => (
            <Link
              to={`/video/${video._id}`}
              key={video._id}
              className="border rounded shadow hover:shadow-lg transition"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  by {video.user?.username}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default VideoList;
