import {
  PLACEHOLDER_NAME_TEXT,
  PLACEHOLDER_EMAIL_TEXT,
  PLACEHOLDER_PASS_TEXT
} from "../../utils/PlaceholderConstants";
import { EMAIL_REG } from "../../utils/AuthorConstants";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from '../../hooks/useFormValidation';
import Input from "../Input/Input";

export default function Login({
  name,
  onRegister,
  setIsError
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
    onRegister(
      values.username,
      values.email,
      values.password
    );
  };

  return (
    <SectionLogin
      name={name}
      isValid={isValid}
      onSubmit={onSubmit}
      setIsError={setIsError}
    >
      <Input
        name='username'
        type='text'
        title='Имя'
        minLength = '2'
        value={values.username}
        isInputValid={isInputValid.username}
        placeholder={PLACEHOLDER_NAME_TEXT}
        error={errors.username}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }
        }
      />
      <Input
        name='email'
        type='email'
        title='E-mail'
        value={values.email}
        isInputValid={isInputValid.email}
        placeholder={PLACEHOLDER_EMAIL_TEXT}
        error={errors.email}
        pattern={EMAIL_REG}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }
        }
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
        }
        }
      />
    </SectionLogin>
  );
};
