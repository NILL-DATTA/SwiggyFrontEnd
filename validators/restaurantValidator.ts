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



export const menuSchema = yup.object({
  itemName: yup.string().required("Item name is required"),

  description: yup.string().required("Description is required"),

  foodType: yup
    .string()
    .oneOf(["veg", "non-veg"])
    .required("Food type is required"),

  category: yup.string().required("Category is required"),

  image: yup.mixed().nullable(),

  basePrice: yup
    .number()
    .typeError("Base price must be a number")
    .required("Base price is required")
    .positive(),

  discountPrice: yup
    .number()
    .typeError("Discount price must be a number")
    .nullable(),

  gst: yup
    .number()
    .typeError("GST must be a number")
    .required("GST is required"),

  variants: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required(),
        price: yup.number().required(),
      })
    )
    .min(1, "At least one variant is required"),

  addons: yup.array().of(
    yup.object({
      name: yup.string().required(),
      price: yup.number().required(),
    })
  ),

  tags: yup.array().of(yup.string()),

  isAvailable: yup.boolean().required(),

  enablePreOrder: yup.boolean().required(),

  allowSpecialInstructions: yup.boolean().required(),

  eligibleForOffers: yup.boolean().required(),

  preparationTime: yup.object({
    min: yup.number().required(),
    max: yup.number().required(),
  }),
});

export const contractSchema = yup.object({
  fullName: yup
    .string()
    .required("Authorized signatory name is required"),

  designation: yup
    .string()
    .required("Designation is required"),

  agreed: yup
    .boolean()
    .oneOf([true], "You must accept all terms to proceed"),
});