
export interface RegisterFormData {
  full_name: string;
  email: string;
  address: string;
  mobile_Number: string;
  password: string;
  confirm_password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface OtpFormData {
  userId: string;
  otp: string;
  // mobile_Number: string;
}

export interface Props {
  children: React.ReactNode;
}

export interface SuccessFun {
  onSuccess: (data: RegisterFormData) => void;
}

export interface SuccessFunlogin {
  onSuccess: (data: LoginFormData) => void;
}

export interface SuccessFunotp {
  onSuccess: (data: OtpFormData) => void;
  phone: string;
}

export interface OtpInputData {
  otp: string;
}

export interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
  token: string | null;
  role: string | null;
}



