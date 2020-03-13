import { StyleSheet } from "react-native";
import { verticalScale, scale } from "../../Utils/scaling";

export const colors = {
  defaultText: "#000",
  activeText: "white",
  button: "#5F92F3",
  border: "#5F92F3",
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
  },
  switchContainer: {
    height: verticalScale(30),
    width: scale(220),
    marginBottom: verticalScale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 1,
    alignSelf: "center",
  },
});

export default styles;
