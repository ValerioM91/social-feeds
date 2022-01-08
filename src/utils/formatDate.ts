const formatDate = (date: string): number => {
  const newFormat = date.split(' ').join('T');
  const formattedDateTime = new Date(newFormat).getTime();
  return formattedDateTime;
};

export default formatDate;
