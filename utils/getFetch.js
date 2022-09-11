export const getFetch = async (url) => {
  try {
    const response = await fetch(url);
    // console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
