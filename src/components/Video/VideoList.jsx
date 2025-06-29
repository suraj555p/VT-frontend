import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

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
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
  );
};

export default VideoList;
