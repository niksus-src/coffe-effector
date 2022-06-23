import { Link, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import "./itemCoffe.scss";
import Button from "../button/button";
import grain from "../../img/icons/grain.svg";
import tasteIcon from "../../img/item-card/taste-icon.svg";

import { appService } from "../../services/app/appService";
import { useStore } from "effector-react";

type Params = {
  id: string;
};

const ItemCoffe = () => {
  const [count, setCount] = useState(1);
  const [actualHeft, setActualHeft] = useState("250");

  const { id } = useParams<Params>();

  useEffect(() => {
    appService.fetchCoffeById(`${id}`);
  }, [id]);

  const coffe = useStore(appService.$coffe);

  const actualPrice =
    coffe?.price[actualHeft] !== null ? coffe?.price[actualHeft]! * count : "0";

  let renderKind = "";

  switch (coffe?.kind) {
    case "arabica":
      renderKind = "Арабика";
      break;
    case "robusta":
      renderKind = "Робуста";
      break;
    case "mixture":
      renderKind = "Смесь Арабика/Робуста";
      break;
    default:
      break;
  }

  const handlerCount = (increase: number) => {
    if ((count === 1 && increase < 1) || (count > 98 && increase > 0)) return;
    setCount(count + increase);
  };

  const changeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    if (target.match(/^\d+$/) !== null && +target < 100) setCount(+target);
  };

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
    <>
      {coffe === null && (
        <div className="item not-found">Ничего не найдено</div>
      )}
      {coffe !== null && (
        <div className="item">
          <div className="links-item-coffe">
            <Link to="/">Главная</Link>
            <div className="circle-decoration-item-coffe"></div>
            <Link to="/catalog">Каталог товаров</Link>
            <div className="circle-decoration-item-coffe"></div>
            <Link to="/catalog">{coffe.name}</Link>
          </div>

          <div className="item-wrapper card-item">
            <div className="card-main-wrapper">
              <img
                className="card-img"
                src={process.env.PUBLIC_URL + coffe.imgSrc}
                alt="coffe"
              />
              <div className="card-main">
                <div className="card-grain-item">
                  <ul>{renderGrain(coffe.roasting)}</ul>
                </div>
                <div className="card-title">{coffe.name}</div>
                <div className="card-desc">{coffe.desc}</div>
                <div className="card-feature-item">
                  <div className="card-coffe-characteristic">
                    Кислинка
                    <ul>{renderFeature(coffe.sourness)}</ul>
                  </div>
                  <div className="card-coffe-characteristic">
                    Горчинка
                    <ul>{renderFeature(coffe.bitterness)}</ul>
                  </div>
                  <div className="card-coffe-characteristic">
                    Насыщенность
                    <ul>{renderFeature(coffe.saturation)}</ul>
                  </div>
                </div>
                <div className="heft-item">
                  <input
                    type="radio"
                    id="250"
                    name="heft"
                    value="email"
                    checked={actualHeft === "250"}
                    onChange={() => setActualHeft("250")}
                  ></input>
                  <label htmlFor="250">250 г.</label>
                  <input
                    type="radio"
                    id="1000"
                    name="heft"
                    value="email"
                    checked={actualHeft === "1000"}
                    onChange={() => setActualHeft("1000")}
                  ></input>
                  <label htmlFor="1000">1000 г.</label>
                </div>
                <div className="buy-wrapper">
                  <div className="counter">
                    <button
                      className="counter-btn"
                      onClick={() => handlerCount(-1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="counter-number"
                      value={count}
                      onChange={(e) => changeCount(e)}
                    />
                    <button
                      className="counter-btn"
                      onClick={() => handlerCount(1)}
                    >
                      +
                    </button>
                  </div>
                  <Button
                    text={`Купить за ${actualPrice} ₽`}
                    classes="buy-btn"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="characteristic-wrapper">
            <div className="item-wrapper taste">
              <div className="taste-title">Вкус</div>
              <div className="taste-content">
                {coffe.taste?.map((elem, i) => (
                  <div className="taste-content-item" key={i}>
                    <img
                      src={tasteIcon}
                      alt="tasteIcon"
                      className="taste-content-icon"
                    />
                    <div className="taste-content-desc">{elem}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="item-wrapper characteristic">
              <div className="characteristic-title">Характеристики</div>
              <div className="characteristic-desc">
                <div className="characteristic-desc-item">
                  <div className="characteristic-name">
                    Страна производитель:
                  </div>
                  <div className="desc">{coffe.manufacturer}</div>
                </div>
                <div className="characteristic-desc-item">
                  <div className="characteristic-name">Способ обработки: </div>
                  <div className="desc">{coffe.processing}</div>
                </div>
                <div className="characteristic-desc-item">
                  <div className="characteristic-name">
                    Вид кофейного дерева:{" "}
                  </div>
                  <div className="desc">{renderKind}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemCoffe;
