import './footer.scss'
import logo from '../../img/icons/logo.png'

import { Link } from 'react-router-dom'
import CustomLink from '../customLink/customLink'

const Footer = () => {
    return(
        <footer className='footer'>
            <div className="footer-wrapper">
                <div className="footer-logo">
                    <CustomLink to="/">
                        <img src={logo} alt="logo" />
                    </CustomLink>
                </div>
                <div className="footer-content">
                    <CustomLink to="/catalog">Каталог товаров</CustomLink>
                    <CustomLink to="/contacts">Контакты</CustomLink>
                </div>
            </div>
        </footer>
    )
}

export default Footer