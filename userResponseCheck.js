export function userAlreadyRespondedToday () {
  const lastResponseISO = localStorage.getItem("lastAnswerDate");

  if (!lastResponseISO) {
    return false;
  }

  const today = new Date();
  const lastResponseDate = new Date(lastResponseISO);

  return (
    lastResponseDate.getDate() === today.getDate() &&
    lastResponseDate.getMonth() === today.getMonth() &&
    lastResponseDate.getFullYear() === today.getFullYear()
  );
};