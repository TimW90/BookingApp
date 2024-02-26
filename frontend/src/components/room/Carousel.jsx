const Carousel = () => (
  <>
    <div className="carousel">
      <p>Discription of the room</p>
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://assets.vandervalkonline.com/inc/hotels/37/rooms/250/1024x768_2023%252D09%252D04%252DVDV%252DAmersfoort%252D0032%252Ejpg&w=2048&h=1152&fmt=webp"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle ml-auto">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://assets.vandervalkonline.com/inc/hotels/37/rooms/250/1024x768_2023%252D09%252D04%252DVDV%252DAmersfoort%252D0073%252Ejpg&w=2048&h=1152&fmt=webp"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
        </div>
      </div>
    </div>
    <div className="flex justify-center py-2 gap-2">
      <a href="#slide1" className="btn btn-xs">
        1
      </a>
      <a href="#slide2" className="btn btn-xs">
        2
      </a>
    </div>
  </>
);

export default Carousel;
