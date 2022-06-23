import "./catalogCards.scss";

import Card from "../card/card";
import CustomSelectSort from "./CustomSelectSort";
import { useStore } from "effector-react";
import { appService } from "../../services/app/appService";
import { useEffect } from "react";

import Loader from "../loader/Loader";

import { serviceCatalog } from "../../services/catalog/catalogService";
import { Coffe } from "../types";

const CatalogCards = () => {
  const coffes = useStore(appService.$coffes);
  const filters = useStore(serviceCatalog.$catalogFiltersDirection);
  const sort = useStore(serviceCatalog.$catalogSortDirection);

  const loading = useStore(appService.$isLoading);
  const offset = useStore(appService.$offset);

  let filteredCoffes = filters.allAny
    ? coffes.data
    : coffes.data.filter((coffe) => {
        return (
          ((filters.geography && coffe.geography === filters.geography) ||
            !filters.geography) &&
          ((filters.kind && coffe.kind === filters.kind) || !filters.kind) &&
          ((filters.sourness && coffe.sournessDegree === filters.sourness) ||
            !filters.sourness) &&
          ((filters.roasting && coffe.roasting === +filters.roasting) ||
            !filters.roasting) &&
          ((filters.special && coffe.special === filters.special) ||
            !filters.special)
        );
      });

  filteredCoffes =
    filteredCoffes !== []
      ? filteredCoffes.sort((coffeA, coffeB) => {
          switch (sort) {
            case "ascPrice":
              return coffeA.price[250] - coffeB.price[250];
            case "descPrice":
              return coffeB.price[250] - coffeA.price[250];
            case "acidity":
              return coffeA.sourness - coffeB.sourness;
            default:
              return coffeB.price[250] - coffeA.price[250];
          }
        })
      : filteredCoffes;
  useEffect(() => {
    appService.fetchCoffesOffset();
  }, []);

  return (
    <>
      <div className="catalog-cards-wrapper">
        {loading && <Loader />}
        {filteredCoffes.length === 0 && (
          <div className="not-found">Ничего не найдено</div>
        )}
        {!loading && filteredCoffes.length !== 0 && (
          <>
            <CustomSelectSort />
            <div className="catalog-cards">
              {coffes !== null &&
                filteredCoffes.map((coffe: Coffe, i) => {
                  if (i >= offset) return;
                  return (
                    <Card
                      key={coffe._id}
                      name={coffe.name}
                      roasting={coffe.roasting}
                      sourness={coffe.sourness}
                      bitterness={coffe.bitterness}
                      saturation={coffe.saturation}
                      imgSrc={coffe.imgSrc}
                      price={coffe.price}
                      sale={coffe.sale}
                      oldPrice={coffe.oldPrice}
                      classes="catalog-card"
                      textBtn="Подробнее"
                      linkTo={`/itemCard/${coffe._id}`}
                    />
                  );
                })}
            </div>
            <button
              className="catalog-cards_btn"
              disabled={loading || offset >= coffes.length}
              onClick={() => {
                appService.setOffset(offset + 6);
              }}
            >
              Показать еще
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CatalogCards;
