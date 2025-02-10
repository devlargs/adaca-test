const API_ROOT_URL = process.env.NEXT_PUBLIC_MUSIXMATCH_API_URL;

export const fetcher = async (url: string) => {
  const res = await fetch(
    `${API_ROOT_URL}${url}&apikey=${process.env.NEXT_PUBLIC_MUSIXMATCH_API_KEY}`
  );
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
};
