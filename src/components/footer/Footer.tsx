import './footer.scss'
import logo from '../../img/icons/logo.png'

import { Link } from 'react-router-dom'

const Footer = () => {
    return(
        <footer className='footer'>
            <div className="footer-wrapper">
                <div className="footer-logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="footer-content">
                    <Link to="/catalog">Каталог товаров</Link>
                    <Link to="/contacts">Контакты</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer