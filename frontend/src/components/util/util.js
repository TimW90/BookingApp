export const capitalize = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

export const enumSimpleName = (enumString) => {
  return capitalize(enumString.toLowerCase().replace('_', ' '));
};

export const insertSpaceBeforeCapitalLetter = (string) => {
  return string.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const camelCaseToTitleCase = (string) => {
  return capitalize(insertSpaceBeforeCapitalLetter(string));
};
