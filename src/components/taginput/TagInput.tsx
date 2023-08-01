import { TagsInput } from 'react-tag-input-component';
import { UserDataDto } from 'common/interfaces';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import './taginput.scss';

interface TagInputProps {
  getUpdateProfileValues: UseFormGetValues<UserDataDto>;
  setUpdateProfileValue: UseFormSetValue<UserDataDto>;
  field: 'tags' | 'socials';
  placeholder?: string;
  name?: string;
}

const TagInput: React.FC<TagInputProps> = props => {
  const { setUpdateProfileValue, getUpdateProfileValues, field, placeholder, name } = props;

  const onChangeTags = (values: string[]) => {
    setUpdateProfileValue(field, values);
  };

  return (
    <>
      <TagsInput
        classNames={{
          input: 'taginput',
          tag: 'tag',
        }}
        value={getUpdateProfileValues(field) ? getUpdateProfileValues(field) : []}
        onChange={onChangeTags}
        name={name}
        placeHolder={placeholder}
      />
      <span className="input-message">Press enter</span>
    </>
  );
};

export default TagInput;
