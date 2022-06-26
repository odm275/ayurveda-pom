import { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/lib/hooks";
import { useEffectWithoutOnMount } from "../hooks/useEffectWithoutOnMount";

export const withProtectedRoute = (WrappedComponent: FunctionComponent) => {
  const AuthenticatedComponent = (props: any) => {
    const Router = useRouter();
    const { user } = useUser();

    useEffectWithoutOnMount(() => {
      console.log("check", !user);
      if (!user) {
        Router.replace("/login");
      }
    }, [user, Router]);

    return <WrappedComponent {...props} />;
  };
  return AuthenticatedComponent;
};
