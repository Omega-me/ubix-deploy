/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TabPanel, Tabs } from 'react-tabs';
import { CostumText, Loading } from 'components';
import { eOAuthProvider, eRoutes, eTextType } from 'common/enums';
import splashScreen from 'assets/images/background/SplashScreen.svg';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormReset } from 'react-hook-form';
import { LoginUserDto } from 'common/interfaces';
import { ConfirmationResult } from 'firebase/auth';
import './auth.scss';

interface AuthProps {
  isLoading: boolean;
  isPhoneLoading: boolean;
  isGoogleLoading: boolean;
  isAppleLoading: boolean;
  pathName: string;
  locationState: eRoutes.LOGIN | eRoutes.SIGNUP;
  signup: {
    registerSignUp: UseFormRegister<LoginUserDto>;
    signUpErrors: FieldErrors<LoginUserDto>;
    onSignUp: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    resetSignup: UseFormReset<LoginUserDto>;
    clearSignupErrors: UseFormClearErrors<LoginUserDto>;
  };
  login: {
    registerLogIn: UseFormRegister<LoginUserDto>;
    logInErrors: FieldErrors<LoginUserDto>;
    onLogin: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    resetLogin: UseFormReset<LoginUserDto>;
    clearLoginErrors: UseFormClearErrors<LoginUserDto>;
    onLoginWithOAuth: (provider: eOAuthProvider) => void;
    registerLoginWithPhone: UseFormRegister<{
      phone: string;
      otp: string;
    }>;
    onLoginWithPhone: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    onGetConfirmation: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    resetLoginWithPhone: UseFormReset<{
      phone: string;
      otp: string;
    }>;
    clearLoginWithPhoneErrors: UseFormClearErrors<{
      phone: string;
      otp: string;
    }>;
    forgotLoginWithPhoneErrors: FieldErrors<{ phone: string; otp: string }>;
    phoneConfirmation: ConfirmationResult | null;
    resetPhoneConfirmationState: () => void;
  };
  forgotpassword: {
    registerForgotPassword: UseFormRegister<{
      email: string;
    }>;
    forgotPasswordErrors: FieldErrors<{
      email: string;
    }>;
    onForgotPassword: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    resetForgotPassword: UseFormReset<{
      email: string;
    }>;
    clearForgotPasswordErrors: UseFormClearErrors<{
      email: string;
    }>;
  };
}

