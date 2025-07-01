import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios.js';
import ChannelVideos from '../components/Video/ChannelVideos.jsx'; // ⬅️ Import it

const AnotherChannelProfile = () => {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem('videotube-user');
  const token = storedUser ? JSON.parse(storedUser)?.token : null;

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/users/getAnotherChannelProfile/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setChannel(res.data.channel);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch channel profile');
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [username, token]);

  if (loading) return <p className="text-center mt-6 text-gray-500">Loading channel...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!channel) return null;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Cover Image */}
      {channel.coverImage && (
        <div className="mb-4">
          <img
            src={channel.coverImage}
            alt="Cover"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Avatar and Basic Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <img
          src={channel.avatarImage || '/default-avatar.png'}
          alt={channel.username}
          className="w-20 h-20 rounded-full object-cover border-2"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {channel.fullname || 'Unnamed User'}
          </h1>
          <p className="text-sm text-gray-500">@{channel.username}</p>
          <p className="text-sm text-gray-500">{channel.email}</p>
        </div>
      </div>

      {/* Channel Stats */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-700 dark:text-gray-300 mb-4">
        <p>
          <strong>{channel.subscribersCount}</strong> Subscribers
        </p>
        <p>
          <strong>{channel.channelSubscribedToCount}</strong> Subscribed To
        </p>
        <p>
          Status:{' '}
          <strong className={channel.isSubscribed ? 'text-green-600' : 'text-gray-500'}>
            {channel.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
          </strong>
        </p>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Viewing public profile of <strong>{channel.username}</strong>.
      </p>

      {/* Channel Videos Section */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {channel.username}'s Videos
      </h3>
      <ChannelVideos userId={channel._id} />
    </div>
  );
};

export default AnotherChannelProfile;
