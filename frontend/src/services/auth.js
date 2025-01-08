export const getSession = () => {
  return fetch(`/api/auth/session`).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }
    return response.json();
  });
};

