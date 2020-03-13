import { StyleSheet } from "react-native";
import {
  width,
  verticalScale,
  moderateScale,
  scale,
} from "../../Utils/scaling";

export const green = "#41AD49";

const styles = StyleSheet.create({
  bgImage: {
    width: width - scale(32),
    position: "absolute",
    bottom: verticalScale(-5),
    left: scale(32),
  },
  headerContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: moderateScale(12),
    fontWeight: "bold",
    color: "black",
  },
  container: {
    marginHorizontal: scale(32),
    marginTop: verticalScale(20),
  },
  reasonContainer: {
    marginLeft: 0,
    marginBottom: verticalScale(20),
    height: verticalScale(45),
  },
  reasonText: {
    fontSize: moderateScale(12),
  },
  button: {
    marginTop: verticalScale(55),
    width: "100%",
    height: verticalScale(46),
    backgroundColor: "#25B7D3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 1,
    justifyContent: "center",
  },
  continue: {
    fontSize: moderateScale(12),
    color: "white",
  },
});

export default styles;
