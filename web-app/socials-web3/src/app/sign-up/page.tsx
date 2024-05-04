import { AccountProvider } from "@/contexts/AccountContext";
import SignUpScreen from "@/views/SignUp";

const SignUpPage = () => {
  return (
    <AccountProvider>
      <SignUpScreen />
    </AccountProvider>
  );
};

export default SignUpPage;
