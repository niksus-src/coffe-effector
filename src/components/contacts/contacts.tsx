/* eslint-disable jsx-a11y/iframe-has-title */
import "./contacts.scss";

import { Link } from "react-router-dom";

import bg from "../../img/contacts/background.png";

const Contacts = () => {
  return (
    <>
      <div className="contacts">
        <div className="links">
          <Link to="/">Главная</Link>
          <div className="circle-decoration"></div>
          <Link to="/contacts">Контакты</Link>
        </div>

        <div className="contacts-content">
          <div className="contacts-content-info">
            <div className="contacts-content-info-title">Связаться с нами:</div>
            <div className="contacts-content-info-desc">+7 (999) 000 00 00</div>
            <div className="contacts-content-info-desc">
              adadada@kldrefine.com
            </div>
            <div className="contacts-content-info-title">
              Юридический адрес:
            </div>
            <div className="contacts-content-info-desc">
              Российская, Федерация, 238310, Калининградская область, Гурьевский
              район, поселок Васильково, улица Шатурская, дом 4А
            </div>
            <div className="contacts-content-info-title">Адрес склада:</div>
            <div className="contacts-content-info-desc">
              Московская область, Балашиха, Западная промзона, Шоссе энтузиастов
              1
            </div>
          </div>

          <div className="contacts-content-map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A36fe5cbae652bdbe9095f5966e7c15d8108eaf9d4155d9a3cbc8df2f3485b5aa&amp;source=constructor"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
      <img src={bg} alt="bg" className="contact-bg" />
    </>
  );
};

export default Contacts;
