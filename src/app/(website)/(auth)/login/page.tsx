import AuthUIProvider from "../_components/provider/AuthUIProvider";
import { LoginForm } from "./_components/login-form";

const Page = () => {
  return (
    <AuthUIProvider sidebarImage="https://i.postimg.cc/X7ywkKYd/e0ba46c9845debdbdfbf19f3d80aba56-1.png">
      <LoginForm />
    </AuthUIProvider>
  );
};

export default Page;
