export const formatText = (text) => {
  return text
    .replace(/_/g, ' ')
    .replace(/\b(\w)/g, (char) => char.toUpperCase());
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export default formatText;
