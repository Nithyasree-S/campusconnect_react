import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { postsAPI } from '../api';

function Profile({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await postsAPI.getAllPosts();
      // Filter posts by current user
      const userPosts = response.data.filter(post => post.user._id === user._id);
      setPosts(userPosts);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar || 'https://via.placeholder.com/150'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-2">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">My Posts</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
            You haven't posted anything yet
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard
                key={post._id}
                post={post}
                currentUser={user}
                onDelete={handlePostDeleted}
                onUpdate={handlePostUpdated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;