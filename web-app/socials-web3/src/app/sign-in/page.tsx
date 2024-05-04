import { AccountProvider } from "@/contexts/AccountContext";
import SignInScreen from "@/views/SignIn";

const SignInPage = () => {
  return (
    <AccountProvider>
      <SignInScreen />
    </AccountProvider>
  );
};

export default SignInPage;
