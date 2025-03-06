export const randomizeOrder = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateTwoRandomNumbers = (excludeIndex, num = 49) => {
  const numbers = [];

  while (numbers.length < 2) {
    const randomNumber = Math.floor(Math.random() * num);
    if (randomNumber !== excludeIndex && !numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  // Push the excluded index to the array
  numbers.push(excludeIndex);

  console.log(numbers);

  // Randomize the order of the array
  return randomizeOrder(numbers);
};

export const areAllElementPresent = (arr1, arr2) => {
  return arr1.every((el) => arr2.includes(el));
};
