// import { FC, useState } from 'react';
// import { Text, TouchableOpacity, View, } from 'react-native';
// import * as Clipboard from 'expo-clipboard';
// import CopyIcon from '@assets/images/Copy.svg';
// import { styles } from './HelloUserStyle';

// interface HelloUserProps {
//     firstName: string;
//     id?: string | undefined
// }

// export const HelloUser: FC<HelloUserProps> = ({ firstName, id }) => {
//     const [showIcon, setShowIcon] = useState(false)

//     const copyToClipboard = async () => {
//         await Clipboard.setStringAsync(id);
//         setShowIcon(true)

//         setTimeout(() => {
//             setShowIcon(false)
//         }, 2000)
//     };

//     return (
//         <View style={styles.userBox}>
//             <Text style={styles.userName}>Привет, {firstName}!</Text>
//             <TouchableOpacity style={styles.btnCopy} onPress={copyToClipboard}>
//                 <Text style={styles.userId}>{id}</Text>
//                 {showIcon && <CopyIcon width={20} height={20} />}
//             </TouchableOpacity>
//         </View>
//     );
// };
// HelloUser.tsx
import React, { FC, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import CopyIcon from '@assets/images/Copy.svg';
import { styles } from './HelloUserStyle';

interface HelloUserProps {
  firstName?: string;           
  id?: string | undefined;
}

export const HelloUser: FC<HelloUserProps> = ({ firstName = '', id }) => {
  const [showIcon, setShowIcon] = useState(false);

  const copyToClipboard = async () => {
    if (!id) {
      return;
    }

    try {
      await Clipboard.setStringAsync(String(id));
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 2000);
    } catch (e) {
      console.error('Failed to copy id to clipboard', e);
    }
  };

  return (
    <View style={styles.userBox}>
      <Text style={styles.userName}>Привет, {firstName || 'Гость'}!</Text>

      <TouchableOpacity
        style={styles.btnCopy}
        onPress={copyToClipboard}
        disabled={!id}
        accessibilityLabel={id ? 'Копировать ID' : 'ID отсутствует'}
      >
        <Text style={styles.userId}>{id ?? ''}</Text>
        {showIcon && <CopyIcon width={20} height={20} />}
      </TouchableOpacity>
    </View>
  );
};
