export const dateFormat = (date) => {
  const changeDate = new Date(date);
  const day = changeDate.getDate();
  const month = changeDate.getMonth();
  const year = changeDate.getFullYear();
  return `${day}/${month}/${year}`;
};
