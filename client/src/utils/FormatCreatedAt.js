export default function formatCreatedAt(createdAt) {
  const now = new Date();
  const postDate = new Date(createdAt);

  const diffInSeconds = Math.floor((now - postDate) / 1000);

  // Seconds
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  // Minutes
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  // Hours
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  // Days
  const diffInDays = Math.floor(diffInHours / 24);

  // If less than 1 year → show Month + Date
  if (diffInDays < 365) {
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  // If more than 1 year → show Month + Date + Year
  return postDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
