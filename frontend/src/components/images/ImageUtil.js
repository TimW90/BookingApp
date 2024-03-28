export const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};

export const convertMultipleToBase64 = async (imageFiles) => {
  const maxAmountOfImages = 3;
  const imageDTOs = [];
  for (let i = 0; i <= maxAmountOfImages; i++) {
    if (imageFiles[i]) {
      const base64Image = await convertToBase64(imageFiles[i]);
      imageDTOs.push({
        imageId: null,
        imageOrder: i + 1,
        base64Image: base64Image,
        hotelRoomTypeId: null,
      });
    }
  }

  return imageDTOs;
};
