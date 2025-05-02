import { createContext, useState, useContext, ReactNode } from 'react';

interface AudioContextType {
  currentTrack: string;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTrack: (track: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [currentTrack, setCurrentTrack] = useState<string>('/music/DIEZMO DEMO.mp3');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const value = {
    currentTrack,
    isPlaying,
    setIsPlaying,
    setCurrentTrack,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}; 