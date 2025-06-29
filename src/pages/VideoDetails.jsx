import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import VideoPlayer from '../components/Video/VideoPlayer';
import CommentBox from '../components/Comment/CommentBox';
import CommentList from '../components/Comment/CommentList';

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [newComment, setNewComment] = useState(null);

  const fetchVideo = async () => {
    try {
      const res = await axios.get(`/videos/getVideosById/${id}`);
      setVideo(res.data['particular User videos ']);
    } catch (error) {
      console.error('Failed to fetch video:', error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const handleNewComment = (comment) => {
    setNewComment(comment);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-6 transition-colors duration-300">
      {video ? (
        <>
          <VideoPlayer video={video} />
          <div className="mt-8 max-w-4xl mx-auto">
            <CommentBox videoId={video._id} onCommentAdded={handleNewComment} />
            <CommentList videoId={video._id} newComment={newComment} />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading video details...</p>
      )}
    </div>
  );
};

export default VideoDetails;
