import * as yup from "yup";

export default () => {
  let rules = {
    description: yup
      .string()
      .required()
      .label("Details"),
  };

  return yup.object().shape(rules);
};
