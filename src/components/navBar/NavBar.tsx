import { Link } from 'react-router-dom'
import { useState } from 'react'
import Search from './search/Search'

import logo from '../../img/icons/logo.png'
import searchIcon from '../../img//icons/searchIcon.svg'
import accountIcon from '../../img//icons/accountIcon.svg'
import basketIcon from '../../img//icons/basketIcon.svg'

import './navBar.scss'

const NavBar = () => {

    const [isActiveBar, setIsActiveBar] = useState(false)
    const navStyle = isActiveBar ? "nav_active" : ""

    return(
        <nav className={navStyle}>
            <div className="nav-wrapper">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                {
                    !isActiveBar && 
                    <div className="nav-content">
                        <Link to="/catalog">Каталог товаров</Link>
                        <Link to="/contacts">Контакты</Link>
                    </div>
                }
                { isActiveBar && <Search/>}
                <div className="nav-icons">
                    {
                        !isActiveBar && 
                        <div className="nav-icons_search icon" onClick={() => setIsActiveBar(!isActiveBar)}>
                            <img src={searchIcon} alt="searchIcon" />
                        </div>
                    }
                    <div className="nav-icons_basket icon">
                        <Link to="/contacts">
                            <img src={basketIcon} alt="basketIcon" />
                        </Link>
                    </div>
                    <div className="nav-icons_account icon">
                        <img src={accountIcon} alt="accountIcon" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar