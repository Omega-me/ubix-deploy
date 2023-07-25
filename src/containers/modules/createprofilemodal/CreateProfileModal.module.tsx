import { UserDataDto, CreateUserDto, AuthDataDto } from 'common/interfaces';
import { CreateProfileModal } from 'components';
import { useUserMutation } from 'hooks';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateProfileModalModule = () => {
  const navigate = useNavigate();
  const { data: authData, signOut, getUser, refreshUser, isSuccess } = useAuth<AuthDataDto<UserDataDto>>();

  const { mutate: createUser } = useUserMutation<CreateUserDto>({
    queryConfig: {
      queryOptions: {
        onSuccessFn() {
          refreshUser();
          navigate('/');
        },
        onError(e) {
          console.log(e);
        },
      },
    },
  });

  return <CreateProfileModal user={authData?.user} email={getUser()?.email as any} createUser={createUser} signout={signOut} isSuccess={isSuccess} />;
};

export default CreateProfileModalModule;
