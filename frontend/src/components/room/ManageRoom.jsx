import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string, mixed } from 'yup';

const roomSchema = object().shape({
  name: string().required('Name is a required field'),
  type: string().required('Type is a required field'),
  price: number()
    .required('Price is a required field')
    .positive('Price should be a positive number'),
  image: mixed(),
  description: string()
    .required('Description is a required field')
    .min(15, 'Description should be a minimum of 15 characters'),
});

const ManageRoom = ({ room }) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(roomSchema),
  });
};

export default ManageRoom;
