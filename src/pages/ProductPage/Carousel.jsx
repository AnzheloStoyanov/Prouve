import { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import PropTypes from "prop-types";
import "keen-slider/keen-slider.min.css"
import "./styles.css"

const Carousel = ({ images }) => {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
const missingImages =['https://www.bonbonentertainment.nl/wp-content/uploads/2021/06/no-image.jpg']
  return (
    <>{
        images
        &&
        <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {images.map((image, index) => (
            // <div
            //   key={index}
            //   className={`keen-slider__slide number-slide${index + 1}`}
            //   style={{
            //     backgroundImage: `url(${image})`,
            //   }}
            // ></div>
            <img  className={`keen-slider__slide number-slide${index + 1}`}  key={index} src={image}></img>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              );
            })}
          </div>
        )}
      </div>
    }
      
    </>
  );
}
Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
  };
export default Carousel