import "./popup.scss";
import coffe from "../../img/popup/coffe.png";
import logo from "../../img/icons/logo.png";
import registerForm from "../../services/popup/popupRegisterService";

import InputPopup from "./inputPopup";
import bg from "../../img/item-card/background.png";

import {useForm} from "effector-forms";
import {useEffect, useState} from "react";
import {appService} from "../../services/app/appService";
import {useHistory} from "react-router-dom";
import {useStore} from "effector-react";

const Popup = () => {
    const history = useHistory();
    const {submit, reset, fields} = useForm(registerForm);
    const registerResult = useStore(appService.$registerResult)
    const loginResult = useStore(appService.$loginResult)
    const [actualAction, setActualAction] = useState(true);

    useEffect(() => {
        return () => reset();
    }, []);

    return (
        <>
            <img className="popup-bg" src={bg} alt="bg"/>
            <div className="popup-wrapper">
                <div className="popup">
                    <button className="popup-close" onClick={() => history.push("/main")}>
                        ×
                    </button>
                    <div className="popup-left">
                        <img src={coffe} alt="coffe"/>
                        <div className="popup-left-title">
                            {actualAction ? "Добро пожаловать!" : "Регистрация"}
                        </div>
                        <div className="popup-left-desc">
                            {actualAction ? "Уже есть аккаунт?" : "Получайте скидки первым!"}
                        </div>
                        <button
                            className="popup-btn popup-left-btn"
                            onClick={() => {
                                reset();
                                setActualAction(!actualAction);
                            }}
                        >
                            {actualAction ? "Войти" : "Зарегистрироваться"}
                        </button>
                    </div>
                    <div className="popup-right">
                        <div className="popup-right-logo">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="popup-right-title">
                            {actualAction ? "Регистрация" : "Войти в личный кабинет"}
                        </div>
                        {actualAction && (
                            <>
                                <div className="popup-right-desc">
                                    Зарегистрируйтесь на сайте, чтобы первым получать скидки и
                                    узнавать акционные предложения!
                                </div>
                                <form className="register-form">
                                    <InputPopup
                                        nameIn="name"
                                        placeholder="Имя и фамилия"
                                        type="name"
                                    />
                                    <InputPopup nameIn="mail" placeholder="Email" type="mail"/>
                                    <InputPopup
                                        nameIn="phone"
                                        placeholder="Телефон"
                                        type="phone"
                                    />
                                    <InputPopup
                                        nameIn="password"
                                        placeholder="Пароль"
                                        type="password"
                                    />
                                    <input
                                        type="submit"
                                        className="popup-btn popup-right-btn"
                                        value="Зарегистророваться"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            submit();
                                            appService.registerEvent({
                                                name: fields.name.value,
                                                mail: fields.mail.value,
                                                phone: fields.phone.value,
                                                password: fields.password.value,
                                            });
                                            setActualAction(false);
                                        }}
                                    />
                                </form>
                            </>
                        )}
                        {!actualAction && (
                            <>
                                <form className="sing-form">
                                    <InputPopup nameIn="mail" placeholder="Email" type="mail"/>
                                    <InputPopup
                                        nameIn="password"
                                        placeholder="Пароль"
                                        type="password"
                                    />
                                    {loginResult && !loginResult.login && (
                                        <div className="error-text">
                                            {loginResult.error === "mail" ? 'Неверная почта' : "Неверный пароль"}
                                        </div>
                                    )}
                                    <input
                                        type="submit"
                                        className="popup-btn popup-right-btn"
                                        value="Войти"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            appService.loginEvent({
                                                mail: fields.mail.value,
                                                password: fields.password.value
                                            })
                                        }}
                                    />
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;
