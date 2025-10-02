// import { type FC } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import ArrowLeft from "@assets/images/ArrowLeft.svg";
// import { useNavigation } from "expo-router";

// interface GoBackProps {
//   title: string;
// }

// export const GoBack: FC<GoBackProps> = ({ title }) => {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.btnBox}>
//       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
//         <ArrowLeft height={24} width={24} />
//         <Text style={styles.title}>{title}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


// export const styles = StyleSheet.create({
//   btnBox: {
//     height: 116,
//     width: "100%",
//     paddingTop: 47,
//     paddingBottom: 25,
//   },
//   btn: {
//     height: 44,
//     width: "100%",
//     backgroundColor: "#fffffa",
//     paddingHorizontal: 8,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: 'center',
//     borderRadius: 15,
//   },
//   title: {
//     fontFamily: "400",
//     fontSize: 12,
//     color: "#737373",
//   },
// });

import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArrowLeft from "@assets/images/ArrowLeft.svg"; // поправь путь, если у тебя алиасы не настроены
import { useRouter } from "expo-router";

interface GoBackProps {
  title: string;
}

export const GoBack: FC<GoBackProps> = ({ title }) => {
  const router = useRouter();

  return (
    <View style={styles.btnBox}>
      <TouchableOpacity onPress={() => router.back()} style={styles.btn}>
        <ArrowLeft height={24} width={24} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  btnBox: {
    height: 116,
    width: "100%",
    paddingTop: 47,
    paddingBottom: 25,
  },
  btn: {
    height: 44,
    width: "100%",
    backgroundColor: "#fffffa",
    paddingHorizontal: 8,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
  },
  title: {
    fontWeight: "400",
    fontSize: 12,
    color: "#737373",
  },
});
