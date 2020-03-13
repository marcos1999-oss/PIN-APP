import * as yup from "yup";
import { phoneRegExp } from "../../Utils/yup";

export default (userForm) => {
  let rules = {
    email: yup
      .string()
      .email()
      .required()
      .label("Email"),
    password: yup
      .string()
      .min(6)
      .required()
      .label("Password"),
    cpassword: yup
      .string()
      .min(6)
      .oneOf([yup.ref("password")], "Passwords must match", function(value) {
        return this.parent.password === value;
      })
      .required()
      .label("Repeat Password"),
  };
  if (userForm) {
    rules.username = yup
      .string()
      .min(5)
      .required()
      .label("Username");
    rules.dob = yup
      .string()
      .required()
      .label("Birthday");
  } else {
    rules.cname = yup
      .string()
      .min(5)
      .required()
      .label("Company Name");
    rules.phone = yup
      .string("Invalid Phone Number")
      .matches(phoneRegExp, "Phone number is not valid")
      .required()
      .label("Phone");
  }
  return yup.object().shape(rules);
};

export const changePasswordSchema = () => {
  let rules = {
    newPassword: yup
      .string()
      .min(6)
      .required()
      .label("New Password"),
    cNewPassword: yup
      .string()
      .min(6)
      .oneOf([yup.ref("newPassword")], "New passwords must match", function(
        value
      ) {
        return this.parent.newPassword === value;
      })
      .required()
      .label("Repeat Password"),
  };
  return yup.object().shape(rules);
};
