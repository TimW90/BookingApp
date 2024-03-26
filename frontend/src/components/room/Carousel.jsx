import PropTypes from 'prop-types';

const Carousel = ({ images }) => {
  images.sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="carousel no-snap mr-5">
        {(() => {
          // what if images === 0? A placeholder?
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
                  id={'image' + image.hotelRoomTypeId + index}
                  className="carousel-item relative w-full"
                >
                  {/*In img src: onClick popup with the image (or carousel) being enlarged */}
                  <img src={image.base64Image} alt="Image of the room" />
                  {index === images.length - 1 && (
                    <div className="absolute flex justify-start transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a
                        href={'#image' + image.hotelRoomTypeId + (index - 1)}
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                    </div>
                  )}
                  {index === 0 && (
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a
                        href={'#image' + image.hotelRoomTypeId + (index + 1)}
                        className="btn btn-circle"
                      >
                        ❯
                      </a>
                    </div>
                  )}
                  {index > 0 && index < images.length - 1 && (
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a
                        href={'#image' + image.hotelRoomTypeId + (index - 1)}
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                      <a
                        href={'#image' + image.hotelRoomTypeId + (index + 1)}
                        className="btn btn-circle"
                      >
                        ❯
                      </a>
                    </div>
                  )}
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
  isAdmin: PropTypes.bool,
};

export default Carousel;
