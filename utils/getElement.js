export const getElement = (selection) => {
  if (selection) {
    return document.querySelector(selection);
  }

  throw new Error(`There is no such ${selection} element`);
};
