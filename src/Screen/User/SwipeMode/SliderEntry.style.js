import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "./style";
import { verticalScale, moderateScale, scale } from "../../../Utils/scaling";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

// const slideHeight = viewportHeight * 0.36;
const slideHeight = verticalScale(390);
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = verticalScale(10);

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    shadowColor: colors.black,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowRadius: verticalScale(6),
    elevation: IS_IOS ? 1 : 5,
    backgroundColor: "white",
    borderRadius: entryBorderRadius,
  },
  shadow: {
    backgroundColor: IS_IOS ? "white" : "transparent",
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: verticalScale(6) },
    shadowRadius: verticalScale(6),
    elevation: IS_IOS ? 1 : 5,
    borderRadius: entryBorderRadius,
    borderWidth: 0.4,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    resizeMode: "cover",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0
    // borderRadius: 0
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(5),
    backgroundColor: "white",
  },
  radiusMaskEven: {
    backgroundColor: colors.black,
  },
  dealInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingTop: 20 - entryBorderRadius,
    paddingTop: verticalScale(10) - entryBorderRadius,
    paddingBottom: verticalScale(15),
    paddingHorizontal: scale(15),
    backgroundColor: "white",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  dealLogoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dealLogoWrapper: {
    width: verticalScale(35),
    height: verticalScale(35),
    borderRadius: verticalScale(17.5),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  dealLogo: {
    width: verticalScale(37),
    height: verticalScale(37),
    // resizeMode: "cover",
  },
  dealBranch: {
    marginTop: verticalScale(3),
    fontSize: moderateScale(10),
    width: 80,
    textAlign: 'center',
    color: "#6E6969",
  },
  dealTextContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: scale(15),
  },
  subtitle: {
    color: "#6E6969",
    fontSize: moderateScale(12),
  },
  features: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  featureIcons: {
    width: scale(10),
    height: verticalScale(10),
  },
  dealPerformanceContainer: {
    marginTop: verticalScale(10),
    flexDirection: "row",
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  likeIcon: {
    fontSize: moderateScale(12),
    color: "#5F92F3",
  },
  performanceText: {
    marginLeft: scale(5),
    fontSize: moderateScale(12),
    color: "#6E6969",
  },
  watchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  watchIcon: {
    fontSize: moderateScale(7),
    color: "#000",
  },
});
