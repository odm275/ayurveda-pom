import * as d3 from 'd3';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Flex, Button, Spinner } from '@chakra-ui/react';
import AppHeaderSkeleton from '@/lib/components/AppHeaderSkeleton';
import { Layout } from '@/lib/components/Layout';
import { Timeline } from '@/lib/components/Timeline';
import { useAuth } from '@/lib/context/AuthContext';
import ErrorBanner from '@/lib/components/ErrorBanner';
import { pomDataFormatter } from '@/lib/utils/data_viz';
import { PomEntry } from '@/lib/types';

dayjs.extend(isBetween);

const parseDate = d3.timeParse('%m-%d-%Y');
const dateAccessor = (d: PomEntry) => parseDate(d.date);
const countAccessor = (d: PomEntry) => d.count;

const StatsPage = () => {
  const { viewer, setViewer, error } = useAuth();
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

  const data = viewer.pomData.result.reduce(pomDataFormatter, []) as PomEntry[];

  const handleOnClick = ({ numOfMonths }) => (e) => {
    e.preventDefault();

    const customRangeData = viewer.pomData.result.filter((entry) => {
      // count from today to a month back
      const entryDate = dayjs(entry.date).startOf('day');
      const today = dayjs().startOf('day');
      const monthsAgo = today.subtract(numOfMonths, 'month');
      // We wanna filter dates that fall in the range between (today, monthsAgo)
      const isInDateRange = entryDate.isBetween(monthsAgo, today);
      return isInDateRange;
    });
  };

  const buttonsSection = (
    <Flex justifyContent="space-between">
      <Button flexGrow={1} onClick={handleOnClick({ numOfMonths: 1 })}>
        1 month
      </Button>
      <Button flexGrow={1} onClick={handleOnClick({ numOfMonths: 2 })}>
        2 month
      </Button>
      <Button flexGrow={1} onClick={handleOnClick({ numOfMonths: 3 })}>
        3 month
      </Button>
    </Flex>
  );

  return (
    <Layout>
      {logInErrorBannerElement}

      <h1>Productivity Stats</h1>
      {buttonsSection}

      <Timeline
        data={data}
        xAccessor={dateAccessor}
        yAccessor={countAccessor}
      />
    </Layout>
  );
};

export default StatsPage;
