import { UserDetailDataDto } from 'common/interfaces';
import { CandidatesListing } from 'components';
import { useUserQuery } from 'hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CandidatesListingModule = () => {
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>('near-me');

  const { data: candidates, isLoading } = useUserQuery<UserDetailDataDto>({
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

  const { data: candidatesForPages } = useUserQuery<UserDetailDataDto>({
    queryConfig: {
      queryString: `page=1&limit=1000&category=${category}`,
    },
  });

  const pages: number[] = Array.from({ length: Math.round(candidatesForPages?.length / 10) }, (_, i) => i + 1);

  return (
    <CandidatesListing
      candidatesProps={{
        candidates: candidates,
        setPage: setPage,
        pages: pages,
        page: page,
        isLoading: isLoading,
      }}
      setCategory={setCategory}
    />
  );
};

export default CandidatesListingModule;
