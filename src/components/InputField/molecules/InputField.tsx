import Controls from '../atoms/Controls';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Main from '../atoms/Main';

const InputField = Object.assign(Main, {
  Label: Label,
  Input: Input,
  Controls: Controls,
});

export default InputField;
