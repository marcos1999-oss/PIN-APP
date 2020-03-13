import React from "react";
import { Text } from "react-native";
import { Item } from "native-base";
import DatePicker from "react-native-datepicker";
import style from "./style/input";
import { moderateScale, verticalScale, scale } from "../../Utils/scaling";

const customStyles = {
  placeholderText: {
    fontSize: moderateScale(12),
    color: "#000",
  },
  dateText: {
    fontSize: moderateScale(12),
    color: "#000",
  },
  dateInput: {
    borderColor: "rgba(255,255,255,0.4)",
    borderWidth: 0,
    borderBottomWidth: 1,
    alignItems: "flex-start",
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(5),
  },
};

export default ({ form, formKey, ref, setRef, containerStyle, ...rest }) => {
  return (
    <Item style={containerStyle}>
      <DatePicker
        mode="date"
        // date={form.values.dob}
        date={form.values[formKey.toString()]}
        format="DD MMMM YYYY"
        showIcon={false}
        style={{ flexGrow: 1, ...rest.style }}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{ ...customStyles, ...rest.customStyles }}
        onDateChange={(date) => {
          form.setFieldValue(formKey, date);
        }}
        {...rest}
      />
      <Text style={style.m_error_msg}>{form.errors[formKey.toString()]}</Text>
    </Item>
  );
};
