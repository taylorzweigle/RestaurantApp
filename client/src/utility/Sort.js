//Taylor Zweigle, 2024
export const sort = (arr) => {
  arr.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  return arr;
};

export const sortLocationsArray = (arr) => {
  arr.sort(function (a, b) {
    if (a.city < b.city) {
      return -1;
    }
    if (a.city > b.city) {
      return 1;
    }
    return 0;
  });

  return arr;
};
