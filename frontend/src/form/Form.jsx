import PropTypes from 'prop-types';

const Form = ({ children, onSubmit }) => {
  return (
    <form className="card-body" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.propTypes = {
  defaultValues: PropTypes.object,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

export default Form;
