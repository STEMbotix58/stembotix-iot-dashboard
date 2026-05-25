import * as yup from "yup";

export const deviceSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  location: yup.string().required(),
});
