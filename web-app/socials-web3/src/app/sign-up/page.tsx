import { AccountProvider } from "@/contexts/AccountContext";
import SignUpScreen from "@/components/views/SignUp";

const SignUpPage = () => {
  return (
    <AccountProvider>
      <SignUpScreen />
    </AccountProvider>
  );
};

export default SignUpPage;
