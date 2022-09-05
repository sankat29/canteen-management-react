const getCurrentWeekDay = (index) => {
  if (index === 0) {
    return "SUNDAY";
  } else if (index === 1) {
    return "MONDAY";
  } else if (index === 2) {
    return "TUESDAY";
  } else if (index === 3) {
    return "WEDNESDAY";
  } else if (index === 4) {
    return "THURSDAY";
  } else if (index === 5) {
    return "FRIDAY";
  } else if (index === 6) {
    return "SATURDAY";
  }
};

export default getCurrentWeekDay;
