import React, { useState } from 'react';
import { postsAPI } from '../api';

function PostCard({ post, currentUser, onDelete, onUpdate }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || '');
  const [loading, setLoading] = useState(false);

  const isOwner = currentUser && post.user && post.user._id === currentUser._id;
  const isLiked = currentUser && post.likes && post.likes.some(likeId => likeId === currentUser._id || likeId._id === currentUser._id);

  const handleLike = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const response = await postsAPI.likePost(post._id);
      onUpdate(response.data);
    } catch (err) {
      console.error('Failed to like post:', err);
      alert('Failed to like post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setLoading(true);
      try {
        await postsAPI.deletePost(post._id);
        onDelete(post._id);
      } catch (err) {
        console.error('Failed to delete post:', err);
        alert('Failed to delete post: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim() && !post.image) {
      alert('Post must have content or an image');
      return;
    }
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', editContent);
      const response = await postsAPI.updatePost(post._id, formData);
      onUpdate(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update post:', err);
      alert('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await postsAPI.addComment(post._id, { text: commentText });
      onUpdate(response.data);
      setCommentText('');
    } catch (err) {
      console.error('Failed to add comment:', err);
      alert('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    
    setLoading(true);
    try {
      const response = await postsAPI.deleteComment(post._id, commentId);
      onUpdate(response.data);
    } catch (err) {
      console.error('Failed to delete comment:', err);
      alert('Failed to delete comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start space-x-3">
        <img
          src={post.user?.avatar || 'https://via.placeholder.com/40'}
          alt={post.user?.name || 'User'}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{post.user?.name || 'Unknown User'}</h3>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            {isOwner && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={loading}
                  className="text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mt-3">
              <textarea
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleEdit}
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(post.content || '');
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {post.content && <p className="mt-2 text-gray-800">{post.content}</p>}
            </>
          )}

          {post.image && (
            <img
              src={`http://localhost:5000${post.image}`}
              alt="Post"
              className="mt-3 rounded-lg max-w-full h-auto"
              onError={(e) => {
                console.error('Image failed to load:', post.image);
                e.target.style.display = 'none';
              }}
            />
          )}

          <div className="flex items-center space-x-4 mt-4 pt-3 border-t">
            <button
              onClick={handleLike}
              disabled={loading || !currentUser}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-600' : 'text-gray-600'
              } hover:text-red-600 disabled:opacity-50`}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span className="text-sm">{post.likes?.length || 0}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <span>💬</span>
              <span className="text-sm">{post.comments?.length || 0}</span>
            </button>
          </div>

          {showComments && (
            <div className="mt-4 space-y-3">
              {currentUser && (
                <form onSubmit={handleComment} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !commentText.trim()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {loading ? 'Posting...' : 'Post'}
                  </button>
                </form>
              )}

              {post.comments && post.comments.map((comment) => (
                <div key={comment._id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <img
                        src={comment.user?.avatar || 'https://via.placeholder.com/32'}
                        alt={comment.user?.name || 'User'}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-sm">{comment.user?.name || 'Unknown User'}</p>
                        <p className="text-sm text-gray-800">{comment.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {currentUser && comment.user && comment.user._id === currentUser._id && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800 text-xs disabled:opacity-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;