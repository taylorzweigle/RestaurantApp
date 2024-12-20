//Taylor Zweigle, 2024
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://restaurant-app-server-ten.vercel.app"
    : "http://localhost:5000";

export const getRestaurants = async (token, category) => {
  const res = await fetch(`${API_URL}/api/restaurants/${category}`, {
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

export const getRestaurant = async (id, token, category) => {
  const res = await fetch(`${API_URL}/api/restaurants/${category}/${id}`, {
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

export const createRestaurant = async (body, token, category) => {
  const res = await fetch(`${API_URL}/api/restaurants/${category}`, {
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

export const updateRestaurant = async (id, body, token, category) => {
  const res = await fetch(`${API_URL}/api/restaurants/${category}/${id}`, {
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

export const deleteRestaurant = async (id, token, category) => {
  const res = await fetch(`${API_URL}/api/restaurants/${category}/${id}`, {
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
