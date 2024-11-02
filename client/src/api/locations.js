//Taylor Zweigle, 2024
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://restaurant-app-server-ten.vercel.app"
    : "http://localhost:5000";

export const getLocations = async (token) => {
  const res = await fetch(`${API_URL}/api/locations`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const getLocation = async (id, token) => {
  const res = await fetch(`${API_URL}/api/locations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const createLocation = async (body, token) => {
  const res = await fetch(`${API_URL}/api/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const updateLocation = async (id, body, token) => {
  const res = await fetch(`${API_URL}/api/locations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const deleteLocation = async (id, token) => {
  const res = await fetch(`${API_URL}/api/locations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};
