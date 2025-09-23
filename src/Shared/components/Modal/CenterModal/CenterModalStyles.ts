import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  modal: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fffffa",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    fontFamily: '400',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    gap: 30,
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#737373",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  cancelButton: {
    backgroundColor: "#5eb147",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  Text: {
    color: "#f1f1f1",
    fontSize: 14,
    textAlign: 'center',
    fontFamily: '400'
  },
});
