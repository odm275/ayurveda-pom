import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context";
import { GenericLoadingScreen } from "@/lib/components";

export const withProtectedRoute = (WrappedComponent) => {
  const AuthenticatedComponent = () => {
    const Router = useRouter();
    const { viewer, isAuthenticated, loading } = useAuth();

    if (loading) return <GenericLoadingScreen />;

    useEffect(() => {
      if (!isAuthenticated) {
        Router.replace("/login");
      }
    }, []);

    return <WrappedComponent />;
  };
  return AuthenticatedComponent;
};
