export const formatText = (text) => {
  return text
    .replace(/_/g, ' ')
    .replace(/\b(\w)/g, (char) => char.toUpperCase());
};

export const formatTime = (dateString) => {
  if (!dateString) {
    return 'No Date Provided';
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return date.toLocaleString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error in Date';
  }
};

export default formatText;
