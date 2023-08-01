import { eApiRoutes, eHttpMethod, eRoutes } from 'common/enums';
import { AuthData, CreateUserDto, UserDataDto } from 'common/interfaces';
import { getErrorMessage } from 'common/utils';
import { Profile } from 'components';
import { useUserMutation } from 'hooks';
import useAuth from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileModule = () => {
  const { data: userData, sendEmailVerification, getUser } = useAuth<AuthData<UserDataDto>>();
  const navigate = useNavigate();

  const {
    register: registerCreateProfile,
    handleSubmit: handleCreateProfile,
    reset: resetCreateProfileFields,
    formState: { errors: createProfileErrors },
    clearErrors: clearCreateProfileErrors,
  } = useForm<CreateUserDto>({
    defaultValues: {
      email: userData?.email,
      phoneNumber: userData?.phone,
    },
  });

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
          navigate(eRoutes.PROFILE);
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
          navigate(eRoutes.PROFILE);
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
    Object.keys(data).map(key => {
      if (data[key] === undefined || data[key] === null || data[key] === '') {
        delete data[key];
      }
    });

    updateUser(data);
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
