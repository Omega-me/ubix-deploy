import { eTextType } from 'common/enums';

interface ICostumText {
  text: string | undefined;
  type: string | eTextType;
}

const CostumText: React.FC<ICostumText> = (props) => {
  const { text, type } = props;
  let color: string;

  if (type === eTextType.ERROR) {
    color = 'red';
  } else if (type === eTextType.SUCCESS) {
    color = 'green';
  } else {
    color = 'orange';
  }

  return <p style={{ color, fontSize: 14 }}>{text}</p>;
};

export default CostumText;
