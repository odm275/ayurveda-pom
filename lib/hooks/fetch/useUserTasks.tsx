import { graphqlClient } from "@/apollo/graphql-request-client";
import { ViewerCurrentTasksDocument } from "@/lib/generated";
import { queryKeys } from "@/lib/utils";
import { useQuery } from "react-query";
import { useUser } from "./useUser";

async function getViewerCurrentTasks(signal: AbortSignal) {
  const data = await graphqlClient.request({
    document: ViewerCurrentTasksDocument,
    signal
  });
  return data.viewerCurrentTasks;
}

export function useUserTasks() {
  const { user } = useUser();

  const { data: tasks = [] } = useQuery(
    queryKeys.viewerCurrentTasks,
    ({ signal }) => getViewerCurrentTasks(signal),
    {
      enabled: !!user
    }
  );
  return { tasks };
}
