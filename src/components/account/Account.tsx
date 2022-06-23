import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import "./account.scss";

import personalImg from "../../img/account/personalLogo.png";
import { appService } from "../../services/app/appService";

const Account = () => {
  const [isOpenSpec, setIsOpenSpec] = useState(false);
  const [isCurrentBtn, setIsCurrentBtn] = useState("current");
  const history = useHistory();

  return (
    <div className="account-wrapper">
      <div className="account-links">
        <Link to="/">Главная</Link>
        <div className="circle-decoration-item-coffe"></div>
        <Link to="/catalog">Личный кабинет</Link>
      </div>
      <div className="account-top account-block-wrapper">
        <div className="account-top-personal">
          <div className="account-top-personal-img">
            <img src={personalImg} alt="personalImg" />
            <button className="account-btn">Изменить</button>
          </div>
          <div className="account-top-personal-info">
            <div className="account-top-personal-info-name">
              Иван Иванов, здравствуйте!
              <button
                className="account-btn account-exit"
                onClick={() => {
                  sessionStorage.clear();
                  appService.setIsLogin(false);
                  history.push("/home");
                }}
              >
                Выйти
              </button>
            </div>
            <div className="account-top-personal-info-data">
              ivan.ivanov@gmail.com
              <br />+ 7 (909) 909 99 99
            </div>
          </div>
        </div>
        <div className="account-top-sale">
          {!isOpenSpec && (
            <div className="swing-in-top-fwd">
              <div className="account-top-sale-title">Ваша скидка: 10%</div>
              <div className="account-top-sale-desc">
                Сумма заказов: 5675 ₽*
              </div>
              <div className="account-top-sale-ps">
                *До скидки 15% не хватает покупок на сумму: 1255 ₽
              </div>
            </div>
          )}
          {isOpenSpec && (
            <div className="account-top-sale-specification swing-in-top-fwd">
              <div className="account-top-sale-specification-title">
                До скидки 15% не хватает покупок на сумму: 1255 ₽
              </div>
              <div className="account-top-sale-specification-desc">
                Скидка 10% - сумма покупок 5000 ₽
              </div>
              <div className="account-top-sale-specification">
                Скидка 15% - сумма покупок 7000 ₽
              </div>
              <div className="account-top-sale-specification">
                Скидка 20% - сумма покупок 10000 ₽
              </div>
            </div>
          )}
          <button
            className="account-top-sale-btn_specification"
            onClick={() => setIsOpenSpec(!isOpenSpec)}
          >
            {isOpenSpec ? "×" : "?"}
          </button>
        </div>
      </div>
      <div className="account-main account-block-wrapper">
        <div className="account-main-title">
          {isCurrentBtn === "current" ? "Мои заказы" : "Завершенные"}
        </div>
        <div className="account-main-btns">
          <button
            className={`account-btn account-main-btn ${
              isCurrentBtn === "current" ? null : "account-btn-disable"
            }`}
            onClick={() => setIsCurrentBtn("current")}
          >
            Текущие заказы
          </button>
          <button
            className={`account-btn account-main-btn ${
              isCurrentBtn === "completed" ? null : "account-btn-disable"
            }`}
            onClick={() => setIsCurrentBtn("completed")}
          >
            Завершенные
          </button>
        </div>
        {isCurrentBtn === "current" ? currentBlock() : completedBlock()}
      </div>
      <div className="account-footer">
        <div className="account-footer-personal_shares">
          <div className="account-footer-personal_shares-title">
            Персональные акции
          </div>
          <div className="account-footer-personal_shares-cards_wrapper">
            {cardShares()}
          </div>
        </div>
      </div>
    </div>
  );
};

const currentBlock = () => {
  return (
    <>
      <div className="account-main-status">01.08.2021 12:24:00 - оплачено</div>
      <div className="account-main-products">
        <table>
          <thead>
            <tr className="account-main-products-title">
              <td>Товаров:</td>
              <td>Сумма заказа:</td>
              <td>Скидка (10%):</td>
              <td>Сумма заказа:</td>
            </tr>
          </thead>
          <tbody>{productsItem()}</tbody>
        </table>
      </div>
      <div className="account-main-total">
        Сумма заказа: 864 ₽
        <br />
        Доставка: 350 ₽
      </div>
    </>
  );
};

const completedBlock = () => {
  return (
    <>
      <div className="account-main-status">
        01.08.2021 12:24:00 - доставлено
      </div>
      <div className="account-main-products">
        <table>
          <thead>
            <tr className="account-main-products-title">
              <td>Товаров:</td>
              <td>Сумма заказа:</td>
              <td>Скидка (10%):</td>
              <td>Сумма заказа:</td>
            </tr>
          </thead>
          <tbody>{productsItem()}</tbody>
        </table>
      </div>
      <div className="account-main-total">
        Сумма заказа: 864 ₽
        <br />
        Доставка: 350 ₽
      </div>
      <div className="account-main-status">
        04.08.2021 12:24:00 - доставлено
      </div>
      <div className="account-main-products">
        <table>
          <thead>
            <tr className="account-main-products-title">
              <td>Товаров:</td>
              <td>Сумма заказа:</td>
              <td>Скидка (10%):</td>
              <td>Сумма заказа:</td>
            </tr>
          </thead>
          <tbody>{productsItem()}</tbody>
        </table>
      </div>
      <div className="account-main-total">
        Сумма заказа: 864 ₽
        <br />
        Доставка: 350 ₽
      </div>
    </>
  );
};

const productsItem = () => {
  return (
    <>
      <tr className="account-main-products-item">
        <td>2 х Columbia Supremo, 250 г.</td>
        <td>480 ₽</td>
        <td>48 ₽ </td>
        <td>432 ₽ </td>
      </tr>
      <tr className="account-main-products-item">
        <td>1 х Columbia Supremo, 250 г.</td>
        <td>480 ₽</td>
        <td>48 ₽ </td>
        <td>432 ₽ </td>
      </tr>
    </>
  );
};

const cardShares = () => {
  return (
    <>
      <div className="card-shares">
        <div className="card-shares-title">
          Купи 3 пачки кофе и получи 4-ую в подарок!
        </div>
        <div className="card-shares-term">Срок акции: до 31.08.2021</div>
      </div>
      <div className="card-shares">
        <div className="card-shares-title">
          Купи 3 пачки кофе и получи 4-ую в подарок!
        </div>
        <div className="card-shares-term">Срок акции: до 31.08.2021</div>
      </div>
      <div className="card-shares">
        <div className="card-shares-title">
          Купи 3 пачки кофе и получи 4-ую в подарок!
        </div>
        <div className="card-shares-term">Срок акции: до 31.08.2021</div>
      </div>
      <div className="card-shares">
        <div className="card-shares-title">
          Купи 3 пачки кофе и получи 4-ую в подарок!
        </div>
        <div className="card-shares-term">Срок акции: до 31.08.2021</div>
      </div>
    </>
  );
};

export default Account;
