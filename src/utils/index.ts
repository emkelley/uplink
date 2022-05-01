export const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

export const isValidImageUrl = (url: string) => {
  if (!isValidUrl(url)) {
    return false;
  }
  const ext = url.split(".").pop();
  if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
    return true;
  }
  return false;
};
// function to format Firebase timestamp
export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const dateString = `Sent ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  return dateString;
};
