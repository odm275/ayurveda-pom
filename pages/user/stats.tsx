import { Flex, Button, Spinner } from '@chakra-ui/react';
import * as d3 from 'd3';
import AppHeaderSkeleton from '@/lib/components/AppHeaderSkeleton';
import { Layout } from '@/lib/components/Layout';
import { Timeline } from '@/lib/components/Timeline';
import { useAuth } from '@/lib/context/AuthContext';
import ErrorBanner from '@/lib/components/ErrorBanner';

const parseDate = d3.timeParse('%m-%d-%Y');
const dateAccessor = (d) => parseDate(d.date);
const countAccessor = (d) => d.count;

const StatsPage = () => {
  const { viewer, error } = useAuth();
  if (!viewer.didRequest && !error) {
    return (
      <Flex flexDir="column" p={3}>
        <AppHeaderSkeleton />
        <Flex justifyContent="center">
          <Spinner
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Flex>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We aren't able to verify if you were logged in. Please try again later!" />
  ) : null;
  return (
    <Layout>
      {logInErrorBannerElement}

      <h1>Productivity Stats</h1>
      <Timeline
        data={viewer.pomData.result}
        xAccessor={dateAccessor}
        yAccessor={countAccessor}
      />
    </Layout>
  );
};

export default StatsPage;
