import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context";

export const withProtectedRoute = (WrappedComponent) => {
  const AuthenticatedComponent = () => {
    const Router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        Router.replace("/login");
      }
    }, []);

    return <WrappedComponent />;
  };
  return AuthenticatedComponent;
};
