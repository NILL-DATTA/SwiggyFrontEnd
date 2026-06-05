import * as yup from "yup";

export const Registerschema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .min(2, "Name too short")
    .required("Full name is required"),

  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email address is required"),

  mobile_Number: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password do not match")
    .required("Please confirm your password"),

  address: yup
    .string()
    .trim()
    .min(5, "Please provide a complete address")
    .required("Physical address is required"),
});

export const OtpSchema = yup.object().shape({
  otp: yup.string().trim().min(6, "Name too short").required("Otp is required"),
});

export const loginScehma = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email address is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});





