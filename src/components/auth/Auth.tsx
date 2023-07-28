/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TabPanel, Tabs } from 'react-tabs';
import { CostumText, Loading } from 'components';
import { eTextType } from 'common/enums';
import splashScreen from 'assets/images/background/SplashScreen.svg';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormReset } from 'react-hook-form';
import { LoginUserDto } from 'common/interfaces';

interface AuthProps {
  isLoading: boolean;
  pathName: string;
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
    onLoginWithGoogle: () => void;
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
  const { login, signup, forgotpassword, isLoading, pathName } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-section">
      <div className="image-layer" style={{ backgroundImage: `url(${splashScreen})` }}></div>
      <div className="outer-box">
        <div className="login-form default-form">
          {/* Login  */}
          {pathName === 'login' && (
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

                <label htmlFor="passwordId">Password</label>
                <div className="form-group">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#F0F5F7',
                      borderRadius: 8,
                    }}>
                    <input
                      {...login.registerLogIn('password', { required: 'Please enter your password!' })}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className={`${login.logInErrors?.password?.message && 'is-invalid'}`}
                      id="passwordId"
                    />
                    <i
                      onClick={() => setShowPassword(!showPassword)}
                      className={`${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                      style={{ cursor: 'pointer', marginLeft: 5, marginRight: 15 }}></i>
                  </div>
                  <CostumText type={eTextType.ERROR} text={login.logInErrors?.password?.message} />
                </div>
                <div className="form-group">
                  <div className="field-outer">
                    <div className="input-group checkboxes square"></div>
                    <Link to="/forgotpassword" className="pwd">
                      Forgot password?
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
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/signup"
                    className="call-modal signup"
                    onClick={() => {
                      setShowPassword(false);
                      login.resetLogin();
                      login.clearLoginErrors();
                    }}>
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
                        setShowPassword(false);
                        login.resetLogin();
                        login.clearLoginErrors();
                      }}>
                      Continue as guest
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col-lg-12 col-md-12">
                    <a href="#" className="theme-btn social-btn-two google-btn" onClick={() => login.onLoginWithGoogle()}>
                      <i className="fab fa-google"></i> Log In via Gmail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Signup */}
          {pathName === 'signup' && (
            <div className="form-inner">
              <h3>Create an Ubix account</h3>
              <Tabs>
                <TabPanel>
                  <form action="add-parcel.html">
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
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F5F7', borderRadius: 8 }}>
                        <input
                          {...signup.registerSignUp('password', { required: 'Please enter your password!' })}
                          id="passwordId"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          className={`${signup.signUpErrors?.password?.message && 'is-invalid'}`}
                        />
                        <i
                          onClick={() => setShowPassword(!showPassword)}
                          className={`${showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}`}
                          style={{ cursor: 'pointer', marginLeft: 5, marginRight: 15 }}></i>
                      </div>
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
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="call-modal login"
                    onClick={() => {
                      setShowPassword(false);
                      signup.resetSignup();
                      signup.clearSignupErrors();
                    }}>
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
                        setShowPassword(false);
                        login.resetLogin();
                        signup.clearSignupErrors();
                      }}>
                      Continue as guest
                    </Link>
                  </div>
                </div>
                <div className="btn-box row">
                  <div className="col-lg-12 col-md-12">
                    <a href="#" className="theme-btn social-btn-two google-btn" onClick={() => login.onLoginWithGoogle()}>
                      <i className="fab fa-google"></i> Log In via Gmail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Forgot password */}
          {pathName === 'forgotpassword' && (
            <div className="form-inner">
              <h3>Change your password</h3>
              <Tabs>
                <TabPanel>
                  <form action="add-parcel.html">
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
                    to="/login"
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
