import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to CampusConnect
          </h1>
          <p className="text-2xl mb-12 max-w-2xl mx-auto">
            Connect with your campus community. Share moments, ideas, and experiences with fellow students.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-800 transition shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8 text-white">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Share Updates</h3>
            <p>Post text and images to share your campus experiences</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Engage</h3>
            <p>Like and comment on posts from your peers</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p>Build your campus network and stay connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;