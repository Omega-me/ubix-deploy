const Dashboard = () => {
  return (
    <div className="dashboard-outer">
      {/* <BreadCrumb title="Howdy, Jerome!!" /> */}
      {/* breadCrumb */}

      {/* <MenuToggler /> */}
      {/* Collapsible sidebar button */}

      <div className="row">{/* <TopCardBlock /> */}</div>
      {/* End .row top card block */}

      <div className="row">
        <div className="col-xl-7 col-lg-12">
          {/* <!-- Graph widget --> */}
          <div className="graph-widget ls-widget">{/* <ProfileChart /> */}</div>
          {/* End profile chart */}
        </div>
        {/* End .col */}

        <div className="col-xl-5 col-lg-12">
          {/* <!-- Notification Widget --> */}
          <div className="notification-widget ls-widget">
            <div className="widget-title">
              <h4>Notifications</h4>
            </div>
            <div className="widget-content">{/* <Notification /> */}</div>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12">
          {/* <!-- applicants Widget --> */}
          <div className="applicants-widget ls-widget">
            <div className="widget-title">
              <h4>Jobs Applied Recently</h4>
            </div>
            <div className="widget-content">
              <div className="row">
                {/* <!-- Candidate block three --> */}

                {/* <JobApplied /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End .col */}
      </div>
      {/* End .row profile and notificatins */}
    </div>
  );
};

export default Dashboard;
