import React from 'react';
import SubscribeButton from './SubscribeButton.jsx'; // Adjust path as needed

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading video...</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow transition-colors">
      <video
        controls
        className="w-full h-auto mb-4 rounded"
        poster={video.thumbnail}
      >
        <source src={video.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{video.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{video.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={video.user?.avatarImage || "/default-avatar.png"}
            alt={video.user?.username}
            className="w-10 h-10 rounded-full mr-3 border dark:border-gray-600"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{video.user?.fullname}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{video.user?.username}</p>
          </div>
        </div>

        {video.user && (
          <SubscribeButton targetUserId={video.user._id} />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
