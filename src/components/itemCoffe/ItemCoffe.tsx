import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import "./itemCoffe.scss";
import Button from "../button/button";
import coffe from "../../img/coffe/blen-gurme.jpg";
import grain from "../../img/icons/grain.png";
import tasteIcon from '../../img/item-card/taste-icon.svg'

const ItemCoffe = () => {
  const [count, setCount] = useState(1);
  const handlerCount = (increase: number) => {
    if((count === 1 && increase < 1) || (count > 98 && increase > 0)) return
    setCount(count + increase)
  }

  const changeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value
    if(target.match(/^\d+$/) !== null && +target < 100) setCount(+target)
  }

  const renderFeature = (amount: number = 1) => {
    let renderElements = [];

    for (let index = 0; index < amount; index++) {
      renderElements.push(
        <li key={index}>
          <div className="active"></div>
        </li>
      );
    }
    if (amount !== 10) {
      for (let index = amount; index < 10; index++) {
        renderElements.push(
          <li key={index}>
            <div className="disable"></div>
          </li>
        );
      }
    }
    return renderElements;
  };

  const renderGrain = (amount: number = 1) => {
    let renderElements = [];

    for (let index = 0; index <= amount; index++) {
      renderElements.push(
        <li key={index}>
          <img src={grain} alt="grain" />
        </li>
      );
    }
    return renderElements;
  };

  return (
    <div className="item">
      <div className="item-links">
        <Link to="/">Главная</Link>
        <div className="circle-decoration"></div>
        <Link to="/catalog">Каталог товаров</Link>
        <div className="circle-decoration"></div>
        <Link to="/catalog">Colombia Supremo</Link>
      </div>

      <div className="item-wrapper card-item">
        <div className="card-content-wrapper">
          <img className="card-img" src={coffe} alt="coffe" />
          <div className="card-content">
            <div className="card-grain">
              <ul>{renderGrain(4)}</ul>
            </div>
            <div className="card-title">Colombia Supremo</div>
            <div className="card-desc">
              Компания Нью Рефайнинг Груп находится в г. Калининграде и имеет
              свой склад и представительство в Москве. Завод работает на рынке
              свежеобжаренного кофе и растворимой продукции более 15 лет. Завод
              имеет немецкое оборудование марки Probat по обжарке кофе и
              итальянские агломераторы для производства растворимой продукции.
            </div>
            <div className="card-feature">
              <div className="card-coffe-characteristic">
                Кислинка
                <ul>{renderFeature(3)}</ul>
              </div>
              <div className="card-coffe-characteristic">
                Горчинка
                <ul>{renderFeature(7)}</ul>
              </div>
              <div className="card-coffe-characteristic">
                Насыщенность
                <ul>{renderFeature(2)}</ul>
              </div>
            </div>
            <div className="heft">
              <input
                type="radio"
                id="250"
                name="heft"
                value="email"
                checked
              ></input>
              <label htmlFor="250">250 г.</label>
              <input type="radio" id="1000" name="heft" value="email"></input>
              <label htmlFor="1000">1000 г.</label>
            </div>
            <div className="buy-wrapper">
              <div className="counter">
                <button className="counter-btn" onClick={()=>handlerCount(-1)}>-</button>
                <input type="text" className="counter-number" value={count} onChange={(e)=>changeCount(e)}/>
                <button className="counter-btn" onClick={()=>handlerCount(1)}>+</button>
              </div>
              <Button text='Купить за 250 ₽' classes="buy-btn"/>
            </div>
          </div>
        </div>
      </div>
      <div className="characteristic-wrapper">
        <div className="item-wrapper taste">
            <div className="taste-title">
                Вкус
            </div>
            <div className="taste-content">
                <div className="taste-content-item">
                    <img src={tasteIcon} alt="tasteIcon" className="taste-content-icon" />
                    <div className="taste-content-desc">Шоколад</div>
                </div>
                <div className="taste-content-item">
                    <img src={tasteIcon} alt="tasteIcon" className="taste-content-icon" />
                    <div className="taste-content-desc">Яблоко</div>
                </div>
                <div className="taste-content-item">
                    <img src={tasteIcon} alt="tasteIcon" className="taste-content-icon" />
                    <div className="taste-content-desc">Какао</div>
                </div>
            </div>
        </div>
        <div className="item-wrapper characteristic">
            <div className="characteristic-title">
                Характеристики
            </div>
            <div className="characteristic-desc">
                <div className="characteristic-desc-item">
                    <div className="characteristic-name">Арабика: </div>
                    <div className="desc">Перу гр.2, Эфиопия Сидамогр.4</div>
                </div>
                <div className="characteristic-desc-item">
                    <div className="characteristic-name">Робуста: </div>
                    <div className="desc">мытая Индия, сухой Вьетнам</div>
                </div>
                <div className="characteristic-desc-item">
                    <div className="characteristic-name">Способ обработки: </div>
                    <div className="desc">мытая, сухая</div>
                </div>
                <div className="characteristic-desc-item">
                    <div className="characteristic-name">Вид кофе: </div>
                    <div className="desc">cмесь арабика/робуста</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCoffe;
