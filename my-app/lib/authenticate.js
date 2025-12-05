export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
}

export function readToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    return payload;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export async function authenticateUser(userName, password) {

  const url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
  console.log("LOGIN → calling:", url);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password })
  });

  console.log("LOGIN → status:", res.status);

  let result;
  try {
    result = await res.json();
  } catch (err) {
    throw new Error("Login failed: invalid server response");
  }

  console.log("LOGIN → response JSON:", result);

  if (res.status !== 200) {
    throw new Error(result.message || "Login failed");
  }

  const token =
      result?.message?.token ||
      result?.token ||
      result?.message;

  if (!token || token.length < 10) {
    throw new Error("Login failed: No token returned");
  }

  setToken(token);
  return true;
}


export async function registerUser(userName, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password, password2 })
  });
  if (res.status !== 200) {
    const err = await res.json().catch(()=>({message:'Register failed'}));
    throw new Error(err.message || 'Register failed');
  }
  return true;
}
