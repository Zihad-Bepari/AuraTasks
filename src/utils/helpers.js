export const getDaysDiff = (targetDate) => {
  const diff = new Date(targetDate) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};