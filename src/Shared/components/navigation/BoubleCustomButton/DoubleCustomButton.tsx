import { type FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Arrow from '@assets/images/ArrowIcon.svg';
import { styles } from './DoubleCustomButtonStyles';

interface DoubleCustomButtonProps {
    icon1: React.ElementType; 
    title1: string; 
    onPress1: () => void;     
    icon2: React.ElementType; 
    title2: string;          
    onPress2: () => void;     
  }
  


  export const DoubleCustomButton: FC<DoubleCustomButtonProps> = ({
    icon1: Icon1,
    title1,
    onPress1,
    icon2: Icon2,
    title2,
    onPress2,
  }) => {
    return (
      <View>
        <TouchableOpacity style={styles.firstBtn} onPress={onPress1}>
          <View style={styles.iconAndText}>
            <Icon1 width={32} height={32} style={styles.logo} />
            <Text style={styles.desc}>{title1}</Text>
          </View>
          <Arrow width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondBtn} onPress={onPress2}>
          <View style={styles.iconAndText}>
            <Icon2 width={32} height={32} style={styles.logo} />
            <Text style={styles.desc}>{title2}</Text>
          </View>
          <Arrow width={24} height={24} />
        </TouchableOpacity>
      </View>
    );
  };
  

