
import background from '../../img/top-section/background.svg'

import Button from '../button/button'

import './titleSection.scss'

const TitleSection = () => {

    return(
        <section className="title-wrapper">
            <div className="title-bg"></div>
            <div className="coffe"></div>
            <div className="title-content">
                <div className="title-content_text">
                    <div className="title">Свежеобжаренный кофе</div>
                    <div className="title-desc">
                    Кофе Калининградской обжарки из разных стран произрастания с доставкой на дом.<br/><br/><br/>
                    Мы обжариваем кофе <span>каждые выходные</span>.
                    </div>
                <Button text='Подробнее' classes='title-btn'/>
                </div>
            </div>
        </section>
    )
}

export default TitleSection