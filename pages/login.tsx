import { LogInSection } from "@/lib/components/LogInSection";
import { ClientOnly } from "@/lib/components/ClientOnly";
const Login = () => {
  return (
    <ClientOnly>
      <LogInSection />
    </ClientOnly>
  );
};

export default Login;
