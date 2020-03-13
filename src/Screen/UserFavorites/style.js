import { StyleSheet } from "react-native";
import {
  verticalScale,
  scale,
  normalizeSize,
  moderateScale,
} from "../../Utils/scaling";
import { responsiveHeight } from "../../Utils/dimensions";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5F92F3",
  },
  header: {
    backgroundColor: "#5F92F3",
    borderBottomWidth: 0,
    marginTop: responsiveHeight(2),
    elevation: 0,
  },
  headerContentStyle: {
    color: "white",
    fontSize: moderateScale(12),
    fontWeight: "bold",
    alignSelf: "center",
  },
  closeIcon: {
    color: "white",
  },
  favoritesContent: {
    marginLeft: scale(20),
    marginRight: scale(15),
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  swipeContainer: {
    backgroundColor: "#00000000",
    height: verticalScale(56.44),
    marginBottom: verticalScale(20),
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
    borderRadius: verticalScale(20),
  },
  deleteBtn: {
    height: verticalScale(56.44),
    marginBottom: verticalScale(20),
    alignSelf: "flex-end",
  },
  deleteText: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    color: "white",
  },
  itemContainer: {
    height: verticalScale(56.44),
    paddingVertical: verticalScale(9),
    paddingHorizontal: scale(20),
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    borderRadius: verticalScale(20),
    width: "100%",
    flexDirection: "row",
  },
  branchContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  branchImageContainer: {
    width: verticalScale(30),
    height: verticalScale(30),
    borderRadius: verticalScale(30) / 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  branchImage: {
    width: verticalScale(40),
    height: verticalScale(40),
  },
  branchName: {
    marginTop: verticalScale(3),
    fontSize: moderateScale(6),
    fontWeight: "bold",
    color: "#6E6969",
  },
  dealInfo: {
    flex: 9,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: verticalScale(6),
  },
  title: {
    fontSize: moderateScale(10),
    fontWeight: "bold",
    color: "#6E6969",
  },
  subText: {
    fontSize: moderateScale(12),
    color: "#9B9797",
  },
});
