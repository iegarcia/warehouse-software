export function errorMessage(code) {
  let message = "";
  switch (code) {
    case "auth/invalid-email" || "auth/wrong-password":
      message = "Wrong user or password";
      break;
    case "auth/wrong-password":
      message = "Wrong user or password";
      break;
    case "auth/user-not-found":
      message = "User does not exist";
      break;
    case "auth/email-already-in-use":
      message = "This email is already registered. Try sign in!";
      break;
    case "auth/weak-password":
      message = "Password should be at least 6 characters";
      break;
    default:
      message = "Oops! Something went wrong. Try again later!";
      break;
  }
  return message;
}
