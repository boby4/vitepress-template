const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE
const header = {
  'x-avoscloud-application-id': import.meta.env.VITE_API_ID,
  'x-avoscloud-session-token': import.meta.env.VITE_API_ID,
  'x-avoscloud-application-key': import.meta.env.VITE_API_KEY,
}

export const request = async (url: string) => {
  const apiUrl = baseUrl + url;
  try {
    const response = await fetch(apiUrl, { headers: header });
    const res = await response.json();
    return res;
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};