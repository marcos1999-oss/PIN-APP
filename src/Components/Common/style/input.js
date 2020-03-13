import React from "react";

import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "../../../Utils/scaling";

export default StyleSheet.create({
  input: {
    fontSize: moderateScale(12),
  },
  m_error_msg: {
    color: "#FF0000",
    fontSize: moderateScale(10),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
  },
});
