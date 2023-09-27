import { PLACEHOLDER_EMAIL_TEXT, PLACEHOLDER_PASS_TEXT } from "../../utils/PlaceholderConstants";
import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from '../../hooks/useFormValidation';

export default function Login({
  name,
  setIsError,
  onLogin
})
{
  const {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange
  } = useFormValidation();

  function onSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  };

  return (
    <SectionLogin
      name={name}
      isValid={isValid}
      onSubmit={onSubmit}
      setIsError={setIsError}
    >
      <Input
        name='email'
        type='email'
        title='E-mail'
        value={values.email}
        isInputValid={isInputValid.email}
        placeholder={PLACEHOLDER_EMAIL_TEXT}
        error={errors.email}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
      />
      <Input
        name='password'
        type='password'
        title='Пароль'
        minLength = '3'
        value={values.password}
        isInputValid={isInputValid.password}
        placeholder={PLACEHOLDER_PASS_TEXT}
        error={errors.password}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
      />
    </SectionLogin>
  );
};
