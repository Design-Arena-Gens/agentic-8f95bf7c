'use client';

import { useState } from 'react';
import VideoGenerator from './components/VideoGenerator';
import VideoQueue from './components/VideoQueue';
import Analytics from './components/Analytics';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generate' | 'queue' | 'analytics'>('generate');
  const [queueRefresh, setQueueRefresh] = useState(0);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            YouTube Faceless Channel Automation
          </h1>
          <p className="text-gray-400">US-Based Content Creation System</p>
        </header>

        <nav className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'generate'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Generate Content
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'queue'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Video Queue
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'analytics'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Analytics
          </button>
        </nav>

        <div className="mt-6">
          {activeTab === 'generate' && (
            <VideoGenerator onVideoAdded={() => setQueueRefresh(prev => prev + 1)} />
          )}
          {activeTab === 'queue' && <VideoQueue refresh={queueRefresh} />}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      </div>
    </main>
  );
}
