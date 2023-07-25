import { eTextType } from 'common/enums';
import { Alert, Button } from 'react-bootstrap';

interface AlertProps {
  headerMessage?: string;
  message?: string;
  showAlert?: boolean;
  type?: string | eTextType;
  showLineBreak?: boolean;
  dismissible?: boolean;
  buttonConfig?: {
    text: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

const AlertMessage: React.FC<AlertProps> = (props) => {
  const { headerMessage, message, showAlert, type, dismissible = true, showLineBreak = true, buttonConfig, onClose } = props;

  return (
    <Alert show={showAlert && showAlert} variant={type} onClose={() => onClose && onClose()} dismissible={dismissible}>
      <Alert.Heading>{headerMessage}</Alert.Heading>
      {showLineBreak && <hr />}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{message}</p>
        {buttonConfig && (
          <Button onClick={() => buttonConfig?.onClick()} variant={`outline-${type}`}>
            {buttonConfig.text}
          </Button>
        )}
      </div>
    </Alert>
  );
};

export default AlertMessage;