const Auth: React.FC<AuthProps> = props => {
  const { login, signup, forgotpassword, isLoading, isPhoneLoading, isGoogleLoading, isAppleLoading, pathName, locationState } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-section">
      <div className="image-layer" style={{ backgroundImage: `url(${splashScreen})` }}></div>
      <div className="outer-box">
        <div className="login-form default-form">
          {/* Login  */}
          {pathName === eRoutes.LOGIN && (
            <div className="form-inner">
              <h3>Login to Ubix</h3>
              <form onSubmit={login.onLogin}>
                <div className="form-group">
                  <label htmlFor="emailId">Email</label>
                  <input
                    {...login.registerLogIn('email', {
                      required: 'Please enter your email!',
                      pattern: {
                        message: 'Please enter a valid email!',
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      },
                    })}
                    type="email"
                    id="emailId"
                    placeholder="Email"
                    className={`${login.logInErrors?.email?.message && 'is-invalid'}`}
                  />
                  <CostumText type={eTextType.ERROR} text={login.logInErrors?.email?.message} />
                </div>

                <div className="form-group">
                  <label htmlFor="passwordId">Password</label>
                  <input
                    {...login.registerLogIn('password', { required: 'Please enter your password!' })}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={`${login.logInErrors?.password?.message && 'is-invalid'}`}
                    id="passwordId"
                  />
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className={`${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} show-password`}
                    style={{ cursor: 'pointer', marginLeft: 5, marginRight: 15 }}></i>
                  <CostumText type={eTextType.ERROR} text={login.logInErrors?.password?.message} />
                </div>
                <div className="form-group">
                  <div className="field-outer">
                    <div className="input-group checkboxes square"></div>
                    <Link to={eRoutes.FORGOT_PASSWORD} className="pwd">
                      Forgot password ?
                    </Link>
                  </div>
                </div>
                <div className="form-group">
                  <button className="theme-btn btn-style-one" type="submit" onClick={login.onLogin}>
                    {isLoading ? <Loading button={true} size="sm" /> : 'Log in'}
                  </button>
                </div>
              </form>

              <div className="bottom-box">
                <div className="text">
                  Don&apos;t have an account ?{' '}
                  <Link
                    to={eRoutes.SIGNUP}
                    className="call-modal signup"
                    onClick={() => {
                      setShowPassword(false);
                      login.resetLogin();
                      login.clearLoginErrors();
                    }}>
                    Sign up
                  </Link>
                </div>
                <div className="divider">
                  <span>or</span>
                  <div className="text">
                    <Link
                      to={eRoutes.HOME}
                      className="call-modal signup"
                      onClick={() => {
                        setShowPassword(false);
                        login.resetLogin();
                        login.clearLoginErrors();
                      }}>
                      Continue as guest
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col">
                    <Link to={eRoutes.PHONE_LOGIN_REGISTER} state={eRoutes.LOGIN}>
                      <a
                        onClick={() => {
                          setShowPassword(false);
                          login.resetLogin();
                          login.clearLoginErrors();
                        }}
                        className="theme-btn social-btn-three">
                        Log in via Phone
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col-md-6">
                    <a className="theme-btn social-btn-two google-btn" onClick={() => login.onLoginWithOAuth(eOAuthProvider.GOOGLE)}>
                      {isGoogleLoading ? (
                        <span className="mx-2">
                          <Loading button={true} size="sm" />{' '}
                        </span>
                      ) : (
                        <i className="fab fa-google"></i>
                      )}
                      Log In via Gmail
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a className="theme-btn social-btn-two apple-btn" onClick={() => login.onLoginWithOAuth(eOAuthProvider.APPLE)}>
                      {isAppleLoading ? (
                        <span className="mx-2">
                          <Loading button={true} size="sm" />{' '}
                        </span>
                      ) : (
                        <i className="fab fa-apple"></i>
                      )}
                      Log In via Apple
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Login with phone number */}
          {pathName === eRoutes.PHONE_LOGIN_REGISTER && (
            <div className="form-inner">
              <h3>Login or signup with phone number</h3>
              <Tabs>
                <TabPanel>
                  <form>
                    {!login.phoneConfirmation && (
                      <>
                        <div className="form-group">
                          <label htmlFor="phoneId">Phone</label>
                          <input
                            {...login.registerLoginWithPhone('phone', {
                              required: 'Please enter your phone number!',
                            })}
                            id="phoneId"
                            type="tel"
                            placeholder="Phone number"
                            className={`${login.forgotLoginWithPhoneErrors?.phone?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={login.forgotLoginWithPhoneErrors?.phone?.message} />
                        </div>
                        <div className="form-group" id="recaptcha"></div>
                      </>
                    )}
                    {login.phoneConfirmation && (
                      <div className="form-group">
                        <label htmlFor="phoneId">Otp</label>
                        <input
                          {...login.registerLoginWithPhone('otp', {
                            required: 'Please enter the otp code!',
                          })}
                          id="otpId"
                          type="number"
                          placeholder="Otp code"
                          className={`${login.forgotLoginWithPhoneErrors?.otp?.message && 'is-invalid'}`}
                        />
                        <CostumText type={eTextType.ERROR} text={login.forgotLoginWithPhoneErrors?.otp?.message} />
                      </div>
                    )}
                    {!login.phoneConfirmation ? (
                      <div className="form-group">
                        <button className="theme-btn btn-style-one" type="submit" onClick={login.onGetConfirmation}>
                          {isPhoneLoading ? <Loading button={true} size="sm" /> : 'Get OTP'}
                        </button>
                      </div>
                    ) : (
                      <div className="form-group">
                        <button className="theme-btn btn-style-one" type="submit" onClick={login.onLoginWithPhone}>
                          {isPhoneLoading ? <Loading button={true} size="sm" /> : `${locationState === eRoutes.LOGIN ? 'Log in' : 'Sig up'}`}
                        </button>
                      </div>
                    )}
                  </form>
                </TabPanel>
              </Tabs>
              <div className="bottom-box">
                <div className="text">
                  <Link
                    to={locationState === eRoutes.LOGIN ? eRoutes.LOGIN : eRoutes.SIGNUP}
                    className="call-modal login"
                    onClick={() => {
                      login.resetLoginWithPhone();
                      login.clearLoginWithPhoneErrors();
                      login.resetPhoneConfirmationState();
                    }}>
                    {locationState === eRoutes.LOGIN ? 'Log in via email and password' : 'Sign un via email and password'}
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* Signup */}
          {pathName === eRoutes.SIGNUP && (
            <div className="form-inner">
              <h3>Create an Ubix account</h3>
              <Tabs>
                <TabPanel>
                  <form onSubmit={signup.onSignUp}>
                    <div className="form-group">
                      <label htmlFor="emailId">Email</label>
                      <input
                        {...signup.registerSignUp('email', {
                          required: 'Please enter your email!',
                          pattern: {
                            message: 'Please enter a valid email',
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          },
                        })}
                        type="email"
                        id="emailId"
                        placeholder="Email"
                        className={`${signup.signUpErrors?.email?.message && 'is-invalid'}`}
                      />
                      <CostumText type={eTextType.ERROR} text={signup.signUpErrors?.email?.message} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="passwordId">Password</label>
                      <input
                        {...signup.registerSignUp('password', { required: 'Please enter your password!' })}
                        id="passwordId"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        className={`${signup.signUpErrors?.password?.message && 'is-invalid'}`}
                      />
                      <i
                        onClick={() => setShowPassword(!showPassword)}
                        className={`${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'} show-password`}
                        style={{ cursor: 'pointer', marginLeft: 5, marginRight: 15 }}></i>
                      <CostumText type={eTextType.ERROR} text={signup.signUpErrors?.password?.message} />
                    </div>
                    <div className="form-group">
                      <button className="theme-btn btn-style-one" type="submit" onClick={signup.onSignUp}>
                        {isLoading ? <Loading button={true} size="sm" /> : 'Register'}
                      </button>
                    </div>
                  </form>
                </TabPanel>
              </Tabs>
              <div className="bottom-box">
                <div className="text">
                  Already have an account ?{' '}
                  <Link
                    to={eRoutes.LOGIN}
                    className="call-modal login"
                    onClick={() => {
                      setShowPassword(false);
                      signup.resetSignup();
                      signup.clearSignupErrors();
                    }}>
                    Log in
                  </Link>
                </div>
                <div className="divider">
                  <span>or</span>
                  <div className="text">
                    <Link
                      to={eRoutes.HOME}
                      className="call-modal signup"
                      onClick={() => {
                        setShowPassword(false);
                        login.resetLogin();
                        signup.clearSignupErrors();
                      }}>
                      Continue as guest
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col">
                    <Link to={eRoutes.PHONE_LOGIN_REGISTER} state={eRoutes.SIGNUP}>
                      <a
                        onClick={() => {
                          () => {
                            setShowPassword(false);
                            signup.resetSignup();
                            signup.clearSignupErrors();
                          };
                        }}
                        className="theme-btn social-btn-three">
                        Register via Phone
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col-md-6">
                    <a className="theme-btn social-btn-two google-btn" onClick={() => login.onLoginWithOAuth(eOAuthProvider.GOOGLE)}>
                      {isGoogleLoading ? (
                        <span className="mx-2">
                          <Loading button={true} size="sm" />{' '}
                        </span>
                      ) : (
                        <i className="fab fa-google"></i>
                      )}
                      Register via Gmail
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a className="theme-btn social-btn-two apple-btn" onClick={() => login.onLoginWithOAuth(eOAuthProvider.APPLE)}>
                      {isAppleLoading ? (
                        <span className="mx-2">
                          <Loading button={true} size="sm" />{' '}
                        </span>
                      ) : (
                        <i className="fab fa-apple"></i>
                      )}
                      Register via Apple
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Forgot password */}
          {pathName === eRoutes.FORGOT_PASSWORD && (
            <div className="form-inner">
              <h3>Change your password</h3>
              <Tabs>
                <TabPanel>
                  <form onSubmit={forgotpassword.onForgotPassword}>
                    <div className="form-group">
                      <label htmlFor="emailId">Email</label>
                      <input
                        {...forgotpassword.registerForgotPassword('email', {
                          required: 'Please enter your email!',
                          pattern: {
                            message: 'Please enter a valid email',
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          },
                        })}
                        id="emailId"
                        type="email"
                        placeholder="Email"
                        className={`${forgotpassword.forgotPasswordErrors?.email?.message && 'is-invalid'}`}
                      />
                      <CostumText type={eTextType.ERROR} text={forgotpassword.forgotPasswordErrors?.email?.message} />
                    </div>
                    <div className="form-group">
                      <button className="theme-btn btn-style-one" type="submit" onClick={forgotpassword.onForgotPassword}>
                        {isLoading ? <Loading button={true} size="sm" /> : 'Send Email'}
                      </button>
                    </div>
                  </form>
                </TabPanel>
              </Tabs>
              <div className="bottom-box">
                <div className="text">
                  {/* Already have an account?{' '} */}
                  <Link
                    to={eRoutes.LOGIN}
                    className="call-modal login"
                    onClick={() => {
                      forgotpassword.resetForgotPassword();
                      forgotpassword.clearForgotPasswordErrors();
                    }}>
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
