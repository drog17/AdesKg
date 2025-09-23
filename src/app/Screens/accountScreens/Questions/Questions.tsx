import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Background } from '@/src/Shared/components/Background';
import { WhiteBack } from '@/src/Shared/components/WhiteBack';
import { GoBack } from '@/src/Shared/components/navigation/GoBackButton/GoBack'
import { QuestionsItem } from '@/Data/AccountData/QuestionsItem';
import { QuestionData } from '@/Data/AccountData/QuestionData';
import { styles } from './QuestionsStyles';
import { useNavigation } from '@react-navigation/native';

const Questions = () => {
    const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);

    const toggleQuestion = (id: number) => {
        setActiveQuestionId(prevId => (prevId === id ? null : id));
    };

    const navigation = useNavigation()
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      })
    }, [navigation])

    return (
        <Background>
            <GoBack title='Аккаунт'/>
            <WhiteBack>
                <ScrollView>
                    <View style={styles.parent}>
                        {QuestionData.map((item) => (
                            <QuestionsItem
                                key={item.id}
                                question={item.question}
                                answer={item.answer}
                                isActive={item.id === activeQuestionId}
                                onPress={() => toggleQuestion(item.id)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </WhiteBack>
        </Background>
    );
};

export default Questions;
