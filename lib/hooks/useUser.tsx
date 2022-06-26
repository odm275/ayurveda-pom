import { useQuery, useQueryClient } from "react-query";
import { MeDocument, MeQuery, User } from "../generated";
import { graphqlClient } from "@/apollo/graphql-request-client";
import { queryKeys } from "@/lib/utils";
interface UseUser {
  user: User | null;
  updateUser: (user: unknown) => void;
  clearUser: () => void;
}

async function getUser(): Promise<unknown | null> {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  const data = await graphqlClient.request(MeDocument);
  return data.me;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const { data: user = null } = useQuery(queryKeys.me, getUser, {
    onSuccess: (recieved: User | null) => {
      if (!recieved) {
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", recieved.token);
      }
    }
  });

  // meant to be called from useAuth
  function updateUser(newUser: unknown): void {
    queryClient.setQueryData(queryKeys.me, newUser);
  }
  // meant to be called from useAuth
  function clearUser() {
    queryClient.setQueryData(queryKeys.me, null);
    // ToDo: Remove queries that depend on me(user)
    queryClient.removeQueries(queryKeys.viewerCurrentTasks);
  }
  return { user, updateUser, clearUser };
}
