import { CreateJobDto } from 'common/interfaces';
import { POST_NEW_JOB } from 'common/labels';
import { ProfileLayoutContent } from 'components';
import { useEffect, useState } from 'react';
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormGetValues,
  UseFormClearErrors,
  UseFormReset,
  FieldErrors,
  SubmitHandler,
} from 'react-hook-form';
import './postjobs.scss';

interface PostJobsProps {
  createJob: {
    register: UseFormRegister<CreateJobDto>;
    handleSubmit: UseFormHandleSubmit<CreateJobDto, undefined>;
    setValue: UseFormSetValue<CreateJobDto>;
    getValues: UseFormGetValues<CreateJobDto>;
    clearErrors: UseFormClearErrors<CreateJobDto>;
    reset: UseFormReset<CreateJobDto>;
    errors: FieldErrors<CreateJobDto>;
    onCreateJob: SubmitHandler<CreateJobDto>;
    isLoading: boolean;
  };
}

const PostJobs: React.FC<PostJobsProps> = (props) => {
  const { createJob } = props;
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState();
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  // const logImgHander = (e: any) => {
  //   setLogoImg(e.target.files[0]);
  // };

  const socials = ['Facebook', 'Twitter', 'Linkedin', 'Instagram'];
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <section className="user-dashboard">
      <div className="dashboard-outer">
        <div className="row">
          <ProfileLayoutContent title={POST_NEW_JOB}>
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Job information</h4>
                  </div>

                  <div className="widget-content">
                    {/* <PostJobSteps /> */}
                    <div className="post-job-steps">
                      <div className="step">
                        <span className="icon flaticon-briefcase"></span>
                        <h5>Job Detail</h5>
                      </div>

                      <div className="step">
                        <span className="icon flaticon-money"></span>
                        <h5>Package & Payments</h5>
                      </div>

                      <div className="step">
                        <span className="icon flaticon-checked"></span>
                        <h5>Confirmation</h5>
                      </div>
                    </div>
                    {/* End job steps form */}
                    {/* <PostBoxForm /> */}
                    <form className="default-form">
                      <div className="row">
                        {/* <!-- Input --> */}
                        <div className="form-group col-lg-12 col-md-12">
                          <label>Job Title</label>
                          <input {...createJob?.register('name')} type="text" placeholder="Title" />
                        </div>

                        {/* <!-- About Company --> */}
                        <div className="form-group col-lg-12 col-md-12">
                          <label>Job Description</label>
                          <textarea {...createJob?.register('description')} placeholder="Description"></textarea>
                        </div>

                        <div className="form-group col-lg-12 col-md-12">
                          <label>Job Requirements</label>
                          <textarea {...createJob?.register('requirements')} placeholder="Requirements"></textarea>
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label>Enter Salary</label>
                          <input {...createJob?.register('salary')} type="number" placeholder="" />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label>Postal Code</label>
                          <input {...createJob?.register('postCode')} type="text" placeholder="" />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                          <label>Inster Tags</label>
                          <input type="text" placeholder="" />
                        </div>
                      </div>
                    </form>

                    {/* End post box form */}
                  </div>
                </div>
                <div className="ls-widget">
                  <div className="tabs-box">
                    <div className="widget-title">
                      <h4>Add social media links</h4>
                    </div>
                    {/* End widget-title */}

                    <div className="widget-content">
                      <form className="default-form">
                        <div className="row">
                          {/* 
                          <div className="form-group col-lg-6 col-md-12">
                            <label>Facebook</label>
                            <input type="text" {...createJob?.register('socials')} placeholder="facebook" />
                          </div>

                          <div className="form-group col-lg-6 col-md-12">
                            <label>Twitter</label>
                            <input type="text" {...createJob?.register('socials')} placeholder="twitter" />
                          </div>

                          <div className="form-group col-lg-6 col-md-12">
                            <label>Linkedin</label>
                            <input type="text" {...createJob?.register('socials')} placeholder="linkedin" />
                          </div>

                          <div className="form-group col-lg-6 col-md-12">
                            <label>Instagram</label>
                            <input type="text" {...createJob?.register('socials')} placeholder="instagram" />
                          </div> */}

                          {socials?.map((value: string, index: number) => (
                            <div className="form-group col-lg-6 col-md-12">
                              <label>{value}</label>
                              <input type="text" {...createJob?.register(`socials.${index}`)} placeholder={value} />
                            </div>
                          ))}

                          {/* <!-- Input --> */}
                          {/* <div className="form-group col-lg-6 col-md-12">
                          <button type="submit" className="theme-btn btn-style-one">
                            Save
                          </button>
                        </div> */}
                        </div>
                      </form>
                      <div className="widget-title" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <h4>Attach images</h4>
                      </div>
                      <div className="uploading-outer">
                        <div
                          className="uploadButton"
                          style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-evenly',
                            flexDirection: windowSize[0] > 500 ? 'row' : 'column',
                          }}
                        >
                          {[1, 2, 3, 4].map((value) => (
                            // createJob?.getValues(`images`) && createJob?.getValues(`images` as any)[value] !== null ? (
                            //   <img src={createJob?.getValues(`images` as any)[value]} />
                            // ) :
                            <span>
                              <input
                                className="uploadButton-input"
                                type="file"
                                accept="image/*"
                                id="upload"
                                // onChange={logImgHander}
                                {...createJob?.register(`images.${value}`)}
                              />
                              <label className="uploadButton-button ripple-effect" htmlFor="upload">
                                Upload cover image
                              </label>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div
                        className="form-group col-lg-6 col-md-12"
                        style={{ display: 'flex', width: '100%', justifyContent: 'center', marginBottom: 20 }}
                      >
                        <button type="submit" className="theme-btn btn-style-one" onClick={createJob?.handleSubmit(createJob?.onCreateJob)}>
                          Share Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ProfileLayoutContent>
        </div>
      </div>
      {/* End dashboard-outer */}
    </section>
  );
};

export default PostJobs;
