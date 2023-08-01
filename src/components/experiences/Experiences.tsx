import { eTextType } from 'common/enums';
import { ExperienceDto } from 'common/interfaces';
import { MY_EXPERIENCES } from 'common/labels';
import { CostumText, Loading, ProfileLayoutContent } from 'components';
import moment from 'moment';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormSetValue, UseFormClearErrors, UseFormReset } from 'react-hook-form';
import { MutateOptions } from 'react-query';

interface ExperiencesProps {
  experiencesData: {
    experiences: ExperienceDto[];
    isLoading: boolean;
  };
  deleteExperience: {
    setToDeleteExperienceId: (value: React.SetStateAction<number | null | undefined>) => void;
    deleteExperience: (variables: any, options?: MutateOptions<any, any, any, any> | undefined) => void;
    isLoading: boolean;
    toDeteleExperienceId: number | null | undefined;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  };
  createExperience: {
    onCreateExperience: SubmitHandler<ExperienceDto>;
    registerCreateExperience: UseFormRegister<ExperienceDto>;
    handleCreateExperience: UseFormHandleSubmit<ExperienceDto, undefined>;
    setValue: UseFormSetValue<ExperienceDto>;
    CreateExperienceErrors: FieldErrors<ExperienceDto>;
    reset: UseFormReset<ExperienceDto>;
    clearErros: UseFormClearErrors<ExperienceDto>;
    isLoading: boolean;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    hasEndingDate: boolean;
    setHasEndingDate: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const Experiences: React.FC<ExperiencesProps> = (props) => {
  const { experiencesData, deleteExperience, createExperience } = props;

  return (
    <section className="user-dashboard">
      <ProfileLayoutContent title={MY_EXPERIENCES}>
        <div className="row">
          <div className="col-lg-12">
            <div className="ls-widget">
              <div className="tabs-box">
                <div className="widget-content">
                  <form className="default-form">
                    <div className="row">
                      <div className="form-group col-lg-12 col-md-12">
                        <div className="resume-outer theme-blue">
                          <div className="widget-title">
                            <h4>Work & Experience</h4>
                            <button
                              className="add-info-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                createExperience?.setShowModal(true);
                              }}
                            >
                              <span className="icon flaticon-plus"></span> Add Experience
                            </button>
                          </div>
                          {/* <!-- Resume BLock --> */}
                          {experiencesData?.isLoading ? (
                            <Loading />
                          ) : experiencesData?.experiences.length > 0 ? (
                            experiencesData?.experiences?.map((experience: ExperienceDto, index: number) => (
                              <div className="resume-block">
                                <div className="inner">
                                  <span className="name">{index + 1}</span>
                                  <div className="title-box">
                                    <div className="info-box">
                                      <h3>{experience?.jobName}</h3>
                                      <span>{experience?.companyName}</span>
                                    </div>
                                    <div className="edit-box">
                                      <span className="year">
                                        {moment(experience?.startingDate).format('MMM Do YY')} -{' '}
                                        {experience?.endingDate ? moment(experience?.endingDate).format('MMM Do YY') : 'Current'}
                                      </span>
                                      <div className="edit-btns">
                                        {/* <button>
                                          <span className="la la-pencil"></span>
                                        </button> */}
                                        <button
                                          onClick={(e: any) => {
                                            e.preventDefault();
                                            deleteExperience?.setToDeleteExperienceId(experience?.id);
                                            deleteExperience.setShowModal(true);
                                          }}
                                        >
                                          {deleteExperience?.isLoading && deleteExperience?.toDeteleExperienceId === experience?.id ? (
                                            <Loading button size="sm" variant="danger" />
                                          ) : (
                                            <span className="la la-trash"></span>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            'No experiences added.'
                          )}
                        </div>
                      </div>
                    </div>
                    {/* End .row */}
                  </form>
                </div>
                {/* End widget-content */}
              </div>
            </div>
            {/* End ls-widget */}
          </div>
        </div>
      </ProfileLayoutContent>
      {/* End .row */}
      {/* End dashboard-outer */}

      <Modal show={deleteExperience?.showModal} onHide={() => deleteExperience?.setShowModal(false)} keyboard={false}>
        <Modal.Header>
          <Modal.Title className="color-grey">Are you sure you want to delete this experience?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="color-grey">
            <b>This job experience will be permanently deleted!</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteExperience.deleteExperience({});
            }}
          >
            {deleteExperience.isLoading ? <Loading size="sm" button={true} variant="warning" /> : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={createExperience?.showModal}
        onHide={() => {
          createExperience?.setShowModal(false);
          createExperience?.setHasEndingDate(true);
          createExperience?.reset();
          createExperience?.clearErros();
        }}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="color-grey">Add job experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="login-modal">
            <div className="login-form default-form">
              <div className="form-inner">
                <form>
                  <div className="form-group">
                    <label>Job name</label>
                    <input
                      {...createExperience.registerCreateExperience('jobName', { required: 'This field is required!' })}
                      type="text"
                      placeholder="Job name"
                    />
                    <CostumText type={eTextType.ERROR} text={createExperience?.CreateExperienceErrors?.jobName?.message} />
                  </div>

                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      {...createExperience.registerCreateExperience('companyName', { required: 'This field is required!' })}
                      type="text"
                      placeholder="Company name"
                    />
                    <CostumText type={eTextType.ERROR} text={createExperience?.CreateExperienceErrors?.companyName?.message} />
                  </div>

                  <div className="form-group">
                    <label>Starting date</label>
                    <input
                      {...createExperience.registerCreateExperience('startingDate', { required: 'This field is required!' })}
                      type="date"
                      placeholder="Starting date"
                    />
                    <CostumText type={eTextType.ERROR} text={createExperience?.CreateExperienceErrors?.startingDate?.message} />
                  </div>

                  {createExperience?.hasEndingDate && (
                    <div className="form-group">
                      <label>Ending date</label>
                      <input {...createExperience.registerCreateExperience('endingDate')} type="date" placeholder="Ending date" />
                    </div>
                  )}

                  <Form color="#ff0062">
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                      label="I currently work here"
                      color="#ff0062"
                      onChange={() => {
                        if (!createExperience?.hasEndingDate) createExperience?.setValue('endingDate', null);
                        createExperience?.setHasEndingDate(!createExperience?.hasEndingDate);
                      }}
                    />
                  </Form>

                  <div className="form-group">
                    <button
                      className="theme-btn btn-style-one"
                      type="submit"
                      data-bs-dismiss="modal"
                      onClick={createExperience?.handleCreateExperience(createExperience?.onCreateExperience)}
                    >
                      {createExperience?.isLoading ? <Loading button size="sm" /> : 'Add experience'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              props?.experiencesProps?.deleteExperience({});
              if (!props?.experiencesProps?.isDeleteExperienceLoading) {
                setShowAddModal(false);
              }
            }}
          >
            {props?.experiencesProps?.isDeleteExperienceLoading ? <Loading size="sm" button={true} variant="warning" /> : 'Delete'}
          </Button>
        </Modal.Footer> */}
      </Modal>
    </section>
  );
};

export default Experiences;
