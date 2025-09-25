import { useRef, useEffect, FC } from 'react';
import { Animated, LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import Arrow from '@assets/images/ArrowDown.svg';
import QuestionIcon from '@assets/images/Questionbublle.svg';
import { styles } from './QuestionsItemStyles';

interface QuestionsItemProps {
    question: string;
    answer: string;
    isActive: boolean;
    onPress: () => void;
}

export const QuestionsItem: FC<QuestionsItemProps> = ({ question, answer, isActive, onPress }) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        Animated.timing(rotateAnim, {
            toValue: isActive ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isActive]);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={1}>
                <View style={styles.default}>
                    <View style={styles.questionBox}>
                        <QuestionIcon width={24} height={24} />
                        <Text style={styles.question}>{question}</Text>
                    </View>
                    <Animated.View style={{ transform: [{ rotate }] }}>
                        <Arrow height={24} width={24} />
                    </Animated.View>
                </View>
                {isActive && (
                    <View>
                        <Text style={styles.answer}>{answer}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};
