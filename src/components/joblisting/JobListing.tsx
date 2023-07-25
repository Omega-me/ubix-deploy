// import FilterSidebar from './FilterSidebar';

import { FilterJobsBox } from 'components';
import InputRange from 'react-input-range';

const JobListing = () => {
  const jobTypeList = ['1', '2', '3'];
  return (
    <>
      {/* <!-- Header Span --> */}
      {/* <span className="header-span"></span> */}
      <section className="ls-section style-two">
        <div className="row no-gutters">
          <div className="offcanvas offcanvas-start" tabIndex={-1} id="filter-sidebar" aria-labelledby="offcanvasLabel">
            <div className="filters-column hide-left">
              <div className="inner-column">
                <div className="filters-outer">
                  <button
                    type="button"
                    className="btn-close text-reset close-filters show-1023"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                  {/* End .close filter */}

                  <div className="filter-block">
                    <h4>Search by Keywords</h4>
                    <div className="form-group">
                      {/*TODO <SearchBox /> */}
                      <>
                        <input type="text" name="listing-search" placeholder="Job title, keywords, or company" />
                        <span className="icon flaticon-search-3"></span>
                      </>
                    </div>
                  </div>
                  {/* <!-- Filter Block --> */}

                  <div className="filter-block">
                    <h4>Location</h4>
                    <div className="form-group">{/* <LocationBox /> //TODO */}</div>

                    <p>Radius around selected destination</p>
                    {/* <DestinationRangeSlider />//TODO */}
                  </div>
                  {/* <!-- Filter Block --> */}

                  {/* <div className="filter-block">
                    <h4>Category</h4>
                    <div className="form-group"><Categories />//TODO</div>
                  </div> */}
                  {/* <!-- Filter Block --> */}

                  <div className="switchbox-outer">
                    <h4>Job type</h4>
                    {/* <JobType />//TODO */}
                  </div>
                  {/* <!-- Switchbox Outer --> */}

                  {/* <div className="checkbox-outer">
                    <h4>Date Posted</h4>
                    <DatePosted />//TODO
                  </div> */}
                  {/* <!-- Checkboxes Ouer --> */}

                  {/* <div className="checkbox-outer">
                    <h4>Experience Level</h4>
                    <ExperienceLevel />//TODO
                  </div> */}
                  {/* <!-- Checkboxes Ouer --> */}

                  <div className="filter-block">
                    <h4>Salary</h4>

                    {/* <SalaryRangeSlider />//TODO */}
                  </div>
                  {/* <!-- Filter Block --> */}

                  <div className="filter-block">
                    <h4>Tags</h4>
                    {/* <Tag />//TODO */}
                  </div>
                  {/* <!-- Filter Block --> */}
                </div>
                {/* Filter Outer */}
              </div>
            </div>
          </div>
          {/* End filter column for tablet and mobile devices */}

          <div className="filters-column hidden-1023 col-xl-3 col-lg-4 col-md-12 col-sm-12">
            {/* <FilterSidebar /> */}
            {/* FILTER SIDE BAR */}
            <div className="inner-column">
              <div className="filters-outer">
                <button
                  type="button"
                  className="btn-close text-reset close-filters show-1023"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
                {/* End .close filter */}

                <div className="filter-block">
                  <h4>Search by Keywords</h4>
                  <div className="form-group">
                    {/* <SearchBox />//TODO */}
                    <>
                      <input type="text" name="listing-search" placeholder="Job title, keywords, or company" />
                      <span className="icon flaticon-search-3"></span>
                    </>
                  </div>
                </div>
                {/* <!-- Filter Block --> */}

                <div className="filter-block">
                  <h4>Location</h4>
                  <div className="form-group">
                    {/* <LocationBox />//TODO */}
                    <input type="text" name="listing-search" placeholder="City or postcode" />
                    <span className="icon flaticon-map-locator"></span>
                  </div>

                  <p>Radius around selected destination</p>
                  {/* <DestinationRangeSlider />//TODO */}
                </div>
                {/* <!-- Filter Block --> */}

                {/* <div className="filter-block">
                  <h4>Category</h4>
                  <div className="form-group"><Categories />//TODO</div>
                </div> */}
                {/* <!-- Filter Block --> */}

                <div className="switchbox-outer">
                  <h4>Job type</h4>
                  {/* <JobType />//TODO */}
                  <ul className="switchbox">
                    {jobTypeList?.map((item: any) => (
                      <li key={item.id}>
                        <label className="switch">
                          <input type="checkbox" value={item.value} checked={item.isChecked || false} />
                          <span className="slider round"></span>
                          <span className="title">{item.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <!-- Switchbox Outer --> */}

                {/* <div className="checkbox-outer">
                  <h4>Date Posted</h4>
                  <DatePosted />//TODO
                </div> */}
                {/* <!-- Checkboxes Ouer --> */}

                {/* <div className="checkbox-outer">
                  <h4>Experience Level</h4>
                  <ExperienceLevel />//TODO
                </div> */}
                {/* <!-- Checkboxes Ouer --> */}

                <div className="filter-block">
                  <h4>Salary</h4>
                  <div className="range-slider-one salary-range">
                    <InputRange
                      formatLabel={(value) => ``}
                      minValue={0}
                      maxValue={20000}
                      value={{
                        min: 3000,
                        max: 30000,
                      }}
                      onChange={(value) => console.log(value)}
                    />
                    <div className="input-outer">
                      <div className="amount-outer">
                        <span className="d-inline-flex align-items-center">
                          <span className="min">$3000</span>
                          <span className="max ms-2">$30000</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <SalaryRangeSlider />//TODO */}
                </div>
                {/* <!-- Filter Block --> */}
                {/* 
                <div className="filter-block">
                  <h4>Tags</h4>
                  <Tag />//TODO
                </div> */}
                {/* <!-- Filter Block --> */}
              </div>
              {/* Filter Outer */}
            </div>
            {/* END FILTER SIDE BAR */}
          </div>
          {/* <!-- End Filters Column --> */}

          <div className="content-column col-xl-9 col-lg-8 col-md-12 col-sm-12">
            <div className="ls-outer">
              <FilterJobsBox />
              {/* <!-- ls Switcher --> */}
            </div>
          </div>
          {/* <!-- End Content Column --> */}
        </div>
        {/* End row */}
      </section>
      {/* <!--End Listing Page Section --> */}

      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default JobListing;
