import { JobDataDto } from 'common/interfaces';
import { JobListing } from 'components';
import { useJobsQuery } from 'hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

const JobListingModule = () => {
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>('near-me');

  const { data: jobs, isLoading } = useJobsQuery<JobDataDto>({
    queryConfig: {
      queryString: `page=${page}&limit=10&category=${category}`,
      queryOptions: {
        onSuccessFn() {
          console.log('success');
        },
        onError(err) {
          toast.error(err?.message);
        },
      },
    },
  });

  const { data: jobsForPages } = useJobsQuery<JobDataDto>({
    queryConfig: {
      queryString: `page=1&limit=1000&category=near-me`,
    },
  });

  const pages: number[] = Array.from({ length: Math.round(jobsForPages?.length / 10) }, (_, i) => i + 1);

  return <JobListing jobsProps={{ jobs: jobs, setPage: setPage, pages: pages, page: page, isLoading: isLoading }} setCategory={setCategory} />;
};

export default JobListingModule;
