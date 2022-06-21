import "./dignitySection.scss";

import coffe from "../../img/dignity-section/coffe.png";
import iconCoffe from "../../img/dignity-section/icon-coffe.svg";
import iconSale from "../../img/dignity-section/icon-sale.svg";
import iconCons from "../../img/dignity-section/icon-cons.svg";

import Button from "../button/button";

const Dignity = () => {
  return (
    <section className="dignity">
      {/* <div className="dignity-bg"></div> */}
      <div className="dignity-top">
        <div className="dignity-coffe">
          <img src={coffe} alt="coffe" />
        </div>
        <div className="dignity-top-title">
          Почему стоит работать именно с нами?
        </div>
        <div className="dignity-top-content">
          <ul>
            <li>
              <img
                src={iconCoffe}
                alt="iconCoffe"
                className="dignity-li-marker"
              />
              <div className="dignity-top-content-el-title">
                Всегда свежая обжарка
              </div>
              <div className="dignity-top-content-el-desc">
                Подбор степени обжарки под каждый сорт кофе. Всегда свежая
                обжарка
              </div>
            </li>
            <li>
              <img
                src={iconSale}
                alt="iconSale"
                className="dignity-li-marker"
              />
              <div className="dignity-top-content-el-title">
                Лучшие цены на продукцию
              </div>
              <div className="dignity-top-content-el-desc">
                Благодаря крупным объемам производства мы даем лучшие цены на
                нашу продукцию
              </div>
            </li>
            <li>
              <img
                src={iconCons}
                alt="iconCons"
                className="dignity-li-marker"
              />
              <div className="dignity-top-content-el-title">
                Консультации 24/7
              </div>
              <div className="dignity-top-content-el-desc">
                Наши специалисты готовы всегда помочь и подсказать вам с выбором
                кофе или другой продукции.
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="dignity-bottom">
        <div className="dignity-bottom-content">
          <div className="dignity-bottom-title">
            Как мы обжариваем наш кофе:
          </div>
          <div className="dignity-bottom-desc">
            Компания Нью Рефайнинг Груп находится в г. Калининграде и имеет свой
            склад и представительство в Москве. Завод работает на рынке
            свежеобжаренного кофе и растворимой продукции более 15 лет. Завод
            имеет немецкое оборудование марки Probat по обжарке кофе и
            итальянские агломераторы для производства растворимой продукции.
            <br />
            <br />
            Кофе поставляется в контейнерах напрямую с плантаций по всему миру.
            Компания имеет долгосрочные контракты по поставке продукции. Каждая
            партия проходит строгий контроль на заводе для проверки зерна.
            Зеленое зерно обжаривается, проходит процесс дегазации и тут же
            отправляется клиентам. Наши обжарщики прошли обучение в России и за
            рубежом. У нас свой подход к каждой партии зерна.
            <br />
            <br />
            Мы раскрываем вкус каждого сорта кофе.
          </div>
          <Button
            text={"Перейти в каталог"}
            classes={"dignity-bottom-btn"}
            linkTo="/catalog"
          />
        </div>
      </div>
    </section>
  );
};

export default Dignity;
