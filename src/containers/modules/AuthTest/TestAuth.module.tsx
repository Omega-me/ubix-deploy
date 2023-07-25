import { eUserType } from 'common/enums';
import { CreateUserDto } from 'common/interfaces';
import { ConfirmationResult, User } from 'firebase/auth';
import { useUserMutation } from 'hooks';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import {
  getPhoneConfirmationCodeService,
  sendEmailVerificationService,
  sendPasswordResetEmailService,
  signinWithGoogleService,
  siginWithPhoneNumberService,
  getCurrentUserService,
} from 'services';

const TestAuthModule = () => {
  const [fullname, setFullname] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState('');
  const [postCode, setPostCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState<ConfirmationResult | undefined>(undefined);
  const [signinVal, setSiginVal] = useState(true);
  const { signin, getUser, refreshUser, signOut, updateEmail } = useAuth();

  const handleLoginWithEmail = async () => {
    signin({ data: { email, password } });
  };

  const handleLoginWithPhoneNumber = async () => {
    const confirmation = await getPhoneConfirmationCodeService(phone);
    console.log(confirmation);
    setConfirmation(confirmation);
  };

  const handleVerifyOtp = async () => {
    const token = await siginWithPhoneNumberService({ otp, confirmation: confirmation as ConfirmationResult });
    console.log(token);
  };

  const handleGoogleLogin = async () => {
    const data = await signinWithGoogleService();
    console.log(data);
  };

  const handleSendEmailVerification = async () => {
    const data = await sendEmailVerificationService({ user: getUser() as User });
    console.log(data);
  };

  const handleUpdateEmail = async () => {
    updateEmail({ user: getUser() as User, newEmail: 'test31@gmail.com' });
  };

  const handlePasswordReset = async () => {
    const data = await sendPasswordResetEmailService({ email });
    console.log(data);
  };

  const handleGetUser = () => {
    const user = getCurrentUserService();
    console.log(user);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const { mutate } = useUserMutation<CreateUserDto>({
    queryConfig: {
      queryOptions: {
        onSuccessFn(data) {
          console.log(data);
        },
        onError(error) {
          console.log(error);
        },
      },
    },
  });

  return (
    <>
      <label htmlFor="signin">Sigin</label>
      <input
        id="signin"
        type="checkbox"
        checked={signinVal}
        onChange={() => {
          setSiginVal(!signinVal);
          console.log(signinVal);
        }}
      />
      {signinVal ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <div>
              <label htmlFor="">email</label>
              <input onChange={e => setEmail(e.target.value)} style={{ border: '2px solid grey' }} type="text" />
            </div>
            <div>
              <label htmlFor="">password</label>
              <input onChange={e => setPassword(e.target.value)} style={{ border: '2px solid grey' }} type="text" />
            </div>
            <input type="button" value={'login with email'} onClick={handleLoginWithEmail} />
            <hr />

            <div>
              <div>
                <label htmlFor="">phone</label>
                <input onChange={e => setPhone(e.target.value)} style={{ border: '2px solid grey' }} type="text" />
              </div>
              <div id="recaptcha"></div>
              <input type="button" value={'login with phone'} onClick={handleLoginWithPhoneNumber} />
            </div>
            {confirmation?.verificationId && (
              <>
                <div>
                  <label htmlFor="">Otp</label>
                  <input onChange={e => setOtp(e.target.value)} style={{ border: '2px solid grey' }} type="text" />
                </div>
                <input onClick={handleVerifyOtp} type="button" value={'Verify Otp'} />
              </>
            )}

            <hr />
            <input onClick={handleGoogleLogin} value={'Login with google'} type="button" />

            <hr />
            <input onClick={handleSendEmailVerification} value={'Send email verification'} type="button" />

            <hr />
            <input onClick={handleUpdateEmail} value={'Change Email'} type="button" />

            <hr />
            <input onClick={handlePasswordReset} value={'Password reset'} type="button" />

            <hr />
            <input onClick={handleGetUser} value={'Get current user'} type="button" />

            <hr />
            <input onClick={handleSignOut} value={'Sign Out'} type="button" />

            <hr />
            <input onClick={refreshUser} value={'Refresh User'} type="button" />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <div>
              <label htmlFor="">email</label>
              <input onChange={e => setEmail(e.target.value)} value={email} style={{ border: '2px solid grey' }} type="text" />
            </div>
            <div>
              <label htmlFor="">password</label>
              <input onChange={e => setPassword(e.target.value)} value={password} style={{ border: '2px solid grey' }} type="text" />
            </div>
            <div>
              <label htmlFor="">fullname</label>
              <input onChange={e => setFullname(e.target.value)} value={fullname} style={{ border: '2px solid grey' }} type="text" />
            </div>
            <div>
              <label htmlFor="">jobRole</label>
              <input onChange={e => setJobRole(e.target.value)} value={jobRole} style={{ border: '2px solid grey' }} type="text" />
            </div>
            <div>
              <label htmlFor="">birthDay</label>
              <input onChange={e => setBirthDay(e.target.value)} value={birthDay} style={{ border: '2px solid grey' }} type="date" />
            </div>
            <div>
              <label htmlFor="">gender</label>
              <select style={{ border: '2px solid grey' }} onChange={e => setGender(e.target.value)} name="" id="">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="">phone</label>
              <input onChange={e => setPhone(e.target.value)} value={phone} style={{ border: '2px solid grey' }} type="tel" />
            </div>
            <div>
              <label htmlFor="">postCode</label>
              <input onChange={e => setPostCode(e.target.value)} value={postCode} style={{ border: '2px solid grey' }} type="text" />
            </div>
            <input
              type="button"
              value={'Sigup with email'}
              onClick={() =>
                mutate({
                  fullName: fullname,
                  email,
                  phoneNumber: phone,
                  birthday: birthDay,
                  postCode: postCode,
                  gender,
                  type: eUserType.INDIVIDUAL,
                  role: jobRole,
                })
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TestAuthModule;
