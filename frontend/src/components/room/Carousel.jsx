import PropTypes from 'prop-types';
import defaultImage from '@/images/hotel_placeholder.png';
import DetailImage from '../images/DetailImage';

const Carousel = ({ images }) => {
  images.sort((a, b) => a.id - b.id);

  if (images.length === 0)
    return (
      <img src={defaultImage} alt="placeholder image" className="w-full mr-5" />
    );

  const scrollToItem = (index) => {
    const itemToScroll = document.getElementById(
      `image${images[index].hotelRoomTypeId}${index}`
    );
    itemToScroll.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <>
      <div className="carousel mr-5 rounded-l-lg">
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
                  <img src={image.base64Image} alt="Nice image of a room" />
                  {index === images.length - 1 && (
                    <div className="absolute flex justify-start transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <button
                        onClick={() => scrollToItem(index - 1)}
                        className="btn btn-circle"
                        type="button"
                      >
                        ❮
                      </button>
                    </div>
                  )}
                  {index === 0 && (
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <button
                        onClick={() => scrollToItem(index + 1)}
                        className="btn btn-circle"
                        type="button"
                      >
                        ❯
                      </button>
                    </div>
                  )}
                  {index > 0 && index < images.length - 1 && (
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <button
                        onClick={() => scrollToItem(index - 1)}
                        className="btn btn-circle"
                        type="button"
                      >
                        ❮
                      </button>
                      <button
                        onClick={() => scrollToItem(index + 1)}
                        className="btn btn-circle"
                        type="button"
                      >
                        ❯
                      </button>
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

export default Carousel;
