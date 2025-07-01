import React, { useEffect, useState } from 'react';
import axios from "../../api/axios.js";
import { Link } from 'react-router-dom'; // ⬅️ import Link

const SubscribedChannels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const storedUser = localStorage.getItem('videotube-user');
  const token = storedUser ? JSON.parse(storedUser)?.token : null;

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get('/subscriptions/getChannels', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setChannels(response.data.channel);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch subscribed channels');
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [token]);

  if (loading) return <p className="text-center text-sm text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white border-b pb-2">
        Subscribed Channels
      </h2>
      <div className="flex flex-col gap-3">
        {channels.map((item) => (
          <Link
            key={item._id}
            to={`/anotherchannel/${item.channel?.username}`} // ⬅️ dynamic route
            className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group"
          >
            <img
              src={item.channel?.avatarImage}
              alt={item.channel?.username}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-blue-500 transition"
            />
            <span className="ml-4 text-base font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {item.channel?.username}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubscribedChannels;
