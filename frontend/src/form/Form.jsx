import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const Form = ({ defaultValues, children, onSubmit }) => {
  const { handleSubmit } = useForm({ defaultValues });

  return (
    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
