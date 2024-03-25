export const capitalize = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

export const enumSimpleName = (enumString) => {
  return capitalize(enumString.toLowerCase().replace('_', ' '));
};
