import PropTypes from 'prop-types';
import PreviewImage from '../images/PreviewImage';
import StarRating from '../hotel/StarRating';
import AdminButtons from '../hotel/AdminButtons';
import DetailImage from '../images/DetailImage';
import { Link } from 'react-router-dom';

const AccordionCard = ({ item, isAdmin, cardType, index }) => (
  <div className="collapse join-item bg-base-200 px-12 my-0.5">
    <input
      type={isAdmin ? 'checkbox' : 'radio'}
      name="my-accordion-1"
      aria-label={`${cardType}-item`}
      defaultChecked={index === 0 || isAdmin} // Check the first item in the list.
    />

    <div className="flex items-center justify-between collapse-title prose min-w-full p-0">
      <div className="flex items-center gap-4">
        <PreviewImage image={item.base64Image} />
        <h2 className="m-0">{item.name}</h2>

        {isAdmin && <AdminButtons item={item} type={'hotel'} />}
      </div>
      <StarRating amountOfStars={Number(item.starRating)} />
    </div>

    <div className="collapse-content flex justify-between">
      <article className="w-2/5 prose">
        <h3 className="m-0">Description</h3>
        <hr className="mb-2"></hr>
        <p>{item.description}</p>
      </article>

      <div className="flex flex-col justify-center">
        <DetailImage image={item.base64Image} />

        <div className="m-3 flex justify-center">
          <Link className="btn btn-secondary" to={`/${cardType}/${item.id}`}>
            Go to {cardType}
          </Link>
        </div>
      </div>
    </div>
  </div>
);

AccordionCard.propTypes = {
  item: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  index: PropTypes.number,
  cardType: PropTypes.string.isRequired,
};

export default AccordionCard;
