import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context";
import { useEffectWithoutOnMount } from "../hooks/useEffectWithoutOnMount";

export const withProtectedRoute = (WrappedComponent: FunctionComponent) => {
  const AuthenticatedComponent = (props: unknown) => {
    const Router = useRouter();
    const { loading, isAuthenticated } = useAuth();
    if (loading) return null;

    useEffectWithoutOnMount(() => {
      if (!isAuthenticated) {
        Router.replace("/login");
      }
    }, [isAuthenticated, Router]);

    return <WrappedComponent {...props} />;
  };
  return AuthenticatedComponent;
};
