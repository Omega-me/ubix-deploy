interface BreadCrumbProps {
  title: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
  return (
    <div className="upper-title-box">
      <h3>{props.title}</h3>
      <div className="text">Ready to jump back in?</div>
    </div>
  );
};

export default BreadCrumb;
