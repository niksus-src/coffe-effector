
import './card.scss'
import grain from '../../img/icons/grain.png'
import coffe from '../../img/coffe/coffe.png'

import Button from '../button/button'

const Card = () => {

    return(
        <div className="card">
            <div className="heft">
                <select name="heft" id="heft">
                    <option value="250">250 г.</option>
                    <option value="250">1000 г.</option>
                </select>
            </div>
            <div className="card-content">
                <div className="card-img">
                    <img src={coffe} alt="coffe" />
                </div>
                <div className="card-feature">
                    <div className="card-grain">
                        <ul>
                            <li><img src={grain} alt="grain" /></li>
                            <li><img src={grain} alt="grain" /></li>
                            <li><img src={grain} alt="grain" /></li>
                        </ul>
                    </div>
                    <div className="card-coffe-characteristic">
                        Кислинка
                        <ul>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                        </ul>
                    </div>
                    <div className="card-coffe-characteristic">
                        Горчинка
                        <ul>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                        </ul>
                    </div>
                    <div className="card-coffe-characteristic">
                        Насыщенность
                        <ul>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="active"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                            <li><div className="disable"></div></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="card-title">Blend Crema</div>
            <div className="card-desc">Свежеобжаренный кофе - описание товара, вкус, аромат</div>

            <div className="card-footer">            
                <div className="price">250 ₽
                    <div className="oldPrice">350 ₽</div>
                </div>
                <Button text='В корзину' classes='card-btn'/>
            </div>
            <div className="sale">%</div>
        </div>
    )
}

export default Card