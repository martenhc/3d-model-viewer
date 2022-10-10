export const debounce = (callback: Function) => {
  let timeOutId: number;

  return () => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(callback, 100);
  };
};
