import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  profile: {
    width: "100%",
    height: "50%",
    backgroundColor: "#bdbdbd",
    position: "absolute",
    top: 0,
    left: 0,
  },
  container: {
    paddingTop: 50,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  brandName: {
    minWidth: "50%",
    maxWidth: "100%",
    alignSelf: "center",
    marginTop: -40,
  },
  brandName_text: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: "center",
    color: "#484646",
    fontSize: 14,
    fontWeight: "bold",
  },
  main: {
    padding: 10,
  },
  linkContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

});

export default style;
