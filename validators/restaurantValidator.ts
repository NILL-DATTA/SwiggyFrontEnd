import * as yup from "yup";

export const applyRestaurantScehma = yup.object().shape({
  phone: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
});

export const RestaurantOtpSchema = yup.object().shape({
  otp: yup.array().of(yup.string().required()).length(6).required(),
});

export const restaurantSchema = yup.object({
  ownerName: yup.string().required(),

  restaurantName: yup.string().required(),

  location: yup.string().required(),

  email: yup.string().email().required(),

  phone: yup.string().required(),

  whatsappNumber: yup.string().required(),

  workingDays: yup.array().min(1).required(),

  openingClosing: yup
    .object({
      sameForAllDays: yup.boolean().required(),

      slots: yup
        .array()
        .of(
          yup.object({
            open: yup.string().required(),
            close: yup.string().required(),
          }),
        )
        .required(),
    })
    .required(),
});

export const restaurantDoc = yup.object({
  outletType: yup.string().required(),

  pan: yup.string().required(),

  gstin: yup.string().required(),

  ifscCode: yup.string().required(),

  bankAccountNumber: yup.string().required(),

  fssaiNumber: yup.string().required(),
});
