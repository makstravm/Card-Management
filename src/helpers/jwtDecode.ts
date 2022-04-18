export const jwtDecode = (token: string) => {
  try {
    const arrToken = token.split(".");

    const base64Token = atob(arrToken[1]);

    return JSON.parse(base64Token);
  } catch (e) {
    return e;
  }
};
