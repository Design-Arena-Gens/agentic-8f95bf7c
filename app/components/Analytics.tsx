'use client';

import { useEffect, useState } from 'react';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalVideos: 0,
    readyVideos: 0,
    processingVideos: 0,
    pendingVideos: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      const videos = data.videos || [];

      setStats({
        totalVideos: videos.length,
        readyVideos: videos.filter((v: any) => v.status === 'ready').length,
        processingVideos: videos.filter((v: any) => v.status === 'processing').length,
        pendingVideos: videos.filter((v: any) => v.status === 'pending').length,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Videos" value={stats.totalVideos} color="text-white" />
        <StatCard title="Ready to Upload" value={stats.readyVideos} color="text-green-400" />
        <StatCard title="Processing" value={stats.processingVideos} color="text-yellow-400" />
        <StatCard title="Pending" value={stats.pendingVideos} color="text-gray-400" />
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Content Performance</h2>
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Automation Status</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Script Generation</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span>SEO Optimization</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span>Content Queue</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span>US Voice Selection</span>
                <span className="text-green-400">✓ Active</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Connect to ElevenLabs or Google Cloud TTS for voiceover generation</li>
              <li>• Integrate with Pexels/Pixabay API for stock footage</li>
              <li>• Set up automatic video rendering pipeline</li>
              <li>• Configure YouTube API for automated uploads</li>
              <li>• Schedule content calendar for consistent posting</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Recommended Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Voiceover</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• ElevenLabs (Best quality)</li>
              <li>• Google Cloud TTS</li>
              <li>• Amazon Polly</li>
            </ul>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Stock Footage</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Pexels API (Free)</li>
              <li>• Pixabay API (Free)</li>
              <li>• Storyblocks (Paid)</li>
            </ul>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Video Editing</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Remotion (React-based)</li>
              <li>• FFmpeg (CLI)</li>
              <li>• Pictory.ai (Auto)</li>
            </ul>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Thumbnails</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Canva API</li>
              <li>• Placid.app</li>
              <li>• Custom templates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
