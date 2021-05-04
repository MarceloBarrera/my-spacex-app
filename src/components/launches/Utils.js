const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// date example: "2006-03-24T22:30:00.000Z"
export const formatDate = (date) => {
  const fortnightAway = new Date(date);
  const date2 = fortnightAway.getDate();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][fortnightAway.getMonth()];

  return `${date2}${nth(date2)} ${month} ${fortnightAway.getFullYear()}`;
};
