'use client';

import { useState } from 'react';

interface VideoGeneratorProps {
  onVideoAdded: () => void;
}

const niches = [
  'Tech Reviews & Tips',
  'AI & Technology News',
  'Finance & Investing',
  'Self Improvement',
  'Mystery & True Crime',
  'History Facts',
  'Science Explained',
  'Productivity Hacks',
  'Business & Entrepreneurship',
  'Crypto & NFTs',
];

export default function VideoGenerator({ onVideoAdded }: VideoGeneratorProps) {
  const [niche, setNiche] = useState('');
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState('8-10');
  const [tone, setTone] = useState('informative');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerate = async () => {
    if (!niche || !topic) {
      setStatus('Please select a niche and enter a topic');
      return;
    }

    setLoading(true);
    setStatus('Generating content...');

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche, topic, duration, tone }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Video content generated and added to queue!');
        setTopic('');
        onVideoAdded();
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('❌ Failed to generate content');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Generate New Video Content</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Content Niche</label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">Select a niche...</option>
            {niches.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Video Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Top 10 AI Tools for 2024"
            className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Video Duration (minutes)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="3-5">3-5 minutes (Short)</option>
              <option value="8-10">8-10 minutes (Standard)</option>
              <option value="12-15">12-15 minutes (Long)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="informative">Informative</option>
              <option value="casual">Casual & Friendly</option>
              <option value="professional">Professional</option>
              <option value="dramatic">Dramatic</option>
              <option value="humorous">Humorous</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100"
        >
          {loading ? 'Generating...' : 'Generate Video Content'}
        </button>

        {status && (
          <div className={`p-4 rounded-lg ${status.includes('✅') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
            {status}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-900/50 rounded-lg">
        <h3 className="font-semibold mb-2 text-sm text-gray-400">Automation Features:</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• AI-powered script generation with SEO optimization</li>
          <li>• Natural text-to-speech voiceover (US accent)</li>
          <li>• Auto-generated video suggestions with stock footage</li>
          <li>• Thumbnail concepts and title recommendations</li>
          <li>• Hashtag and description generation</li>
        </ul>
      </div>
    </div>
  );
}
