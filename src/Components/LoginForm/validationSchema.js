import * as yup from "yup";

const userValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Invalid Login credentials")
    .label(),
  password: yup
    .string()
    .min(6)
    .required()
    .label("Password"),
});

const businessValidationSchema = yup.object().shape({
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
});

export {
  userValidationSchema,
  businessValidationSchema,
};
