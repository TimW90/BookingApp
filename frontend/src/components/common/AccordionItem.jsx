import PreviewImage from './PreviewImage';
import StarRating from '../hotel/StarRating';
import AdminButtons from '../hotel/AdminButtons';

const AccordionItem = ({ item, children, isAdmin }) => {
  return (
    <div className="collapse join-item bg-base-200 px-12 my-0.5">
      <input
        type={isAdmin ? 'checkbox' : 'radio'}
        name="my-accordion-1"
        aria-label={item.name}
        defaultChecked={item.id === 1}
      />

      {/* Title part of the accordion item aka the collapse-title */}
      <div className="flex items-center justify-between collapse-title prose min-w-full p-0">
        <div className="flex items-center gap-4">
          <PreviewImage image={item.base64Image} />
          <h2 className="m-0">{item.name}</h2>

          {isAdmin && <AdminButtons hotel={item} />}
        </div>
        <StarRating amountOfStars={item.rating} />
      </div>

      {/* The body of the accordion item everything that renders in the open state */}
      <div className="collapse-content flex justify-between">{children}</div>
    </div>
  );
};

export default AccordionItem;
