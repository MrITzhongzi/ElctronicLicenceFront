
export function defaultHeader() {
  return {
    headers: {
      token: token()
    }
  };
}

export function token() {
  return localStorage.getItem("token");
}
