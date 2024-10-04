import { FRUITS } from "./data";

export const searchProduct = (keyword) => {
  const result = FRUITS.filter(
    (fruit) =>
      fruit.substring(0, keyword.length).toLowerCase() === keyword.toLowerCase()
  );
  return new Promise((resolve) => setTimeout(resolve(result), 1000));
};

export const myDebounce = (cb, delay = 500) => {
  let timerCtx;
  return function () {
    const self = this;
    const args = arguments;
    clearTimeout(timerCtx);
    timerCtx = setTimeout(() => {
      cb.apply(self, args);
    }, delay);
  };
};
