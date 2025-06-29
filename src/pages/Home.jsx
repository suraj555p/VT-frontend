import React from 'react';
import VideoList from '../components/Video/VideoList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl font-bold text-center py-6 text-gray-800 dark:text-gray-100">
        Latest Videos
      </h1>
      <VideoList />
    </div>
  );
};

export default Home;
