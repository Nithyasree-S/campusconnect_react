import React, { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import { postsAPI } from '../api';

function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAllPosts();
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Campus Feed
      </h1>

      <CreatePost onPostCreated={handlePostCreated} />

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-600">Loading posts...</div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No posts yet. Be the first to post!
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
  );
}

export default Dashboard;