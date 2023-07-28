import { genders } from 'common/data';
import { BreadCrumb } from 'components';
import { useState } from 'react';
import Select from 'react-select';

const Profile = () => {
  const [logImg, setLogoImg] = useState<any>('');
  const logImgHander = (e: any) => {
    setLogoImg(e.target.files[0]);
  };

  const catOptions = [
    { value: 'Banking', label: 'Banking' },
    { value: 'Digital & Creative', label: 'Digital & Creative' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Managemnet', label: 'Managemnet' },
    { value: 'Accounting & Finance', label: 'Accounting & Finance' },
    { value: 'Digital', label: 'Digital' },
    { value: 'Creative Art', label: 'Creative Art' },
  ];
  return (
    <div className="dashboard-outer">
      <BreadCrumb title="My Profile!" />
      {/* breadCrumb */}

      {/* <MenuToggler /> */}
      {/* Collapsible sidebar button */}

      <div className="row">
        <div className="col-lg-12">
          <div className="ls-widget">
            <div className="tabs-box">
              <div className="widget-title">
                <h4>My Profile</h4>
              </div>
              <div className="widget-content">
                <div className="uploading-outer">
                  <div className="uploadButton">
                    <input
                      className="uploadButton-input"
                      type="file"
                      name="attachments[]"
                      accept="image/*"
                      id="upload"
                      required
                      onChange={logImgHander}
                    />
                    <label className="uploadButton-button ripple-effect" htmlFor="upload">
                      {logImg !== '' ? logImg?.name : 'Browse Logo'}
                    </label>
                    <span className="uploadButton-file-name"></span>
                  </div>
                  <div className="text">Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png</div>
                </div>
                {/* End logo and cover photo components */}

                <form className="default-form">
                  <div className="row">
                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Full Name</label>
                      <input type="text" name="name" placeholder="Jerome" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Job Title</label>
                      <input type="text" name="name" placeholder="UI Designer" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Phone</label>
                      <input type="text" name="name" placeholder="0 123 456 7890" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Email address</label>
                      <input type="text" name="name" placeholder="creativelayers" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Website</label>
                      <input type="text" name="name" placeholder="www.jerome.com" required />
                    </div>

                    <div className="form-group col-lg-6 col-md-12">
                      <label>Birthday</label>
                      <input type="text" name="name" placeholder="Birthday" required />
                    </div>

                    {/* <!-- Input --> */}
                    {/* <div className="form-group col-lg-3 col-md-12">
                      <label>Current Salary($)</label>
                      <select className="chosen-single form-select" required>
                        <option>40-70 K</option>
                        <option>50-80 K</option>
                        <option>60-90 K</option>
                        <option>70-100 K</option>
                        <option>100-150 K</option>
                      </select>
                    </div> */}

                    {/* <!-- Input --> */}
                    {/* <div className="form-group col-lg-3 col-md-12">
                      <label>Expected Salary($)</label>
                      <select className="chosen-single form-select" required>
                        <option>120-350 K</option>
                        <option>40-70 K</option>
                        <option>50-80 K</option>
                        <option>60-90 K</option>
                        <option>70-100 K</option>
                        <option>100-150 K</option>
                      </select>
                    </div> */}

                    {/* <!-- Input --> */}
                    {/* <div className="form-group col-lg-6 col-md-12">
                      <label>Experience</label>
                      <input type="text" name="name" placeholder="5-10 Years" required />
                    </div> */}

                    <div className="form-group col-lg-6 col-md-12">
                      <label>Postal code</label>
                      <input type="text" name="name" placeholder="Post code" required />
                    </div>

                    {/* <!-- Input --> */}
                    {/* <div className="form-group col-lg-6 col-md-12">
                      <label>Age</label>
                      <select className="chosen-single form-select" required>
                        <option>23 - 27 Years</option>
                        <option>24 - 28 Years</option>
                        <option>25 - 29 Years</option>
                        <option>26 - 30 Years</option>
                      </select>
                    </div> */}

                    {/* <!-- Input --> */}
                    {/* <div className="form-group col-lg-6 col-md-12">
                      <label>Education Levels</label>
                      <input type="text" name="name" placeholder="Certificate" required />
                    </div> */}

                    <div className="form-group col-lg-6 col-md-12">
                      <label>Select sex </label>
                      <Select
                        defaultValue={[genders[1]]}
                        isMulti
                        name="colors"
                        options={genders}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        required
                      />
                    </div>

                    {/* <!-- Input --> */}
                    {/* <div className="form-group col-lg-6 col-md-12">
                      <label>Languages</label>
                      <input type="text" name="name" placeholder="English, Turkish" required />
                    </div> */}

                    {/* <!-- Search Select --> */}
                    {/* <div className="form-group col-lg-6 col-md-12">
                      <label>Categories </label>
                      <Select
                        defaultValue={[catOptions[1]]}
                        isMulti
                        name="colors"
                        options={catOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        required
                      />
                    </div> */}

                    {/* <!-- Input --> */}
                    {/* <div className="form-group col-lg-6 col-md-12">
                      <label>Allow In Search & Listing</label>
                      <select className="chosen-single form-select" required>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div> */}

                    {/* <!-- About Company --> */}
                    <div className="form-group col-lg-12 col-md-12">
                      <label>About me</label>
                      <textarea placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"></textarea>
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <button type="submit" className="theme-btn btn-style-one">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
                {/* compnay info box */}
              </div>
            </div>
          </div>
          {/* <!-- Ls widget --> */}

          <div className="ls-widget">
            <div className="tabs-box">
              <div className="widget-title">
                <h4>Social Network</h4>
              </div>
              {/* End widget-title */}

              <div className="widget-content">
                <form className="default-form">
                  <div className="row">
                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Facebook</label>
                      <input type="text" name="name" placeholder="www.facebook.com/Invision" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Twitter</label>
                      <input type="text" name="name" placeholder="" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Linkedin</label>
                      <input type="text" name="name" placeholder="" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <label>Google Plus</label>
                      <input type="text" name="name" placeholder="" required />
                    </div>

                    {/* <!-- Input --> */}
                    <div className="form-group col-lg-6 col-md-12">
                      <button type="submit" className="theme-btn btn-style-one">
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <!-- Ls widget --> */}

          <div className="ls-widget">
            <div className="tabs-box">
              <div className="widget-title">
                <h4>Contact Information</h4>
              </div>
              {/* End widget-title */}
              {/*TODO maybe <div className="widget-content">
                <ContactInfoBox />
              </div> */}
            </div>
          </div>
          {/* <!-- Ls widget --> */}
        </div>
      </div>
      {/* End .row */}
    </div>
  );
};

export default Profile;
