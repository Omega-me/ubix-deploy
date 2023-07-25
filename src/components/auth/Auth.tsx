import React, { useState } from 'react';
import { Link, NavigateOptions, To, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TabPanel, Tabs } from 'react-tabs';
import { AuthDataDto, LoginUserDto } from 'common/interfaces';
import { AlertMessage, CostumText, Loading } from 'components';
import { eTextType } from 'common/enums';
import splashScreen from 'assets/images/background/SplashScreen.svg';
import { User, ActionCodeSettings } from 'firebase/auth';

interface AuthProps {
  useAuth: {
    signin: (config: { data: LoginUserDto; navigateUrl?: To | undefined; navigateOptions?: NavigateOptions | undefined }) => void;
    signup: (config: { data: LoginUserDto; navigateUrl?: To | undefined; navigateOptions?: NavigateOptions | undefined }) => void;
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    message: string;
    resetAuthState: () => void;
    data: AuthDataDto;
    sendPasswordResetEmail: (config: { email: string; actionCodeSettings?: ActionCodeSettings | undefined }) => Promise<void>;
    signinWithGoogle: (config: { navigateUrl?: To | undefined; navigateOptions?: NavigateOptions | undefined }) => void;
  };
}

const Auth: React.FC<AuthProps> = (props) => {
  const { useAuth } = props;
  const pathName = location.pathname.split('/')[1].toLowerCase();
  const navigate = useNavigate();

  const [logInError, setLoginError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: registerSignUp,
    handleSubmit: handleSignUp,
    reset: resetSignup,
    formState: { errors: signUpErrors },
    clearErrors: clearSignupErrors,
  } = useForm<LoginUserDto>();

  const {
    register: registerLogIn,
    handleSubmit: handleLogIn,
    reset: resetLogin,
    formState: { errors: logInErrors },
    clearErrors: clearLoginErrors,
  } = useForm<LoginUserDto>();

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPassword,
    reset: resetForgotPassword,
    formState: { errors: forgotPasswordErrors },
    clearErrors: clearForgotPasswordErrors,
  } = useForm<{ email: string }>();

  const onSignUp: SubmitHandler<LoginUserDto> = (signUpData) => {
    useAuth.signup({ data: signUpData });
    if (useAuth?.isSuccess) {
      resetLogin();
      clearSignupErrors();
    }
    if (useAuth?.isError) {
      setSignupError(true);
    }
  };
  const onSignIn: SubmitHandler<LoginUserDto> = (signInData) => {
    useAuth.signin({ data: signInData });
    if (useAuth?.isSuccess) {
      resetLogin();
      clearLoginErrors();
    }
    if (useAuth?.isError) {
      setLoginError(true);
    }
    if (useAuth?.data?.user) {
      navigate('/');
    }
  };

  const onForgotPassword: SubmitHandler<{ email: string }> = (email) => {
    useAuth?.sendPasswordResetEmail(email);
    resetForgotPassword();
    if (useAuth?.isError) {
      setForgotPasswordError(true);
      setForgotPasswordSuccess(false);
    }
    if (useAuth?.isSuccess) {
      setForgotPasswordError(false);
      setForgotPasswordSuccess(true);
    }
  };
  return (
    <div className="login-section">
      <div className="image-layer" style={{ backgroundImage: `url(${splashScreen})` }}></div>
      <div className="outer-box">
        <div className="login-form default-form">
          {pathName === 'login' && (
            <div className="form-inner">
              <h3>Login to Ubix</h3>
              <form>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    {...registerLogIn('email', {
                      required: 'Please enter your email!',
                      pattern: {
                        message: 'Please enter a valid email!',
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      },
                    })}
                    type="email"
                    placeholder="Email"
                    className={`${logInErrors?.email?.message && 'is-invalid'}`}
                  />
                  <CostumText type={eTextType.ERROR} text={logInErrors?.email?.message} />
                </div>
                <label style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>Password</label>
                <div
                  className="form-group"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#F0F5F7',
                    borderRadius: 8,
                  }}
                >
                  <input
                    {...registerLogIn('password', { required: 'Please enter your password!' })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={`${logInErrors?.password?.message && 'is-invalid'}`}
                  />
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={`${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                    style={{ cursor: 'pointer', marginLeft: 5, marginRight: 5 }}
                  ></i>
                </div>
                <CostumText type={eTextType.ERROR} text={logInErrors?.password?.message} />
                <div className="form-group">
                  <div className="field-outer">
                    <div className="input-group checkboxes square">
                      <input type="checkbox" name="remember-me" id="remember" />
                      <label htmlFor="remember" className="remember">
                        <span className="custom-checkbox"></span> Remember me
                      </label>
                    </div>
                    <Link to="/forgotpassword" className="pwd">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="form-group">
                  <button className="theme-btn btn-style-one" type="submit" onClick={handleLogIn(onSignIn)}>
                    {useAuth.isLoading ? <Loading button={true} size="sm" /> : 'Log in'}
                  </button>
                </div>
                {useAuth.isError && (
                  <AlertMessage
                    dismissible={true}
                    showLineBreak={false}
                    message={useAuth?.message}
                    type="danger"
                    showAlert={logInError}
                    onClose={() => setLoginError(false)}
                  />
                )}
              </form>

              <div className="bottom-box">
                <div className="text">
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/signup"
                    className="call-modal signup"
                    onClick={() => {
                      useAuth.resetAuthState();
                      setShowPassword(false);
                      resetLogin();
                      clearLoginErrors();
                    }}
                  >
                    Signup
                  </Link>
                </div>
                <div className="divider">
                  <span>or</span>
                  <div className="text">
                    <Link
                      to="/"
                      className="call-modal signup"
                      onClick={() => {
                        useAuth.resetAuthState();
                        setShowPassword(false);
                        resetLogin();
                        clearLoginErrors();
                      }}
                    >
                      Continue as guest
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col-lg-12 col-md-12">
                    <a href="#" className="theme-btn social-btn-two google-btn" onClick={() => useAuth?.signinWithGoogle({ navigateUrl: '/' })}>
                      <i className="fab fa-google"></i> Log In via Gmail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {pathName === 'signup' && (
            <div className="form-inner">
              <h3>Create an Ubix Account</h3>
              <Tabs>
                <TabPanel>
                  <form action="add-parcel.html">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        {...registerSignUp('email', {
                          required: 'Please enter your email!',
                          pattern: {
                            message: 'Please enter a valid email',
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          },
                        })}
                        type="email"
                        placeholder="Email"
                        className={`${signUpErrors?.email?.message && 'is-invalid'}`}
                      />
                      <CostumText type={eTextType.ERROR} text={signUpErrors?.email?.message} />
                    </div>
                    <label style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>Password</label>
                    <div
                      className="form-group"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F5F7', borderRadius: 8 }}
                    >
                      <input
                        {...registerSignUp('password', { required: 'Please enter your password!' })}
                        id="password-field"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className={`${signUpErrors?.password?.message && 'is-invalid'}`}
                      />
                      <i
                        onClick={() => setShowPassword(!showPassword)}
                        className={`${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                        style={{ cursor: 'pointer', marginLeft: 5, marginRight: 5 }}
                      ></i>
                    </div>
                    <CostumText type={eTextType.ERROR} text={signUpErrors?.password?.message} />
                    <div className="form-group">
                      <button className="theme-btn btn-style-one" type="submit" onClick={handleSignUp(onSignUp)}>
                        {useAuth.isLoading ? <Loading button={true} size="sm" /> : 'Register'}
                      </button>
                    </div>
                    {useAuth.isError && (
                      <AlertMessage
                        dismissible={true}
                        showLineBreak={false}
                        message={useAuth?.message}
                        type="danger"
                        showAlert={signupError}
                        onClose={() => setSignupError(false)}
                      />
                    )}
                  </form>
                </TabPanel>
              </Tabs>
              <div className="bottom-box">
                <div className="text">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="call-modal login"
                    onClick={() => {
                      useAuth.resetAuthState();
                      setShowPassword(false);
                      resetSignup();
                      clearSignupErrors();
                    }}
                  >
                    LogIn
                  </Link>
                </div>
                <div className="divider">
                  <span>or</span>
                  <div className="text">
                    <Link
                      to="/"
                      className="call-modal signup"
                      onClick={() => {
                        useAuth.resetAuthState();
                        setShowPassword(false);
                        resetLogin();
                        clearSignupErrors();
                      }}
                    >
                      Continue as guest
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col-lg-12 col-md-12">
                    <a href="#" className="theme-btn social-btn-two google-btn" onClick={() => useAuth?.signinWithGoogle({ navigateUrl: '/' })}>
                      <i className="fab fa-google"></i> Log In via Gmail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {pathName === 'forgotpassword' && (
            <div className="form-inner">
              <h3>Change your password</h3>
              <Tabs>
                <TabPanel>
                  <form action="add-parcel.html">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        {...registerForgotPassword('email', {
                          required: 'Please enter your email!',
                          pattern: {
                            message: 'Please enter a valid email',
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          },
                        })}
                        type="email"
                        placeholder="Email"
                        className={`${forgotPasswordErrors?.email?.message && 'is-invalid'}`}
                      />
                      <CostumText type={eTextType.ERROR} text={forgotPasswordErrors?.email?.message} />
                    </div>
                    <div className="form-group">
                      <button className="theme-btn btn-style-one" type="submit" onClick={handleForgotPassword(onForgotPassword)}>
                        {useAuth.isLoading ? <Loading button={true} size="sm" /> : 'Send Email'}
                      </button>
                    </div>
                    {useAuth.isError && (
                      <AlertMessage
                        dismissible={true}
                        showLineBreak={false}
                        message={useAuth?.message}
                        type="danger"
                        showAlert={forgotPasswordError}
                        onClose={() => setForgotPasswordError(false)}
                      />
                    )}
                    {useAuth.isSuccess && (
                      <AlertMessage
                        dismissible={true}
                        showLineBreak={false}
                        message={useAuth?.message}
                        type="success"
                        showAlert={forgotPasswordSuccess}
                        onClose={() => setForgotPasswordSuccess(false)}
                      />
                    )}
                    {useAuth.message && <AlertMessage dismissible={true} showLineBreak={false} message={useAuth?.message} type="primary" />}
                  </form>
                </TabPanel>
              </Tabs>
              <div className="bottom-box">
                <div className="text">
                  {/* Already have an account?{' '} */}
                  <Link
                    to="/login"
                    className="call-modal login"
                    onClick={() => {
                      resetForgotPassword();
                      clearForgotPasswordErrors();
                    }}
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
