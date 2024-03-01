import PropTypes from 'prop-types';

const Carousel = ({ images }) => {
  console.log(images);
  return (
    <>
      <div className="carousel mr-5">
        {(() => {
          if (images.length === 1) {
            console.log(images[0]);
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
                    <a
                      href={'#image' + (index == 0 ? (index = 0) : index - 1)}
                      className="btn btn-circle"
                    >
                      ❮
                    </a>
                    <a
                      href={
                        '#image' +
                        (index == images.length - 1
                          ? images.length - 1
                          : index + 1)
                      }
                      className="btn btn-circle"
                    >
                      ❯
                    </a>
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
