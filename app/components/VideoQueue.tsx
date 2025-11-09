'use client';

import { useEffect, useState } from 'react';

interface Video {
  id: string;
  niche: string;
  topic: string;
  status: 'pending' | 'processing' | 'ready';
  createdAt: string;
  script?: string;
  title?: string;
  description?: string;
  tags?: string[];
  thumbnailIdeas?: string[];
}

interface VideoQueueProps {
  refresh: number;
}

export default function VideoQueue({ refresh }: VideoQueueProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, [refresh]);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
      fetchVideos();
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading videos...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Video Queue ({videos.length})</h2>

        {videos.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No videos in queue. Generate your first video!</p>
        ) : (
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{video.topic}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      video.status === 'ready'
                        ? 'bg-green-500/20 text-green-400'
                        : video.status === 'processing'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {video.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{video.niche}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteVideo(video.id);
                    }}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Video Details</h2>

        {selectedVideo ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{selectedVideo.topic}</h3>
              <p className="text-sm text-gray-400">{selectedVideo.niche}</p>
            </div>

            {selectedVideo.title && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Suggested Title</label>
                <p className="bg-gray-700 p-3 rounded">{selectedVideo.title}</p>
              </div>
            )}

            {selectedVideo.description && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Description</label>
                <p className="bg-gray-700 p-3 rounded text-sm max-h-32 overflow-y-auto">
                  {selectedVideo.description}
                </p>
              </div>
            )}

            {selectedVideo.tags && selectedVideo.tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.tags.map((tag, idx) => (
                    <span key={idx} className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedVideo.thumbnailIdeas && selectedVideo.thumbnailIdeas.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Thumbnail Ideas</label>
                <ul className="bg-gray-700 p-3 rounded space-y-2 text-sm">
                  {selectedVideo.thumbnailIdeas.map((idea, idx) => (
                    <li key={idx}>• {idea}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedVideo.script && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Script</label>
                <div className="bg-gray-700 p-4 rounded text-sm max-h-64 overflow-y-auto whitespace-pre-wrap">
                  {selectedVideo.script}
                </div>
              </div>
            )}

            <button
              onClick={() => alert('Export functionality would connect to video editing tools')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Export to Video Editor
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-12">Select a video to view details</p>
        )}
      </div>
    </div>
  );
}
