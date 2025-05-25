import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderBanner.css";

import banner2 from "../../assets/baner4.png";
import banner1 from "../../assets/baner13.png";
import banner3 from "../../assets/baner14.png";

const images = [
  { url: banner1,  },
  { url: banner2,  },
  { url: banner3, },
];

const SliderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  return (
    <div className="slider-container ">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <a href={img.link} target="_blank" rel="noopener noreferrer">
              <img src={img.url} alt={`Banner ${index + 1}`} className="banner-img" />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderBanner;
