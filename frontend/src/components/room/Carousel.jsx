import PropTypes from 'prop-types';

const Carousel = ({ images }) => {
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
                    {index > 0 && (
                      <a
                        href={'#image' + (index - 1)}
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                    )}
                    {index < images.length - 1 && (
                      <a
                        href={'#image' + (index + 1)}
                        className="btn btn-circle"
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
