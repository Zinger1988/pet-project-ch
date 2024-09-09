// prettier-ignore
export const errorsMap: Record<string, any> = {
  "auth/invalid-credential": "Invalid login or password",
  "auth/too-many-requests": "Too many login attempts, please try again later or use the password recovery option.",
  "auth/invalid-custom-token": "Invalid access token",
  "auth/email-already-in-use": "The user with this email is already registered",
  unknown: "An unexpected error occurred. Please try again later",
};
