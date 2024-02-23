const Accordeon = () => (
  <>
    <div className="collapse bg-base-200">
      <input
        type="radio"
        name="my-accordion-1"
        aria-label="roomelement"
        defaultChecked
      />
      <div className="collapse-title text-xl font-medium">
        Click to open this one and close others
      </div>
      <div className="collapse-content">Hello</div>
    </div>
    <div className="collapse bg-base-200">
      <input type="radio" name="my-accordion-1" aria-label="roomelement" />
      <div className="collapse-title text-xl font-medium">
        Click to open this one and close others
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
    <div className="collapse bg-base-200">
      <input type="radio" name="my-accordion-1" aria-label="roomelement" />
      <div className="collapse-title text-xl font-medium">
        Click to open this one and close others
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  </>
);

export default Accordeon;
