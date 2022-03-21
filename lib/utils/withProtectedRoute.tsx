import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context";
import { GenericLoadingScreen } from "@/lib/components";

export const withProtectedRoute = (WrappedComponent) => {
  const AuthenticatedComponent = () => {
    const Router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <GenericLoadingScreen />;

    useEffect(() => {
      if (!isAuthenticated) {
        Router.replace("/login");
      }
    }, [isAuthenticated]);

    return <WrappedComponent />;
  };
  return AuthenticatedComponent;
};
