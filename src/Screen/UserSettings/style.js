import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "../../Utils/scaling";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  menuItem: {
    marginVertical: verticalScale(50),
    marginHorizontal: scale(50),
  },
  l_container: {
    backgroundColor: Colors.skyBlue,
    flex: 1,
  },
  l_bottom: {
    position: "absolute",
    bottom: 0,
  },
  l_featureBar: {
    backgroundColor: "rgba(19, 125, 145, 0.9)",
    height: verticalScale(50),
    borderRadius: verticalScale(25),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    zIndex: 1,
  },
  l_featureBar_title: {
    color: "#FFFFFF",
    fontSize: moderateScale(14),
  },
  l_featureBar_iconContainer: {
    marginRight: scale(5),
  },
  m_progressbar: {
    width: "100%",
    height: verticalScale(5),
    backgroundColor: "#EAE8E8",
    borderRadius: verticalScale(5),
    /*Shadow*/
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: verticalScale(5),
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  m_progressbar_inner: {
    height: verticalScale(5),
    backgroundColor: "#40EA31",
    borderRadius: verticalScale(5),
  },
  formTitle: {
    fontSize: moderateScale(14),
    color: "#555555",
  },
  formTitle2: {
    fontSize: moderateScale(10),
    color: "#555555",
    fontWeight: "bold",
  },
  formSubTitle: {
    fontSize: moderateScale(10),
    color: "#AFAFAF",
    textAlign: "center",
  },
  checkbox: {
    width: scale(37),
    height: moderateScale(37),
    borderWidth: 0.2,
    borderColor: "#a7a7a7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox_active: {
    backgroundColor: "#31AF91",
    borderWidth: 0,
  },
  checkbox_label: {
    fontWeight: "bold",
    fontSize: moderateScale(16),
    color: "#959595",
  },
  l_dateFormContainer: {
    marginLeft: scale(-10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateLabel: {
    color: "#000",
    fontSize: moderateScale(10),
    fontWeight: "bold",
  },
  dateInputContainer: {
    borderBottomWidth: 0,
  },
  l_divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  l_divider_line: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#A7A7A7",
    flexGrow: 1,
  },
  l_divider_label: {
    fontSize: moderateScale(10),
    color: "#555555",
    fontWeight: "bold",
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(15),
  },
  listLink: {
    // marginVertical: verticalScale(50),
    marginHorizontal: scale(35),
    width: "80%",
  },
  cardContainer: { width: scale(234), alignSelf: "center" },
  cardWrapper: {
    paddingHorizontal: scale(10),
    paddingTop: verticalScale(10),
    alignItems: "center",
  },
  cardTitle: {
    color: "#6E6969",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  actionBtnContainer: { marginTop: verticalScale(20) },
});
