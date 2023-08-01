import { eApiRoutes, eHttpMethod } from 'common/enums';
import { AuthData, ExperienceDto, UserDataDto } from 'common/interfaces';
import { EXPERIENCE_CREATED_SUCCESSFULLY, EXPERIENCE_DELETED_SUCCESSFULLY } from 'common/labels';
import { Experiences } from 'components';
import { useExperiencesMutation, useUserQuery } from 'hooks';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const ExperiencesModule = () => {
  const queryClient = useQueryClient();
  const [toDeteleExperienceId, setToDeleteExperienceId] = useState<number | null | undefined>(undefined);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [hasEndingDate, setHasEndingDate] = useState<boolean>(true);

  const {
    register: registerCreateExperience,
    handleSubmit: handleCreateExperience,
    setValue: setCreateExperienceValue,
    getValues: getCreateExperienceValue,
    clearErrors: clearCreatedExperienceErros,
    reset: resetCreatedExperience,
    formState: { errors: CreateExperienceErrors },
  } = useForm<ExperienceDto>();

  const { data: userData } = useAuth<AuthData<UserDataDto>>();
  const { data: userExperiences, isLoading } = useUserQuery<ExperienceDto>({
    queryConfig: {
      queryUrl: `${userData?.user?.userId}/experiences?page=1&limit=20`,
      queryOptions: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSuccessFn() {},
        onError(err: any) {
          toast.error(err?.message);
        },
      },
    },
  });

  const { mutate: createExperience, isLoading: isCreateExperienceLoading } = useExperiencesMutation({
    queryConfig: {
      queryOptions: {
        onSuccessFn(data) {
          queryClient.invalidateQueries(`${eApiRoutes.USERS}/experiences?page=1&limit=20`);
          toast.success(EXPERIENCE_CREATED_SUCCESSFULLY);
          setShowAddModal(false);
          setHasEndingDate(true);
          clearCreatedExperienceErros();
          resetCreatedExperience();
        },
        onError(err: any) {
          toast.error(err?.message);
        },
      },
    },
  });

  const onCreateExperience: SubmitHandler<ExperienceDto> = (experienceData) => {
    createExperience({
      ...experienceData,
      endingDate: getCreateExperienceValue('endingDate') ? experienceData.endingDate : null,
    });
  };

  const { mutate: deleteExperience, isLoading: isDeleteExperienceLoading } = useExperiencesMutation({
    queryConfig: {
      queryUrl: toDeteleExperienceId?.toString(),
      queryOptions: {
        onSuccessFn(data) {
          queryClient.invalidateQueries(`${eApiRoutes.USERS}/experiences?page=1&limit=20`);
          toast.success(EXPERIENCE_DELETED_SUCCESSFULLY);
          setShowDeleteModal(false);
        },
        onError(err: any) {
          toast.error(err?.message);
        },
      },
    },
    httpConfig: {
      methode: eHttpMethod.DELETE,
    },
  });

  return (
    <Experiences
      experiencesData={{
        experiences: userExperiences,
        isLoading: isLoading,
      }}
      deleteExperience={{
        setToDeleteExperienceId: setToDeleteExperienceId,
        deleteExperience: deleteExperience,
        isLoading: isDeleteExperienceLoading,
        toDeteleExperienceId: toDeteleExperienceId,
        showModal: showDeleteModal,
        setShowModal: setShowDeleteModal,
      }}
      createExperience={{
        onCreateExperience: onCreateExperience,
        registerCreateExperience: registerCreateExperience,
        handleCreateExperience: handleCreateExperience,
        setValue: setCreateExperienceValue,
        CreateExperienceErrors: CreateExperienceErrors,
        reset: resetCreatedExperience,
        clearErros: clearCreatedExperienceErros,
        isLoading: isCreateExperienceLoading,
        showModal: showAddModal,
        setShowModal: setShowAddModal,
        hasEndingDate: hasEndingDate,
        setHasEndingDate: setHasEndingDate,
      }}
    />
  );
};

export default ExperiencesModule;
