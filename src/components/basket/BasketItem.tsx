import "./basketItem.scss";
import coffe from "../../img/coffe/blen-gurme.jpg";
import CustomLink from "../customLink/customLink";
import { ChangeEvent, useState } from "react";

const BasketItem = () => {
  const [count, setCount] = useState(1);
  const handlerCount = (increase: number) => {
    if ((count === 1 && increase < 1) || (count > 98 && increase > 0)) return;
    setCount(count + increase);
  };

  const changeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    if (target.match(/^\d+$/) !== null && +target < 100) setCount(+target);
  };
  return (
    <tr className="basket-item">
      <td>
        <button className="basket-item-del_item">&#10006;</button>
      </td>
      <td>
        <div className="basket-item-main">
          <img src={coffe} alt="coffe" className="basket-item-main-img"></img>
          <div className="basket-item-main-text">
            <CustomLink to="/itemCard" classes="basket-item-main-text-title">
              Columbia Supremo
            </CustomLink>
            <div className="basket-item-main-text-heft">250 г.</div>
          </div>
        </div>
      </td>
      <td>270 ₽ </td>
      <td className="basket-item-amount">
        <div className="counter">
          <button className="counter-btn" onClick={() => handlerCount(-1)}>
            -
          </button>
          <input
            type="text"
            className="counter-number"
            value={count}
            onChange={(e) => changeCount(e)}
          />
          <button className="counter-btn" onClick={() => handlerCount(1)}>
            +
          </button>
        </div>
      </td>
      <td>27 ₽ </td>
      <td>243 ₽ </td>
    </tr>
  );
};

export default BasketItem