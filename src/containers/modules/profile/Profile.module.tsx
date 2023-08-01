import { eApiRoutes, eHttpMethod } from 'common/enums';
import { AuthData, CreateUserDto, UserDataDto } from 'common/interfaces';
import { getErrorMessage } from 'common/utils';
import { Profile } from 'components';
import { useUserMutation } from 'hooks';
import useAuth from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ProfileModule = () => {
  const { data: userData, sendEmailVerification, getUser } = useAuth<AuthData<UserDataDto>>();

  const {
    register: registerCreateProfile,
    handleSubmit: handleCreateProfile,
    reset: resetCreateProfileFields,
    formState: { errors: createProfileErrors },
    clearErrors: clearCreateProfileErrors,
  } = useForm<CreateUserDto>();

  const {
    register: registerUpdateProfile,
    handleSubmit: handleUpdateProfile,
    reset: resetUpdateProfileFields,
    formState: { errors: updateProfileErrors },
    clearErrors: clearUpdateProfileErrors,
  } = useForm<UserDataDto>({
    defaultValues: { ...userData?.user },
  });

  const onSendEmailVerification = () => {
    const user = getUser();
    if (user) {
      sendEmailVerification({ user, toast: true });
    }
  };

  const { mutate: createUser, isLoading: isCreateUserLoading } = useUserMutation({
    queryConfig: {
      queryOptions: {
        onSuccessFn: () => {
          resetCreateProfileFields();
          clearCreateProfileErrors();
        },
        onError(error) {
          toast.error(getErrorMessage(error));
        },
      },
    },
  });

  const { mutate: updateUser, isLoading: isUpdateUserLoading } = useUserMutation({
    httpConfig: {
      methode: eHttpMethod.PATCH,
    },
    queryConfig: {
      queryUrl: eApiRoutes.SELF.split('/')[1],
      queryOptions: {
        onSuccessFn: () => {
          resetUpdateProfileFields();
          clearUpdateProfileErrors();
        },
        onError(error) {
          toast.error(getErrorMessage(error));
        },
      },
    },
  });

  const onHandleCreateProfile = handleCreateProfile(data => {
    createUser(data);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onHandleUpdateProfile = handleUpdateProfile((data: UserDataDto | any) => {
    delete data.profile;
    const filterData = Object.keys(data).map(key => {
      if (data[key] === undefined || data[key] === '') {
        delete data[key];
      }
    });
    updateUser(filterData);
  });

  return (
    <Profile
      userData={userData}
      profile={{
        onSendEmailVerification,
        registerCreateProfile,
        onHandleCreateProfile,
        createProfileErrors,
        isCreateUserLoading,
        registerUpdateProfile,
        onHandleUpdateProfile,
        updateProfileErrors,
        isUpdateUserLoading,
      }}
    />
  );
};

export default ProfileModule;
