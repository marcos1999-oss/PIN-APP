import { StyleSheet, Platform } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
  width,
  height,
} from "../../../Utils/scaling";
import { Colors, Fonts } from "../../../Themes";
//AddTop

const style = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  top: {
    backgroundColor: "rgba(255,255,255,0.8)",
    height: verticalScale(104),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    alignItems: "center",
    borderWidth: scale(0.5),
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: verticalScale(20),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: 5,
    marginTop: verticalScale(40),
    marginHorizontal: scale(10),
  },
  top_title: {
    fontSize: moderateScale(12),
    color: Colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottom: {
    alignSelf: "flex-end",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  map: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // width: '100%',
    // height: '100%',
    // zIndex: 0,
    ...StyleSheet.absoluteFillObject,
  },
  wrapViewBtnStartStyle: {
    width: "80%",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  btnStartNowStyle: {
    height: scale(40),
  },
  btnStartNowTextStyle: {
    ...Fonts.style.small,
  },
  btnLocationStyle: {
    width: scale(40),
    height: scale(40),

  },
  wrapPinIconContainer: {
    width: "80%",
    flexDirection: "row",
    marginTop: verticalScale(7),
    justifyContent: "space-between",
  },
  pin: {
    width: scale(19),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
  },
  pinIcon: {
    flex: 1,
    resizeMode: "cover",
  },
  homePinContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: verticalScale(200),
    height: verticalScale(200),
    borderRadius: verticalScale(100),
    borderWidth: scale(6),
    borderColor: "#31AF9180",
  },
  normalPinContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(176,31,31,0.6)",
    width: verticalScale(100),
    height: verticalScale(100),
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: verticalScale(50),
    // borderWidth: scale(6),
    // borderColor: "white",
    elevation: 1,
  },
  normalPinBackground: { // not used
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C71C1C4D",
    width: verticalScale(100),
    height: verticalScale(100),
    borderRadius: verticalScale(50),
    zIndex: -1,
  },
  imgLocationStyle: {
    width: 30,
    height: 30
  },
  imgPinStyle: {
    width: 35,
    height: 35
  },
  topBoxRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flex: 1,
    width: '100%'
  },
  topBoxContentStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  topBoxLabelStyle: {
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 15,
    flex: 1,
  },
});

export const btnStartNowStyle = {
  color: Colors.skyBlue,
  style: style.btnStartNowStyle,
  textColor: Colors.white,
  textStyle: style.btnStartNowTextStyle,
};

export const pinSize = verticalScale(40);
export const homePinSize = verticalScale(30);
export const normalPinSize = verticalScale(24);
export const boundary = {
  x0: scale(10),
  x1: width - scale(10),
  y0: verticalScale(20),
  y1: verticalScale(104) + verticalScale(20),
};

const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.01; //Very high zoom level
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default style;
