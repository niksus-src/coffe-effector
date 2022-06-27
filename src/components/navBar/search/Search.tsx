import { useStore } from "effector-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import searchIconGray from "../../../img/icons/searchIconGray.svg";
import { appService } from "../../../services/app/appService";

import "./search.scss";

type Props = {
  closeSearch: Dispatch<SetStateAction<boolean>>;
};

const Search: React.FC<Props> = ({ closeSearch }) => {
  const coffes = useStore(appService.$foundCoffes);
  console.log(coffes);

  const [isActive, setIsActive] = useState(false);
  const searchStyle = isActive ? "search search_active" : "search";
  const inputStyle = isActive
    ? "search-input search-input_active"
    : "search-input";

  const activeFound = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsActive(true);
      if (e.target.value.trim() !== "") {
        console.log(!(e.target.value.trim() !== ""));

        appService.fetchFoundCoffes(e.target.value);
      }
    } else setIsActive(false);
  };

  return (
    <>
      <div className={searchStyle}>
        <div className="search-icon">
          <img src={searchIconGray} alt="search" />
        </div>
        <input
          className={inputStyle}
          type="text"
          placeholder="Поиск по товарам"
          onChange={(e) => {
            activeFound(e);
          }}
        />
        <div className="close-search" onClick={() => closeSearch(false)}>
          &#10006;
        </div>
        {isActive && (
          <div className="found">
            {coffes.length > 0 &&
              coffes.data.map((coffe) => (
                <Link
                  to={`/itemCard/${coffe._id}`}
                  className="found-item"
                  key={coffe._id}
                  onClick={() => {
                    setIsActive(false);
                    closeSearch(false);
                  }}
                >
                  {coffe.name}
                </Link>
              ))}
            {coffes.length === 0 && (
              <div className="found-empty">Ничего не найдено</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
