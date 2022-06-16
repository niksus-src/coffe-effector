import "./catalogForm.scss";

import { Link } from "react-router-dom";
import { useStore } from "effector-react";
import { serviceCatalog } from "../../services/catalog/catalogService";
import background from "../../img/catalog/background.png";
import coffe from "../../img/catalog/coffe.png";
import grain from "../../img/icons/grain.png";

const CatalogForm = () => {
  const filters = useStore(serviceCatalog.$catalogFiltersDirection);

  return (
    <>
      <img src={background} alt="background" className="catalog-bg" />
      <div className="catalog-form">
        <div className="links">
          <Link to="/">Главная</Link>
          <div className="circle-decoration"></div>
          <Link to="/catalog">Каталог товаров</Link>
        </div>

        <div className="catalog-title">
          <div className="catalog-title-text">Свежеобжаренный кофе</div>
          <img src={coffe} alt="coffe" className="catalog-title-img" />
        </div>
        <div className="catalog-form-content">
          <div className="form-wrapper catalog-form-content-grain">
            <div className="catalog-form-content-grain_decoration"></div>
            <div className="catalog-form-content-grain_form">
              <div className="catalog-form-content-grain_title">
                Степень обжарки
              </div>
              <div className="radio-grain">
                <input
                  checked={filters.roasting === "5"}
                  type="radio"
                  id="5"
                  name="grain"
                  value="5"
                  onChange={(e) =>
                    serviceCatalog.setFilters({ roasting: e.target.value })
                  }
                ></input>
                <label htmlFor="5">
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                </label>
                <input
                  checked={filters.roasting === "4"}
                  type="radio"
                  id="4"
                  name="grain"
                  value="4"
                  onChange={(e) =>
                    serviceCatalog.setFilters({ roasting: e.target.value })
                  }
                ></input>
                <label htmlFor="4">
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                </label>
                <input
                  checked={filters.roasting === "3"}
                  type="radio"
                  id="3"
                  name="grain"
                  value="3"
                  onChange={(e) =>
                    serviceCatalog.setFilters({ roasting: e.target.value })
                  }
                ></input>
                <label htmlFor="3">
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                </label>
                <input
                  checked={filters.roasting === "2"}
                  type="radio"
                  id="2"
                  name="grain"
                  value="2"
                  onChange={(e) =>
                    serviceCatalog.setFilters({ roasting: e.target.value })
                  }
                ></input>
                <label htmlFor="2">
                  <img src={grain} alt="grain" className="grain" />
                  <img src={grain} alt="grain" className="grain" />
                </label>
                <input
                  checked={filters.roasting === "1"}
                  type="radio"
                  id="1"
                  name="grain"
                  value="1"
                  onChange={(e) =>
                    serviceCatalog.setFilters({ roasting: e.target.value })
                  }
                ></input>
                <label htmlFor="1">
                  <img src={grain} alt="grain" className="grain" />
                </label>
              </div>
            </div>
          </div>
          <div className="form-wrapper catalog-form-content-main">
            <div className="catalog-form-content-main_decoration"></div>
            <div className="catalog-form-content-main_wrapper">
              <div className="catalog-form-content-main_item">
                <div className="catalog-form-content-main_title">География</div>
                <div className="radio-main">
                  <input
                    checked={filters.geography === "africa"}
                    type="radio"
                    id="africa"
                    name="geography"
                    value="africa"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ geography: e.target.value })
                    }
                  ></input>
                  <label htmlFor="africa">Африка</label>

                  <input
                    checked={filters.geography === "yemen"}
                    type="radio"
                    id="yemen"
                    name="geography"
                    value="yemen"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ geography: e.target.value })
                    }
                  ></input>
                  <label htmlFor="yemen">Йемен</label>

                  <input
                    checked={filters.geography === "ethiopia"}
                    type="radio"
                    id="ethiopia"
                    name="geography"
                    value="ethiopia"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ geography: e.target.value })
                    }
                  ></input>
                  <label htmlFor="ethiopia">Эфиопия</label>

                  <input
                    checked={filters.geography === "asia"}
                    type="radio"
                    id="asia"
                    name="geography"
                    value="asia"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ geography: e.target.value })
                    }
                  ></input>
                  <label htmlFor="asia">Азия</label>

                  <input
                    checked={filters.geography === "сAmerica"}
                    type="radio"
                    id="сAmerica"
                    name="geography"
                    value="сAmerica"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ geography: e.target.value })
                    }
                  ></input>
                  <label htmlFor="сAmerica">Центр. Америка</label>

                  <input
                    checked={filters.geography === "lAmerica"}
                    type="radio"
                    id="lAmerica"
                    name="geography"
                    value="lAmerica"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ geography: e.target.value })
                    }
                  ></input>
                  <label htmlFor="lAmerica">Лат. Америка</label>
                </div>
              </div>
              <div className="catalog-form-content-main_item">
                <div className="catalog-form-content-main_title">Кислинка</div>
                <div className="radio-main">
                  <input
                    checked={filters.sourness === "low"}
                    type="radio"
                    id="low"
                    name="sourness"
                    value="low"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ sourness: e.target.value })
                    }
                  ></input>
                  <label htmlFor="low">Низкая</label>

                  <input
                    checked={filters.sourness === "middle"}
                    type="radio"
                    id="middle"
                    name="sourness"
                    value="middle"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ sourness: e.target.value })
                    }
                  ></input>
                  <label htmlFor="middle">Средняя</label>

                  <input
                    checked={filters.sourness === "high"}
                    type="radio"
                    id="high"
                    name="sourness"
                    value="high"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ sourness: e.target.value })
                    }
                  ></input>
                  <label htmlFor="high">Высокая</label>
                </div>
              </div>
              <div className="catalog-form-content-main_item">
                <div className="catalog-form-content-main_title">Особые</div>
                <div className="radio-main">
                  <input
                    checked={filters.special === "popular"}
                    type="radio"
                    id="popular"
                    name="special"
                    value="popular"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ special: e.target.value })
                    }
                  ></input>
                  <label htmlFor="popular">Популярное</label>

                  <input
                    checked={filters.special === "newCrop"}
                    type="radio"
                    id="newCrop"
                    name="special"
                    value="newCrop"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ special: e.target.value })
                    }
                  ></input>
                  <label htmlFor="newCrop">Новый урожай</label>

                  <input
                    checked={filters.special === "yourChoice"}
                    type="radio"
                    id="yourChoice"
                    name="special"
                    value="yourChoice"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ special: e.target.value })
                    }
                  ></input>
                  <label htmlFor="yourChoice">Ваш выбор</label>

                  <input
                    checked={filters.special === "microlot"}
                    type="radio"
                    id="microlot"
                    name="special"
                    value="microlot"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ special: e.target.value })
                    }
                  ></input>
                  <label htmlFor="microlot">Микролот</label>

                  <input
                    checked={filters.special === "sortWeek"}
                    type="radio"
                    id="sortWeek"
                    name="special"
                    value="sortWeek"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ special: e.target.value })
                    }
                  ></input>
                  <label htmlFor="sortWeek">Сорт недели</label>

                  <input
                    checked={filters.special === "sales"}
                    type="radio"
                    id="sales"
                    name="special"
                    value="sales"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ special: e.target.value })
                    }
                  ></input>
                  <label htmlFor="sales">Скидки</label>

                  <input
                    checked={filters.special === "new"}
                    type="radio"
                    id="new"
                    name="special"
                    value="new"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ special: e.target.value })
                    }
                  ></input>
                  <label htmlFor="new">Новинка</label>
                </div>
              </div>
              <div className="catalog-form-content-main_item">
                <div className="catalog-form-content-main_title">Вид кофе</div>
                <div className="radio-main">
                  <input
                    checked={filters.kind === "arabica"}
                    type="radio"
                    id="arabica"
                    name="kind"
                    value="arabica"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ kind: e.target.value })
                    }
                  ></input>
                  <label htmlFor="arabica">Арабика</label>

                  <input
                    checked={filters.kind === "robusta"}
                    type="radio"
                    id="robusta"
                    name="kind"
                    value="robusta"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ kind: e.target.value })
                    }
                  ></input>
                  <label htmlFor="robusta">Робуста</label>

                  <input
                    checked={filters.kind === "mixture"}
                    type="radio"
                    id="mixture"
                    name="kind"
                    value="mixture"
                    onChange={(e) =>
                      serviceCatalog.setFilters({ kind: e.target.value })
                    }
                  ></input>
                  <label htmlFor="mixture">Смесь</label>
                </div>
                <button
                  className="catalog-form-btn"
                  onClick={() => serviceCatalog.resetFilters()}
                >
                  Очистить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogForm;
