export const getUsername = () => {
  if (typeof window === "undefined") return "";

  const username = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).username
    : "";

  return username;
};
