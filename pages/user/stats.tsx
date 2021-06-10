import { Layout } from '@/lib/components/Layout';
import { Timeline } from '@/lib/components/Timeline';
import { useAuth } from '@/lib/context/AuthContext';
import d3 from 'd3';

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d) => parseDate(d.date);
const countAccessor = (d) => d.count;

const StatsPage = () => {
  const { viewer, error } = useAuth();
  console.log('stats page viewer', viewer);

  return (
    <Layout>
      <h1>Productivity Stats</h1>
      <Timeline
        data={viewer.pomData}
        xAccessor={dateAccessor}
        yAccessor={countAccessor}
      />
    </Layout>
  );
};

export default StatsPage;
