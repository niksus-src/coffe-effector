import "./salesSection.scss";
import Slider from "react-slick";
import Card from "../card/card";
import arrow from "../../img/icons/Arrow.svg";
import { useStore } from "effector-react";
import { appService } from "../../services/app/appService";
import { useEffect } from "react";

const SalesSection = () => {
  const coffes = useStore(appService.$coffes);

  const filteredCoffes = coffes.data.filter((coffe) => coffe.sale);
  console.log(filteredCoffes);

  useEffect(() => {
    if (coffes.length === 0) appService.fetchCoffesOffset();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    draggable: false,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1445,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false },
      },
      {
        breakpoint: 1025,
        settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false },
      },
      {
        breakpoint: 770,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };

  return (
    <>
      {filteredCoffes.length !== 0 && (
        <section className="sales-wrapper">
          <div className="sales-bg"></div>
          <div className="sales-grain"></div>
          <div className="sales-title">
            Товары со скидкой
            <div className="sales-title_desc">
              Наша компания предлагает покупать товар со скидкой не только в дни
              распродаж или в течение действия ограниченных предложений, но и
              пользоваться скидками постоянно!
            </div>
          </div>
          <div className="sales-cards">
            <Slider {...settings}>
              {filteredCoffes.map((coffe) => (
                <div key={coffe._id} className="sales-cards-item">
                  <Card
                    key={coffe._id}
                    name={coffe.name}
                    roasting={coffe.roasting}
                    sourness={coffe.sourness}
                    bitterness={coffe.bitterness}
                    saturation={coffe.saturation}
                    textBtn="Подробнее"
                    linkTo={`/itemCard/${coffe._id}`}
                    imgSrc={coffe.imgSrc}
                    price={coffe.price}
                    oldPrice={coffe.oldPrice}
                    sale={true}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}
    </>
  );
};

const SlickArrowLeft = (props: any) => {
  const { onClick } = props;
  return (
    <button className={`arrow arrow-left`} onClick={onClick}>
      <img src={arrow} alt="arrow" />
    </button>
  );
};

const SlickArrowRight = (props: any) => {
  const { onClick } = props;
  return (
    <button className={`arrow arrow-right`} onClick={onClick}>
      <img src={arrow} alt="arrow" />
    </button>
  );
};

export default SalesSection;
