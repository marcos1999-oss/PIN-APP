import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "./style";
import { verticalScale, scale } from "../../Utils/scaling";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = verticalScale(130);
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = verticalScale(10);

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    // paddingHorizontal: itemHorizontalMargin,
    paddingLeft: scale(28),
    paddingBottom: verticalScale(5), // needed for shadow
  },
  shadow: {
    position: "absolute",
    top: 0,
    // left: itemHorizontalMargin,
    left: scale(28),
    right: 0,
    // right: itemHorizontalMargin,
    bottom: verticalScale(5),
    shadowColor: colors.black,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: verticalScale(3) },
    shadowRadius: 3,
    elevation: 1,
    borderRadius: entryBorderRadius,
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  imageContainerEven: {
    backgroundColor: colors.black,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderRadius: entryBorderRadius,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
  },
  // image's border radius is buggy on iOS; let's hack it!
  // radiusMask: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: entryBorderRadius,
  //   backgroundColor: 'white',
  // },
  // radiusMaskEven: {
  //   backgroundColor: colors.black,
  // },
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius,
  },
  textContainerEven: {
    backgroundColor: colors.black,
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  titleEven: {
    color: "white",
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: "italic",
  },
  subtitleEven: {
    color: "rgba(255, 255, 255, 0.7)",
  },
});
