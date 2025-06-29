import React, { useState } from 'react';
import axios from '../../api/axios';

const CommentBox = ({ videoId, onCommentAdded }) => {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert('Comment cannot be empty!');
      return;
    }

    const storedUser = localStorage.getItem('videotube-user');
    const token = storedUser ? JSON.parse(storedUser)?.token : null;

    if (!token) {
      alert("Please log in to comment.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await axios.post(
        '/comments/addComment',
        {
          text,
          video: videoId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onCommentAdded(res.data.comment);
      setText('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add comment!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <textarea
        className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        rows="3"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 text-white rounded transition duration-200 ${
          submitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentBox;
