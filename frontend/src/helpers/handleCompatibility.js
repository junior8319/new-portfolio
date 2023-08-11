export const handleDateCompatibility = (date) => {
  date = new Date(date);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if (month < 10 && day < 10) return `${year}-0${month}-0${day}`;

  if (month < 10) return `${year}-0${month}-${day}`;

  if (day < 10) return `${year}-${month}-0${day}`;

  return `${year}-${month}-${day}`;
};

export const handleTimeZoneCompatibility = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  
  if (month < 10 && day < 10) return `0${day}/0${month}/${year}`;

  if (month < 10) return `${day}/0${month}/${year}`;

  if (day < 10) return `0${day}/${month}/${year}`;

  return `${day}/${month}/${year}`;
};