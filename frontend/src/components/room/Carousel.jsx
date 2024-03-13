import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Is a hashIndex needed? Isn't the useState(0) of currentIndex not enough?
    // Should [images.length] not be [currentIndex] or no [] at all?
    // Extract the current index from window.location.hash
    const hashIndex = parseInt(window.location.hash.substring(6));
    if (!isNaN(hashIndex) && hashIndex >= 0 && hashIndex < images.length) {
      setCurrentIndex(hashIndex);
    }
    console.log('hashIndex = ' + hashIndex);
    console.log('currentIndex = ' + currentIndex);
  }, [images.length]);

  return (
    <>
      <div className="carousel mr-5">
        {(() => {
          // what if images === 0?
          if (images.length === 1) {
            return (
              <img
                src={images[0].base64Image}
                alt="Image of the room"
                className="w-full"
              />
            );
          } else {
            return images.map((image, index) => (
              <>
                <div
                  id={'image' + index}
                  className="carousel-item relative w-full"
                >
                  <img src={image.base64Image} alt="Image of the room" />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    {currentIndex > 0 && (
                      <a
                        href={'#image' + (currentIndex - 1)}
                        className="btn btn-circle"
                        onClick={() => setCurrentIndex(currentIndex - 1)}
                      >
                        ❮
                      </a>
                    )}
                    {currentIndex < images.length - 1 && (
                      <a
                        href={'#image' + (currentIndex + 1)}
                        className="btn btn-circle"
                        onClick={() => setCurrentIndex(currentIndex + 1)}
                      >
                        ❯
                      </a>
                    )}
                  </div>
                </div>
              </>
            ));
          }
        })()}
      </div>
    </>
  );
};

Carousel.propTypes = {
  images: PropTypes.img,
};

export default Carousel;
