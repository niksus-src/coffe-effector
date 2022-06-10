import './salesSection.scss'
import Slider from "react-slick";
import Card from '../card/card'
import arrow from '../../img/icons/Arrow.svg'

const SalesSection = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        draggable: false,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        responsive: [
            {
              breakpoint: 1025,
              settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false }
            },
            {
                breakpoint: 770,
                settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }
              }
        ]
      };
    
    return(
        <section className="sales-wrapper">
            <div className="sales-bg"></div>
            <div className="sales-grain"></div>
            <div className="sales-title">
                Товары со скидкой
                <div className="sales-title_desc">
                    Наша компания предлагает покупать товар со скидкой не только в дни распродаж 
                    или в течение действия ограниченных предложений, но и пользоваться скидками постоянно! 
                </div>
            </div>
        <div className="sales-cards">
            <Slider {...settings}>
                <div className='sales-cards-item'><Card name='Colombia Supremo' roasting={3} sourness={6} bitterness={2} saturation={5}/></div>
                <div className='sales-cards-item'><Card name='Blend Espresso' roasting={1} sourness={9} bitterness={5} saturation={1}/></div>
                <div className='sales-cards-item'><Card name='Blend Gurme' roasting={5} sourness={2} bitterness={4} saturation={4}/></div>
                <div className='sales-cards-item'><Card name='Brazil Santos' roasting={2} sourness={1} bitterness={7} saturation={7}/></div>
                <div className='sales-cards-item'><Card name='Brazil Yellow Bourbon' roasting={0} sourness={1} bitterness={2} saturation={10}/></div>
                <div className='sales-cards-item'><Card name='Columbia Decaff' roasting={3} sourness={6} bitterness={1} saturation={5}/></div>
            </Slider>
        </div>

        </section>
    )
}

const SlickArrowLeft = (props:any) => {
    const { onClick } = props;
    return(
        <button 
        className={`arrow arrow-left`}
        onClick={onClick}>
            <img src={arrow} alt="arrow" />
        </button>
    )
}

const SlickArrowRight = (props:any) => {
    const {  onClick } = props;
    return(
        <button 
        className={`arrow arrow-right`}
        onClick={onClick}>
            <img src={arrow} alt="arrow" />
        </button>
    )
}


export default SalesSection