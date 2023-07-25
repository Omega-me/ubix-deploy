import { Spinner } from 'react-bootstrap';
import './loading.scss';

interface LoadingProps {
  animation?: 'border' | 'grow';
  size?: 'sm';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  button?: boolean;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { button } = props;
  return (
    <>
      {button ? (
        <Spinner {...props} />
      ) : (
        <div className="loading-component">
          <Spinner {...props} />
        </div>
      )}
    </>
  );
};

export default Loading;
