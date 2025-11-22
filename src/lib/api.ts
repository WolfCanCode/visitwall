const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
import { UserProfile, Collection } from "./types";

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface RegisterResponse {
  success?: boolean;
  message?: string;
  data?: {
    message: string;
    username: string;
  };
}

export interface VerifyRequest {
  email: string;
  code: string;
}

export interface VerifyResponse {
  success?: boolean;
  message?: string;
  data?: {
    message: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    username: string;
  };
}

export interface ProfileResponse {
  success?: boolean;
  data?: {
    profile: UserProfile;
  };
  message?: string;
}

export interface CollectionListResponse {
  success?: boolean;
  data?: {
    collections: Collection[];
  };
  message?: string;
}

export interface CollectionResponse {
  success?: boolean;
  data?: {
    collection: Collection;
  };
  message?: string;
}

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Registration failed" }));
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
}

export async function verifyEmail(
  data: VerifyRequest
): Promise<VerifyResponse> {
  const response = await fetch(`${API_URL}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Verification failed" }));
    throw new Error(error.message || "Verification failed");
  }

  return response.json();
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Login failed" }));

    if (
      (error.message &&
        error.message.includes("User account is not confirmed")) ||
      error.isVerified === false
    ) {
      throw new Error("User account is not confirmed");
    }

    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

export async function getProfile(): Promise<UserProfile> {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  const json: ProfileResponse = await response.json();
  if (!json.data?.profile) throw new Error("No profile data returned");

  return json.data.profile;
}

export async function updateProfile(
  data: Partial<UserProfile>
): Promise<UserProfile> {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  const json: ProfileResponse = await response.json();
  if (!json.data?.profile) throw new Error("No profile data returned");

  return json.data.profile;
}

export async function getPublicProfile(username: string): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/user/${username}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch public profile");
  }

  const json: ProfileResponse = await response.json();
  if (!json.data?.profile) throw new Error("No profile data returned");

  return json.data.profile;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
}

// Collection APIs

export async function getCollections(): Promise<Collection[]> {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_URL}/collection`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch collections");
  }

  const json: CollectionListResponse = await response.json();
  return json.data?.collections || [];
}

export async function createCollection(
  name: string,
  icon?: string
): Promise<Collection> {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_URL}/collection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, icon }),
  });

  if (!response.ok) {
    throw new Error("Failed to create collection");
  }

  const json: CollectionResponse = await response.json();
  if (!json.data?.collection) throw new Error("No collection data returned");
  return json.data.collection;
}

export async function updateCollection(
  id: string,
  name: string,
  icon?: string
): Promise<Collection> {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_URL}/collection/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, icon }),
  });

  if (!response.ok) {
    throw new Error("Failed to update collection");
  }

  const json: CollectionResponse = await response.json();
  if (!json.data?.collection) throw new Error("No collection data returned");
  return json.data.collection;
}

export async function deleteCollection(id: string): Promise<boolean> {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_URL}/collection/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete collection");
  }

  const json = await response.json();
  return json.success === true;
}

export async function addProfileToCollection(
  collectionId: string,
  username: string
): Promise<Collection> {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(
    `${API_URL}/collection/${collectionId}/profile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username }),
    }
  );

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Failed to add profile" }));
    throw new Error(
      error.message || error.error || "Failed to add profile to collection"
    );
  }

  const json: CollectionResponse = await response.json();
  if (!json.data?.collection) throw new Error("No collection data returned");
  return json.data.collection;
}
