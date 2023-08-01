/* eslint-disable @typescript-eslint/no-explicit-any */
import { eSigninProvider, eTextType, eUserGender, eUserType } from 'common/enums';
import { AuthData, CreateUserDto, UserDataDto } from 'common/interfaces';
import { AlertMessage, CostumText, Loading, ProfileLayoutContent, Map } from 'components';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import './profile.scss';
import * as CONST from 'common/constants';
import * as LABELS from 'common/labels';

interface ProfileProps {
  userData: AuthData<UserDataDto>;
  profile: {
    onSendEmailVerification: () => void;
    registerCreateProfile: UseFormRegister<CreateUserDto>;
    onHandleCreateProfile: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    createProfileErrors: FieldErrors<CreateUserDto>;
    isCreateUserLoading: boolean;
    registerUpdateProfile: UseFormRegister<UserDataDto>;
    onHandleUpdateProfile: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    updateProfileErrors: FieldErrors<UserDataDto>;
    isUpdateUserLoading: boolean;
  };
}

const Profile: React.FC<ProfileProps> = props => {
  const { userData, profile } = props;
  const [logImg, setLogoImg] = useState<any>('');
  const logImgHander = (e: any) => {
    setLogoImg(e.target.files[0]);
  };

  return (
    <ProfileLayoutContent title={`${userData?.user?.profile ? LABELS.EDIT_PROFILE : LABELS.CREATE_PROFILE}`}>
      {userData?.signinProvider !== eSigninProvider.PHONE && userData?.emailVerified !== undefined && !userData?.emailVerified && (
        <div className="row">
          <div className="col-lg-12">
            <AlertMessage
              dismissible={false}
              message={LABELS.PLEASE_VERIFY_YOUR_EMAIL_ACCOUNT}
              type="warning"
              buttonConfig={{
                onClick: profile.onSendEmailVerification,
                text: LABELS.SEND_VERIFICATION_EMAIL,
              }}
            />
          </div>
        </div>
      )}

      {userData?.user?.profile ? (
        <form className="default-form" onSubmit={profile.onHandleUpdateProfile}>
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>{LABELS.MY_PROFILE}</h4>
                  </div>
                  <div className="widget-content">
                    <div className="uploading-outer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className="uploadButton">
                        <input className="uploadButton-input" type="file" name="attachments[]" accept="image/*" id="upload" required onChange={logImgHander} />
                        <label className="uploadButton-button ripple-effect" htmlFor="upload">
                          {logImg !== '' ? logImg?.name : 'Browse profil picture'}
                        </label>
                        <span className="uploadButton-file-name"></span>
                      </div>
                      <div className="form-group select-field">
                        <div className="form-check form-switch form-switch-sm">
                          <label className="form-check-label" htmlFor="opentoworkid">
                            {LABELS.OPEN_TO_WORK}
                          </label>
                          <input className="form-check-input" {...profile.registerUpdateProfile(CONST.OPENTOWORK)} type="checkbox" id="opentoworkid" />
                        </div>
                      </div>
                    </div>
                    <div className="default-form">
                      <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="fullnameid">{LABELS.FULL_NAME}</label>
                          <input {...profile.registerUpdateProfile(CONST.FULLNAME)} type="text" id="fullnameid" placeholder={LABELS.FULL_NAME} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="emailid">{LABELS.EMAIL}</label>
                          <input
                            {...profile.registerUpdateProfile(CONST.EMAIL, {
                              pattern: {
                                message: LABELS.PLEASE_ENTER_YOUR_EMAIL,
                                value: CONST.EMAIL_REGEX,
                              },
                            })}
                            type="email"
                            id="emailid"
                            placeholder={LABELS.EMAIL}
                            className={`${profile.createProfileErrors?.email?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.email?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="phoneid">{LABELS.PHONE}</label>
                          <input
                            {...profile.registerUpdateProfile(CONST.PHONENUMBER, {
                              pattern: {
                                message: LABELS.PLEASE_ENTER_A_VALID_PHONE_NUMBER,
                                value: CONST.PHONE_REGEX,
                              },
                            })}
                            type="tel"
                            id="phoneid"
                            placeholder={LABELS.PHONE_NUMBER}
                            className={`${profile.createProfileErrors?.phoneNumber?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.phoneNumber?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="birthdayeid">{LABELS.BIRTHDAY}</label>
                          <input {...profile.registerUpdateProfile(CONST.BIRTHDAY)} type="date" id="birthdayeid" />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="postcodeid">{LABELS.POST_CODE}</label>
                          <input {...profile.registerUpdateProfile(CONST.POSTCODE)} type="text" id="postcodeid" placeholder={LABELS.POST_CODE} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="genderid">{LABELS.GENDER}</label>
                          <select {...profile.registerUpdateProfile(CONST.GENDER)} id="genderid">
                            <option defaultValue={''} value="">
                              Select your gender
                            </option>
                            <option value={eUserGender.MALE}>Male</option>
                            <option value={eUserGender.FEMALE}>Female</option>
                            <option value={eUserGender.UNISEX}>Unisex</option>
                          </select>
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="typeid">{LABELS.TYPE}</label>
                          <select {...profile.registerUpdateProfile(CONST.TYPE)} name="type" id="typeid">
                            <option defaultValue={''} value="">
                              Select account type
                            </option>
                            <option value={eUserType.COMPANY}>Company</option>
                            <option value={eUserType.INDIVIDUAL}>Individual</option>
                          </select>
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="roleid">{LABELS.ROLE}</label>
                          <input {...profile.registerUpdateProfile(CONST.ROLE)} type="text" id="roleid" placeholder={LABELS.ROLE} />
                        </div>

                        <div className="form-group">
                          <label htmlFor="aboutid">{LABELS.ABOUT}</label>
                          <textarea {...profile.registerUpdateProfile(CONST.ABOUT)} id="aboutid" placeholder={LABELS.ABOUT_ME} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>{LABELS.MY_LOCATION}</h4>
                  </div>
                  <div className="widget-content">
                    <div className="default-form">
                      <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="addressid">{LABELS.ADDRESS}</label>
                          <input {...profile.registerUpdateProfile(CONST.ADDRESS)} type="text" id="addressid" placeholder={LABELS.MY_ADDRESS} disabled={true} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="countryid">{LABELS.COUNTRY}</label>
                          <input {...profile.registerUpdateProfile(CONST.COUNTRY)} type="text" id="countryid" placeholder={LABELS.MY_COUNTRY} disabled={true} />
                        </div>

                        <div className="form-group col-lg-12 col-md-12">
                          <label htmlFor="countryid">{LABELS.CHOOSE_YOUR_LOCATION}</label>
                          <div className="map-outer">
                            <div style={{ height: '450px', width: '100%' }}>
                              <Map />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>{LABELS.SOCIAL_NETWORK}</h4>
                  </div>
                  {/* TODO: social links */}
                  <div className="widget-content">
                    <div className="default-form">
                      <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                          <label>Facebook</label>
                          <input type="text" name="name" placeholder="www.facebook.com/Invision" />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label>Twitter</label>
                          <input type="text" name="name" placeholder="" />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label>Linkedin</label>
                          <input type="text" name="name" placeholder="" />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label>Instagram</label>
                          <input type="text" name="name" placeholder="" />
                        </div>
                      </div>
                      {userData?.signinProvider !== eSigninProvider.PHONE && userData?.emailVerified !== undefined && !userData?.emailVerified ? (
                        <div className="col-lg-12">
                          <div className="ls-widget">
                            <AlertMessage
                              dismissible={false}
                              message={LABELS.YOU_CAN_NOT_CHANGE_YOUR_PROFILE_DETAILS_WITHOUT_VERIFYING_YOU_EMAIL_FIRST}
                              type="warning"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="form-group col-lg-6 col-md-12">
                          <button type="submit" className="theme-btn btn-style-one" onClick={profile.onHandleUpdateProfile}>
                            {LABELS.SAVE_CHANGES}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form className="default-form" onSubmit={profile.onHandleCreateProfile}>
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>{LABELS.MY_PROFILE}</h4>
                  </div>
                  <div className="widget-content">
                    <div className="default-form">
                      <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="fullnameid">{LABELS.FULL_NAME}*</label>
                          <input
                            {...profile.registerCreateProfile(CONST.FULLNAME, {
                              required: LABELS.PLEASE_ENTER_YOUR_FULL_NAME,
                            })}
                            type="text"
                            id="fullnameid"
                            placeholder={LABELS.FULL_NAME}
                            className={`${profile.createProfileErrors?.fullName?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.fullName?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="emailid">{LABELS.EMAIL}*</label>
                          <input
                            {...profile.registerCreateProfile(CONST.EMAIL, {
                              required: LABELS.PLEASE_ENTER_YOUR_EMAIL,
                              pattern: {
                                message: LABELS.PLEASE_ENTER_A_VALID_EMAIL,
                                value: CONST.EMAIL_REGEX,
                              },
                            })}
                            type="email"
                            id="emailid"
                            placeholder={LABELS.EMAIL}
                            className={`${profile.createProfileErrors?.email?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.email?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="phoneid">{LABELS.PHONE}*</label>
                          <input
                            {...profile.registerCreateProfile(CONST.PHONENUMBER, {
                              required: LABELS.PLEASE_ENTER_YOUR_PHONE_NUMBER,
                              pattern: {
                                message: LABELS.PLEASE_ENTER_A_VALID_PHONE_NUMBER,
                                value: CONST.PHONE_REGEX,
                              },
                            })}
                            type="tel"
                            id="phoneid"
                            placeholder={LABELS.PHONE_NUMBER}
                            className={`${profile.createProfileErrors?.phoneNumber?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.phoneNumber?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="birthdayeid">{LABELS.BIRTHDAY}*</label>
                          <input
                            {...profile.registerCreateProfile(CONST.BIRTHDAY, {
                              required: LABELS.PLEASE_ENTER_YOUR_BIRTH_DATE,
                            })}
                            type="date"
                            id="birthdayeid"
                            className={`${profile.createProfileErrors?.birthday?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.birthday?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="postcodeid">{LABELS.POST_CODE}*</label>
                          <input
                            {...profile.registerCreateProfile(CONST.POSTCODE, {
                              required: LABELS.PLEASE_ENTER_THE_POST_CODE,
                            })}
                            type="text"
                            id="postcodeid"
                            placeholder={LABELS.POST_CODE}
                            className={`${profile.createProfileErrors?.postCode?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.postCode?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="genderid">{LABELS.GENDER}*</label>
                          <select
                            {...profile.registerCreateProfile(CONST.GENDER, {
                              required: LABELS.PLEASE_SELECT_YOUR_GENDER,
                            })}
                            name="gender"
                            id="genderid"
                            className={`${profile.createProfileErrors?.gender?.message && 'is-invalid'}`}>
                            <option defaultValue={''} value="">
                              Select your gender
                            </option>
                            <option value={eUserGender.MALE}>Male</option>
                            <option value={eUserGender.FEMALE}>Female</option>
                            <option value={eUserGender.UNISEX}>Unisex</option>
                          </select>
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.gender?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="typeid">{LABELS.TYPE}*</label>
                          <select
                            {...profile.registerCreateProfile(CONST.TYPE, {
                              required: LABELS.PLEASE_SELECT_THE_ACCOUNT_TYPE,
                            })}
                            name="type"
                            id="typeid"
                            className={`${profile.createProfileErrors?.type?.message && 'is-invalid'}`}>
                            <option defaultValue={''} value="">
                              Select account type
                            </option>
                            <option value={eUserType.COMPANY}>Company</option>
                            <option value={eUserType.INDIVIDUAL}>Individual</option>
                          </select>
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.type?.message} />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label htmlFor="roleid">{LABELS.ROLE}*</label>
                          <input
                            {...profile.registerCreateProfile(CONST.ROLE, {
                              required: LABELS.PLEASE_ENTER_THE_ROLE,
                            })}
                            type="text"
                            id="roleid"
                            placeholder={LABELS.ROLE}
                            className={`${profile.createProfileErrors?.role?.message && 'is-invalid'}`}
                          />
                          <CostumText type={eTextType.ERROR} text={profile.createProfileErrors?.role?.message} />
                        </div>
                      </div>
                      {userData?.signinProvider !== eSigninProvider.PHONE && userData?.emailVerified !== undefined && !userData?.emailVerified ? (
                        <div className="col-lg-12">
                          <div className="ls-widget">
                            <AlertMessage
                              dismissible={false}
                              message={LABELS.YOU_CAN_NOT_CREATE_YOUR_PROFILE_WITHOUT_VERIFYING_YOU_EMAIL_FIRST}
                              type="warning"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="form-group col-lg-6 col-md-12">
                          <button
                            type="submit"
                            className="theme-btn btn-style-one"
                            onClick={profile.onSendEmailVerification}
                            disabled={!userData?.emailVerified}>
                            {profile.isCreateUserLoading ? <Loading button={true} size="sm" /> : LABELS.CREATE_PROFILE}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </ProfileLayoutContent>
  );
};

export default Profile;
