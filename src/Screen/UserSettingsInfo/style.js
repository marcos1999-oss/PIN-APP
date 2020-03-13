import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { scale, moderateScale, verticalScale } from "../../Utils/scaling";

export default StyleSheet.create({
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
    height: 50,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    zIndex: 1,
  },
  l_featureBar_title: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  l_featureBar_iconContainer: {
    marginRight: 5,
  },
  m_progressbar: {
    width: "100%",
    height: 5,
    backgroundColor: "#EAE8E8",
    borderRadius: 5,
    /*Shadow*/
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  m_progressbar_inner: {
    height: 5,
    backgroundColor: "#40EA31",
    borderRadius: 5,
  },
  formTitle: {
    fontSize: 14,
    color: "#555555",
  },
  formTitle2: {
    fontSize: 10,
    color: "#555555",
    fontWeight: "bold",
  },
  formSubTitle: {
    fontSize: 10,
    color: "#AFAFAF",
    textAlign: "center",
  },
  checkbox: {
    width: 37,
    height: 37,
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
    fontSize: 16,
    color: "#959595",
  },
  l_dateFormContainer: {
    marginLeft: -10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateLabel: {
    color: "#000",
    fontSize: 10,
    fontWeight: "bold",
  },
  dateInputContainer: {
    borderBottomWidth: 0,
  },
  l_divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  l_divider_line: {
    borderBottomWidth: 0.2,
    borderBottomColor: "#A7A7A7",
    flexGrow: 1,
  },
  l_divider_label: {
    fontSize: 10,
    color: "#555555",
    fontWeight: "bold",
    padding: 15,
  },
  error: {
    color: Colors.error,
    fontSize: moderateScale(8),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
  },
});
