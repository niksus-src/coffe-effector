import { useState } from "react";
import Search from "./search/Search";
import CustomLink from "../customLink/customLink";

import logo from "../../img/icons/logo.png";
import searchIcon from "../../img//icons/searchIcon.svg";
import accountIcon from "../../img//icons/accountIcon.svg";
import basketIcon from "../../img//icons/basketIcon.svg";

import "./navBar.scss";
import { useStore } from "effector-react";
import { appService } from "../../services/app/appService";
import Popup from "../popup/popup";

const NavBar = () => {
  const login = useStore(appService.$isLogin);
  const [isActiveBar, setIsActiveBar] = useState(false);
  const navStyle = isActiveBar ? "nav_active" : "";

  return (
    <nav className={navStyle}>
      <div className="nav-wrapper">
        <div className="logo">
          <CustomLink to="/">
            <img src={logo} alt="logo" />
          </CustomLink>
        </div>
        {!isActiveBar && (
          <div className="nav-content">
            <CustomLink to="/catalog">Каталог товаров</CustomLink>
            <CustomLink to="/contacts">Контакты</CustomLink>
          </div>
        )}
        {isActiveBar && <Search closeSearch={setIsActiveBar} />}
        <div className="nav-icons">
          {!isActiveBar && (
            <div
              className="nav-icons_search icon"
              onClick={() => setIsActiveBar(!isActiveBar)}
            >
              <img src={searchIcon} alt="searchIcon" />
            </div>
          )}
          <div className="nav-icons_basket icon">
            <CustomLink to="/basket">
              <img src={basketIcon} alt="basketIcon" />
            </CustomLink>
          </div>
          <div className="nav-icons_account icon">
            <CustomLink to="/account">
              <img src={accountIcon} alt="accountIcon" />
            </CustomLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
