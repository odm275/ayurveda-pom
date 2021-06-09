import { Layout } from '@/lib/components/Layout';
import { useAuth } from '@/lib/context/AuthContext';
import d3 from 'd3';
const StatsPage = () => {
  const { viewer, error } = useAuth();
  console.log(viewer);
  return (
    <Layout>
      <h1>Hello Stats Page</h1>
    </Layout>
  );
};

export default StatsPage;
