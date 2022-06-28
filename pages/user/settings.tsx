import { AppLayout, SettingsSection } from "@/lib/components";
import { useUpdateViewerSettingsMutation } from "@/lib/generated";
import { withProtectedRoute } from "@/lib/utils";
import { useUser } from "@/lib/hooks";

const Settings = () => {
  const { user } = useUser();

  return <AppLayout>{user && <SettingsSection />}</AppLayout>;
};

export default withProtectedRoute(Settings);
