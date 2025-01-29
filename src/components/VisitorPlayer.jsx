// frontend/src/components/VisitorPlayer.js

import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const VisitorPlayer = ({ audioSrc, transcript, images, videos }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const audioRef = useRef(null);
  const transcriptRef = useRef(null);
  const skipSeconds = 15;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (audioRef.current) audioRef.current.currentTime += skipSeconds;
  };

  const skipBackward = () => {
    if (audioRef.current) audioRef.current.currentTime -= skipSeconds;
  };

  useEffect(() => {
    let intervalId;
    if (autoScroll && isPlaying && transcriptRef.current) {
      intervalId = setInterval(() => {
        transcriptRef.current.scrollTop += 1;
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [autoScroll, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const updateScroll = () => {
        if (autoScroll && transcriptRef.current) {
          const percentage = audioRef.current.currentTime / audioRef.current.duration;
          transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight * percentage;
        }
      };
      audioRef.current.addEventListener('timeupdate', updateScroll);

      // Cleanup function with null check to prevent errors
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateScroll);
        }
      };
    }
  }, [autoScroll]);

  return (
    <div className="p-4">
      <audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} />
      <div className="mb-4 flex space-x-2">
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={skipBackward}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
          aria-label={`Skip backward ${skipSeconds} seconds`}
        >
          - {skipSeconds}s
        </button>
        <button
          onClick={skipForward}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
          aria-label={`Skip forward ${skipSeconds} seconds`}
        >
          + {skipSeconds}s
        </button>
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition duration-200"
          aria-label={autoScroll ? 'Disable auto-scroll' : 'Enable auto-scroll'}
        >
          {autoScroll ? 'Disable Auto-Scroll' : 'Enable Auto-Scroll'}
        </button>
      </div>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {images && images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className="w-full h-auto rounded shadow"
          />
        ))}
        {videos && videos.map((src, idx) => (
          <video
            key={idx}
            controls
            src={src}
            className="w-full h-auto rounded shadow"
            aria-label={`Video ${idx + 1}`}
          />
        ))}
      </div>
      <div
        ref={transcriptRef}
        className="border p-2 h-48 overflow-y-auto text-sm bg-white rounded"
        aria-label="Transcript"
      >
        {transcript || "Transcript will be displayed here."}
      </div>
    </div>
  );
};

export default VisitorPlayer;
