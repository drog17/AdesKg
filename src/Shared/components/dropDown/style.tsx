import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backdrop: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
  },
  separator: {
    height: 4,
  },
  options: {
    position: "absolute",
    // top: 53,
    width: 288,
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
    backgroundColor: "rgba(255, 255, 255, 1)",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // Д
  },
  text: {
    fontSize: 14,
  },
  button: {
    height: 30,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 1,
    borderRadius: 8,
  },
  placeholderText: {
    color: "#c8c8c8", // цвет текста для placeholder
  },
  selectedText: {
    color: "#232323", // цвет текста при выборе города
  },
});
