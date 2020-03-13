import { StyleSheet } from "react-native";
import { verticalScale, scale, moderateScale } from "../../../Utils/scaling";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#B721FF",
  background2: "#21D4FD",
};

export const endedIconSize = verticalScale(100);

export default StyleSheet.create({
  endedContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    paddingTop: verticalScale(120),
  },
  endedText: {
    marginTop: verticalScale(20),
    fontFamily: "Helvetica",
    fontSize: moderateScale(14),
    textAlign: "center",
  },
  swiperContainer: {
    position: "relative",
    backgroundColor: "transparent",
    height: verticalScale(393.41),
    paddingHorizontal: scale(35),
    marginTop: verticalScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    // position: 'relative',
    top: 0,
    left: scale(20),
    width: "100%",
    height: "100%",
  },
  //   card: {
  //     // flex: 1,
  //     height: '90%',
  //     // position: 'relative',
  //     borderRadius: 4,
  //     borderWidth: 2,
  //     borderColor: '#E8E8E8',
  //     justifyContent: 'center',
  //     backgroundColor: 'white',
  //   },
  dislikeLabel: {
    backgroundColor: "transparent",
    borderColor: "#F40100",
    color: "#F40100",
    borderWidth: verticalScale(4),
  },
  likeLabel: {
    backgroundColor: "transparent",
    borderColor: "#3FC94F",
    color: "#3FC94F",
    borderWidth: verticalScale(4),
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    // paddingVertical: verticalScale(20)
  },
  exampleContainerLight: {
    // backgroundColor: 'white'
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleDark: {
    color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
  },
  slider: {
    marginTop: verticalScale(15),
    overflow: "visible", // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: scale(10), // for custom animation
  },
  paginationContainer: {
    paddingVertical: scale(8),
  },
  paginationDot: {
    width: scale(8),
    height: verticalScale(8),
    borderRadius: verticalScale(4),
    marginHorizontal: scale(8),
  },
  itemContainer: {
    flexDirection: "column",
    height: verticalScale(390),
    borderRadius: verticalScale(20),
    overflow: "hidden",
  },
  imageContainer: {
    height: verticalScale(325),
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    backgroundColor: "green",
  },
  buttonGroup: {
    marginTop: verticalScale(40),
    height: verticalScale(50),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-end",
  },
  actionButton: {
    height: "100%",
    width: scale(150),
    borderRadius: verticalScale(20),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: verticalScale(3), height: verticalScale(3) },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    textTransform: "uppercase",
    fontSize: moderateScale(16),
    color: "white",
    fontWeight: "bold",
  },
  distanceCircle: {
    position: "absolute",
    zIndex: 999,
    right: scale(-5),
    bottom: verticalScale(-15),
    backgroundColor: "#5F92F3",
    width: verticalScale(35),
    minWidth: verticalScale(35),
    height: verticalScale(35),
    minHeight: verticalScale(35),
    borderRadius: verticalScale(35) / 2,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  distanceText: {
    fontSize: moderateScale(9),
    color: "white",
    fontWeight: "bold",
  },
});
