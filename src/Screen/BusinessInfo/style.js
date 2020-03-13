import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from "../../Utils/scaling";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  l_container: {
    backgroundColor: Colors.skyBlue,
    flex: 1,
  },
  l_bottom: {
    position: "absolute",
    bottom: 0,
    zIndex: -1,
  },
  m_SwitchList: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#707070",
    borderBottomWidth: 0.4,
  },
  l_featureBar: {
    backgroundColor: "rgba(19, 125, 145, 0.9)",
    height: verticalScale(46),
    borderRadius: verticalScale(20),
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
    backgroundColor: "#3865BA",
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
    height: verticalScale(37),
    borderWidth: 0.4,
    borderColor: "#a7a7a7",
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox_active: {
    backgroundColor: "#5F92F3",
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
  keyWordContainer: {
    backgroundColor: "#3865BA",
    borderRadius: verticalScale(50),
    paddingLeft: scale(20),
    height: verticalScale(50),
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    opacity: 0.9,
  },
  tagContainer: {
    marginVertical: verticalScale(8),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(20),
    flexDirection: "row",
  },
  tagText: {
    fontSize: moderateScale(12),
    color: "white",
  },
  tagRemoveContainer: {
    position: "absolute",
    top: 0,
    right: scale(10),
  },
  tagRemoveButton: {
    alignItems: "flex-start",
  },
  keyWordInputContainer: {
    borderColor: 'white',
    margin: 0,
    borderBottomWidth: 0,
    backgroundColor: "transparent",
    paddingLeft: 0,
    height: verticalScale(50),
    width: scale(180),
  },
});
