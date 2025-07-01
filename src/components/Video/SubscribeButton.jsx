import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js"; // Using full URL

const SubscribeButton = ({ targetUserId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  const storedUser = localStorage.getItem("videotube-user");
  const token = storedUser ? JSON.parse(storedUser)?.token : null;

  const fetchSubscriptionStatus = async () => {
    try {
      const res = await axios.get(
        `/subscriptions/status/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsSubscribed(res.data.isSubscribed);
      setSubscribersCount(res.data.subscribersCount);
    } catch (error) {
      console.error("Status fetch error:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (targetUserId && token) {
      fetchSubscriptionStatus();
    }
  }, [targetUserId]);

  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        `/subscriptions/subscribe/${targetUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSubscribed(true);
      setSubscribersCount(res.data.subscribersCount);
    } catch (error) {
      console.error("Subscribe error:", error.response?.data?.message || error.message);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const res = await axios.delete(
        `/subscriptions/unsubscribe/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSubscribed(false);
      setSubscribersCount(res.data.subscribersCount);
    } catch (error) {
      console.error("Unsubscribe error:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <button
        onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
        className={`px-4 py-2 rounded ${
          isSubscribed ? "bg-gray-500" : "bg-red-600"
        } text-white font-semibold`}
      >
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>
      <p className="mt-1 text-sm text-gray-700">{subscribersCount} Subscribers</p>
    </div>
  );
};

export default SubscribeButton;
