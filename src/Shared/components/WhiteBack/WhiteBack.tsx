import { ReactNode, type FC } from 'react'
import { View } from 'react-native';
import { styles } from './WhiteBackStyles';

interface WhiteBackProps {
    children: ReactNode; 
}

export const WhiteBack: FC<WhiteBackProps> = ({children}) => {
    return (
        <View style={styles.whiteBack}>
            {children}
        </View>
    );
}