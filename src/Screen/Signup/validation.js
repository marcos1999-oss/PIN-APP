import * as yup from "yup";

const userValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .label("Email"),
  password: yup
    .string()
    .required()
    .min(6)
    .label("Password"),
  cpassword: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref("password")], "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .label("Repeat Password"),
  username: yup
    .string()
    .required()
    .min(5)
    .label("Username"),
  dob: yup
    .string()
    .required()
    .label("Birthday"),
});

const businessValidationSchema = yup.object().shape({
    cname: yup
      .string()
      .min(5)
      .required()
      .label("Company Name"),
    email: yup
      .string()
      .required()
      .email()
      .label("Email"),
    password: yup
      .string()
      .required()
      .min(6)
      .label("Password"),
    cpassword: yup
      .string()
      .required()
      .min(6)
      .oneOf([yup.ref("password")], "Passwords must match", function(value) {
        return this.parent.password === value;
      })
      .label("Repeat Password"),
  company_phone_number: yup
    .string()
    .required()
    .label("Phone Number"),
});

export {
  userValidationSchema,
  businessValidationSchema,
};
