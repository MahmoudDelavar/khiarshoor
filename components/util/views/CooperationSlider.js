import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../../styles/carousel.module.css";

//=========================================
const CooperationSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: true,
    pauseOnHover: false,
  };
  return (
    <>
      <Col>
        <Slider {...settings} className={styles.sliderBox}>
          <div className="ml-2">
            <Image
              className={styles.sliderPic}
              src="/CooperationSlider/3.png"
              width={100}
              height={100}
              alt="faild"
            />
          </div>
          <div className="ml-2">
            <Image
              className={styles.sliderPic}
              src="/CooperationSlider/5.png"
              width={100}
              height={100}
              alt="faild"
            />
          </div>
          <div className="ml-2">
            <Image
              className={styles.sliderPic}
              src="/CooperationSlider/irib.png"
              width={100}
              height={100}
              alt="faild"
            />
          </div>
          <div className="ml-2">
            <Image
              className={styles.sliderPic}
              src="/CooperationSlider/khane.png"
              width={100}
              height={100}
              alt="faild"
            />
          </div>
        </Slider>{" "}
      </Col>
    </>
  );
};

export default CooperationSlider;
