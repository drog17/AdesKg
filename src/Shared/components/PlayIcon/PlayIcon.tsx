import React from 'react';
import { TouchableOpacity } from 'react-native';
import PlayIcon from '@/assets/images/playIcon.svg';
import { styles } from './PlayIconStyles';

interface PlayButtonProps {
  isPlaying: boolean;
  onPress: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, onPress }) => {
  return (
    !isPlaying && (  
      <TouchableOpacity onPress={onPress} style={styles.playButton}>
        <PlayIcon width={40} height={40} />
      </TouchableOpacity>
    )
  );
};
