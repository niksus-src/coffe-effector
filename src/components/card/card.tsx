
import './card.scss'
import grain from '../../img/icons/grain.png'
import coffe from '../../img/coffe/coffe.png'

import Button from '../button/button'
import { ReactElement } from 'react'

type Props = {
    name: string,
    roasting: number,
    sourness: number,
    bitterness: number,
    saturation: number,
}

const Card: React.FC<Props> = ({name, roasting, sourness, bitterness, saturation}) => {

    const renderFeature = (amount: number = 1) => {
        let renderElements = []
        
        for (let index = 0; index < amount; index++) {
            renderElements.push(<li key={index}><div className="active"></div></li>)
        }
        if (amount !== 10) {
            for (let index = amount; index < 10; index++) {
                renderElements.push(<li key={index}><div className="disable"></div></li>)
            }
        }
        return renderElements
    }

    const renderGrain = (amount: number = 1) => {
        let renderElements = []

        for (let index = 0; index <= amount; index++) {
            renderElements.push(<li key={index}><img src={grain} alt="grain" /></li>)
        }
        return renderElements
    }

    return(
        <div className="card" key={name}>
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
                        {renderGrain(roasting)}
                        </ul>
                    </div>
                    <div className="card-coffe-characteristic">
                        Кислинка
                        <ul>
                            {renderFeature(sourness)}
                        </ul>
                    </div>
                    <div className="card-coffe-characteristic">
                        Горчинка
                        <ul>
                            {renderFeature(bitterness)}
                        </ul>
                    </div>
                    <div className="card-coffe-characteristic">
                        Насыщенность
                        <ul>
                            {renderFeature(saturation)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="card-title">{name}</div>
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