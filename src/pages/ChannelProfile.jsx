import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios.js';

const ChannelProfile = () => {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !username; // if no username param, assume current user

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const endpoint = isOwnProfile
          ? '/users/getCurrentChannelProfile'
          : `/users/getUserChannelProfile/${username}`;

        const response = await axios.get(endpoint);
        setChannel(response.data.channel);
      } catch (error) {
        console.error("Error fetching channel:", error?.response?.data || error);
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [username, isOwnProfile]);

  if (loading) {
    return (
      <p className="text-center p-6 text-gray-700 dark:text-gray-200">
        Loading Channel...
      </p>
    );
  }

  if (!channel) {
    return (
      <p className="text-center p-6 text-red-600 dark:text-red-400">
        Channel not found!
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl text-gray-900 dark:text-gray-100 transition">
      <div className="flex flex-col items-center gap-4">
        <img
          src={channel.avatarImage}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-purple-500 object-cover"
        />
        <h2 className="text-2xl font-bold">{channel.fullname}</h2>
        <p className="text-gray-600 dark:text-gray-300">@{channel.username}</p>
        <p className="text-gray-500 dark:text-gray-400">Email: {channel.email}</p>

        <div className="flex gap-6 mt-4 text-center">
          <div>
            <p className="text-lg font-semibold">{channel.subscribersCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Subscribers</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{channel.channelSubscribedToCount}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Subscribed</p>
          </div>
          {!isOwnProfile && (
            <div>
              <p className="text-lg font-semibold">
                {channel.isSubscribed ? '✅' : '❌'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Subscribed By You</p>
            </div>
          )}
        </div>

        {channel.coverImage && (
          <img
            src={channel.coverImage}
            alt="Cover"
            className="w-full rounded-lg mt-6 border border-gray-300 dark:border-gray-600 object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ChannelProfile;
