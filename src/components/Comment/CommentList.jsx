import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const CommentList = ({ videoId, newComment }) => {
  const [comments, setComments] = useState([]);

  const storedUser = localStorage.getItem('videotube-user');
  const token = storedUser ? JSON.parse(storedUser)?.token : null;

  const fetchComments = async () => {
    try {
      const res = await axios.get('/comments/getAllComments');
      const videoComments = res.data.AllComments.filter(
        (comment) => comment.video === videoId
      );
      setComments(videoComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/comments/deleteComment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete comment.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  useEffect(() => {
    if (newComment) {
      setComments((prev) => [newComment, ...prev]);
    }
  }, [newComment]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white dark:bg-gray-800 p-3 mb-2 border border-gray-200 dark:border-gray-600 rounded shadow relative transition-colors"
          >
            <div className="flex items-center mb-2">
              <img
                src={comment.user?.avatarImage || '/default-avatar.png'}
                alt={comment.user?.username}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{comment.user?.fullname}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{comment.user?.username}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-200">{comment.text}</p>

            <button
              onClick={() => handleDelete(comment._id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
