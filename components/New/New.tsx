import { type FC } from 'react'
import { styles } from './NewStyles';
import { Text, View } from 'react-native';


export const New: FC = () => {
    return (
        <View style={styles.new}>
            <Text style={styles.title}>Новое</Text>
        </View>
    );
}
