import { ConnectedFields, useForm } from "effector-forms";
import { useState } from "react";
import registerForm from "../../services/popup/popupRegisterService";
import "./inputPopup.scss";
import eyeShow from "../../img/icons/eye-show.png";
import eyeHide from "../../img/icons/eye-hide.png";

type Props = {
  nameIn: "name" | "phone" | "mail" | "password";
  placeholder: string;
  type?: "name" | "phone" | "mail" | "password";
};

const InputPopup: React.FC<Props> = (props) => {
  const { nameIn, placeholder, type } = props;
  const { fields, hasError, errorText } = useForm(registerForm);
  const [showPassword, setShowPassword] = useState(false);

  const handlerMail = (
    e: React.ChangeEvent<HTMLInputElement>,
    nameIn: "name" | "phone" | "mail" | "password"
  ) => {
    const value = e.target.value;
    fields[nameIn].onChange(value);
  };

  const handlerName = (
    e: React.ChangeEvent<HTMLInputElement>,
    nameIn: "name" | "phone" | "mail" | "password"
  ) => {
    const value = /[^\s]/gim.test(e.target.value) ? e.target.value : "";
    fields[nameIn].onChange(value);
  };
  const handlerPhone = (
    e: React.ChangeEvent<HTMLInputElement>,
    nameIn: "name" | "phone" | "mail" | "password"
  ) => {
    const value = /^\p{L}$/u.test(e.target.value) ? "" : e.target.value;
    fields[nameIn].onChange(value);
  };

  return (
    <div className="register-form-input">
      {type !== "password" && (
        <input
          type="text"
          className={`popup-input ${hasError(nameIn) ? "input-error" : null}`}
          placeholder={placeholder}
          value={fields[nameIn].value}
          onChange={(e) => {
            switch (type) {
              case "name":
                handlerName(e, nameIn);
                break;
              case "mail":
                handlerMail(e, nameIn);
                break;
              case "phone":
                handlerPhone(e, nameIn);
                break;
              default:
                break;
            }
          }}
        />
      )}
      {type === "password" && (
        <>
          <input
            type={showPassword ? "text" : "password"}
            className={`popup-input ${
              hasError("password") ? "input-error" : null
            }`}
            placeholder="Пароль"
            maxLength={10}
            value={fields.password.value}
            onChange={(e) => fields.password.onChange(e.target.value)}
          />
          <div className="eye" onClick={() => setShowPassword(!showPassword)}>
            <img src={showPassword ? eyeHide : eyeShow} alt="show password" />
          </div>
        </>
      )}
      <div className="error-text">{errorText(nameIn)}</div>
    </div>
  );
};

export default InputPopup;
