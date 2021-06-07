import { Layout } from '@/lib/components/Layout';
import { useAuth } from '@/lib/context/AuthContext';

const StatsPage = () => {
  const { viewer, error } = useAuth();

  return (
    <Layout>
      <h1>Hello Stats Page</h1>
    </Layout>
  );
};

export default StatsPage;
