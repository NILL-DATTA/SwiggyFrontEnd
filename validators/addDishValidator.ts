import * as yup from "yup";

export const foodSchema = yup.object({
  restaurantId: yup.string().required("Restaurant ID is required"),
  itemName: yup.string().required("Item name is required"),
  description: yup.string().optional(),

  foodType: yup.string().required(),
  category: yup.string().required(),
  cuisine: yup.string().required(),

  basePrice: yup
    .number()
    .typeError("Base price must be a number")
    .positive("Must be greater than 0")
    .required("Base price required"),

  discountPrice: yup
    .number()
    .typeError("Discount price must be a number")
    .nullable()
    .transform((v, o) => (o === "" ? null : v))
    .lessThan(yup.ref("basePrice"), "Must be less than base price"),

  gst: yup.number().min(0).max(100).required(),

  preparationTime: yup
    .number()
    .typeError("Must be a number")
    .positive()
    .required(),

  isAvailable: yup.boolean(),
  isRecommended: yup.boolean(),
  isVeg: yup.boolean(),
});