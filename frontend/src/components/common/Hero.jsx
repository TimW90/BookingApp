const Hero = () => (
  <div className="hero min-h-50vh bg-base-200 rounded-box my-12">
    <div className="hero-content flex-col lg:flex-row">
      <img
        src="./src/images/Hotel.jpeg"
        className="max-w-sm rounded-lg shadow-2xl"
        alt="Image of a luxurious looking hotel"
      />
      <div>
        <h1 className="text-5xl font-bold">Box Office News!</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
);

export default Hero;
