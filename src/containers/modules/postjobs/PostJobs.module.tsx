import { CreateJobDto } from 'common/interfaces';
import { PostJobs } from 'components';
import { useJobsMutation } from 'hooks';
import { SubmitHandler, useForm } from 'react-hook-form';

const PostJobsModule = () => {
  const {
    register: registerCreateJob,
    handleSubmit: handleCreateJob,
    setValue: setCreateJobValue,
    getValues: getCreateJobValue,
    clearErrors: clearCreatedJobErros,
    reset: resetCreatedJob,
    formState: { errors: CreateJobErrors },
  } = useForm<CreateJobDto>();

  const { mutate: createJob, isLoading: isCreateJobLoading } = useJobsMutation<CreateJobDto>();

  const onCreateJob: SubmitHandler<CreateJobDto> = (jobData) => {
    createJob(jobData);
  };

  return (
    <PostJobs
      createJob={{
        register: registerCreateJob,
        handleSubmit: handleCreateJob,
        setValue: setCreateJobValue,
        getValues: getCreateJobValue,
        clearErrors: clearCreatedJobErros,
        reset: resetCreatedJob,
        errors: CreateJobErrors,
        onCreateJob: onCreateJob,
        isLoading: isCreateJobLoading,
      }}
    />
  );
};

export default PostJobsModule;
