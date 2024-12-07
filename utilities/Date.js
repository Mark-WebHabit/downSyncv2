// Function to get the current date in DD-MM-YYYY format
export const getCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = currentDate.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatDuration = (loginTime, logoutTime) => {
  const durationInMillis = logoutTime - loginTime;
  const minutes = Math.floor(durationInMillis / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${
    hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""} and ` : ""
  }${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`;
};
