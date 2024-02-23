import api from '@/api/api';

const uri = 'hotels';

export const postHotel = async (formData) => {
  const response = await api.post(uri, formData);
  return response.data;
};
