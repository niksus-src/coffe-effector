import "./catalogCards.scss";

import Card from "../card/card";
import CustomSelectSort from "./CustomSelectSort";
import Popup from "../popup/popup";

const CatalogCards = () => {
  return (
    <div className="catalog-cards-wrapper">
      <Popup />
      <CustomSelectSort />
      <div className="catalog-cards">
        <Card
          name="Blend Crema"
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
        <Card
          name={"Blend Crema"}
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
        <Card
          name={"Blend Crema"}
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          sale={true}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
        <Card
          name={"Blend Crema"}
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
        <Card
          name={"Blend Crema"}
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
        <Card
          name={"Blend Crema"}
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
        <Card
          name={"Blend Crema"}
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
        <Card
          name={"Blend Crema"}
          roasting={3}
          sourness={6}
          bitterness={4}
          saturation={7}
          classes="catalog-card"
          textBtn="Подробнее"
          linkTo="/itemCard"
        />
      </div>
      <button className="catalog-cards_btn">Показать еще</button>
    </div>
  );
};

export default CatalogCards;
