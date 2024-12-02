export const putBorderRadius = (index, bg = "#EDE9E9") => {
  switch (index) {
    case 0:
      return {
        borderTopLeftRadius: 20,
      };
    case 2:
      return {
        borderTopRightRadius: 20,
      };
    case 6:
      return {
        borderBottomLeftRadius: 20,
      };
    case 8:
      return {
        borderBottomRightRadius: 20,
      };
  }
};
