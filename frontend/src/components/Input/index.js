import { InputContainer, InputLabel, InputBox } from './style';

const Input = ({ label, value, setValue, type = 'text' }) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputBox type={type} value={value} min={0} onChange={setValue} />
    </InputContainer>
  );
};

export default Input;
