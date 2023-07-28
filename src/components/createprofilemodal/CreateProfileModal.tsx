import { eUserType } from 'common/enums';
import { eGender } from 'common/enums/eGender';
import { CreateUserDto, UserDataDto } from 'common/interfaces';
import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UseMutateFunction } from 'react-query';
import { Tab, TabList, Tabs } from 'react-tabs';

interface CreateProfileModalProps {
  user: UserDataDto | null;
  email: string | null;
  createUser: UseMutateFunction<any, any, any, any>;
  signout: () => Promise<void>;
  isSuccess?: boolean;
}

const CreateProfileModal: React.FC<CreateProfileModalProps> = (props) => {
  const { user, email, createUser, signout } = props;
  const {
    register: registerCreateProfile,
    handleSubmit: handleCreateProfile,
    setValue: setCreateProfileValue,
    formState: { errors: CreateProfileErrors },
  } = useForm<CreateUserDto>();

  useEffect(() => {
    if (email) {
      setCreateProfileValue('email', email);
    }
    setCreateProfileValue('type', eUserType.INDIVIDUAL);
  }, [email]);

  const onCreateProfile: SubmitHandler<CreateUserDto> = (userData) => {
    createUser(userData);
  };

  return (
    <Modal show={user === null}>
      <Modal.Body>
        <div className="modal-body">
          {/* <!-- Login modal --> */}
          <div id="login-modal">
            <div className="login-form default-form">
              <div className="form-inner">
                <h3>Create an Ubix profile</h3>

                {/* <!--Login Form--> */}
                <Tabs>
                  <div className="form-group register-dual">
                    <TabList className="btn-box row">
                      <Tab className="col-lg-6 col-md-12">
                        <button onClick={() => setCreateProfileValue('type', eUserType.INDIVIDUAL)} className="theme-btn btn-style-four">
                          <i className="la la-user"></i> Individual
                        </button>
                      </Tab>

                      <Tab className="col-lg-6 col-md-12">
                        <button onClick={() => setCreateProfileValue('type', eUserType.COMPANY)} className="theme-btn btn-style-four">
                          <i className="la la-briefcase"></i> Company
                        </button>
                      </Tab>

                      <Tab className="col-lg-12 col-md-12">
                        <button onClick={() => setCreateProfileValue('type', eUserType.LOCAL_BUSINESS)} className="theme-btn btn-style-four">
                          <i className="la la-map"></i> Local Business
                        </button>
                      </Tab>
                    </TabList>
                  </div>
                </Tabs>
                <form method="post">
                  <div className="form-group">
                    <label>Full name</label>
                    <input {...registerCreateProfile('fullName', { required: 'This field is required!' })} type="text" placeholder="Full name" />
                  </div>

                  <div className="form-group">
                    <label>Job Role</label>
                    <input {...registerCreateProfile('role', { required: 'This field is required!' })} type="text" placeholder="Job role" />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      {...registerCreateProfile('phoneNumber', { required: 'This field is required!' })}
                      type="text"
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Birthday</label>
                    <input {...registerCreateProfile('birthday', { required: 'This field is required!' })} type="date" placeholder="birthday" />
                  </div>

                  <div className="form-group">
                    <label>Zip code</label>
                    <input
                      {...registerCreateProfile('postCode', {
                        required: 'Please enter zip code!',
                        // pattern: {
                        //   message: 'Please enter a valid zip code',
                        //   value:
                        //     /^(?:(?:[A-PR-UWYZ][0-9]{1,2}|[A-PR-UWYZ][A-HK-Y][0-9]{1,2}|[A-PR-UWYZ][0-9][A-HJKSTUW]|[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRV-Y])●[0-9][ABD-HJLNP-UW-Z]{2}|GIR 0AA)$/,
                        // },
                      })}
                      type="text"
                      placeholder="Zip code"
                    />
                  </div>
                  {/* ^[A-Z]{1,2}[0-9R][0-9A-Z]?●[0-9][ABD-HJLNP-UW-Z]{2}$ */}
                  <div className="form-group">
                    <label>Gender</label>
                    <select {...registerCreateProfile('gender', { required: 'This field is required!' })}>
                      <option>{eGender.MALE}</option>
                      <option>{eGender.FEMALE}</option>
                      <option>{eGender.OTHER}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <button className="theme-btn btn-style-one" type="submit" data-bs-dismiss="modal" onClick={handleCreateProfile(onCreateProfile)}>
                      Create account
                    </button>
                  </div>
                </form>
                <div className="btn-box row">
                  <div className="col-lg-12 col-md-12">
                    <button onClick={signout} className="theme-btn social-btn-two google-btn">
                      <i className="fab fa-run"></i> Logout
                    </button>
                  </div>
                </div>
                {/* End form */}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CreateProfileModal;
