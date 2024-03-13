import PropTypes from 'prop-types';

const Accordion = ({ children }) => {
  return <div className="join join-vertical w-full px-12">{children}</div>;
};

Accordion.propTypes = {
  children: PropTypes.node,
};

export default Accordion;
