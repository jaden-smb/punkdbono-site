import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const { currentTrack, isPlaying, setIsPlaying } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    // Event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [setIsPlaying]);

  // Effect to handle play/pause based on context
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const value = parseFloat(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Extract filename without extension for display
  const getTrackName = () => {
    const parts = currentTrack.split('/');
    const filename = parts[parts.length - 1];
    return filename.replace(/\.[^/.]+$/, ""); // Remove file extension
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={currentTrack} />
      
      <div className="player-controls">
        <button className="control-btn prev-btn" aria-label="Previous track">
          <span>◀◀</span>
        </button>
        
        <button className="control-btn play-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <span>❚❚</span>
          ) : (
            <span>▶</span>
          )}
        </button>
        
        <button className="control-btn next-btn" aria-label="Next track">
          <span>▶▶</span>
        </button>
      </div>
      
      <div className="progress-container">
        <span className="time current">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgress}
        />
        <span className="time duration">{formatTime(duration)}</span>
      </div>
      
      <div className="track-info">
        <span className="track-name">{isMobile ? getTrackName().slice(0, 20) : getTrackName()}</span>
      </div>
    </div>
  );
};

export default AudioPlayer; 