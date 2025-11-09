import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await api.post("/api/auth/register", { email, password, name });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  },
};

// Content API
export const contentAPI = {
  compose: async (prompt: string, contentType?: string, brandToneID?: string) => {
    const response = await api.post("/api/content/compose", {
      prompt,
      content_type: contentType,
      brand_tone_id: brandToneID,
    });
    return response.data;
  },
  enhance: async (content: string, brandToneID?: string) => {
    const response = await api.post("/api/content/enhance", {
      content,
      brand_tone_id: brandToneID,
    });
    return response.data;
  },
  create: async (title: string, contentType?: string, brandToneID?: string) => {
    const response = await api.post("/api/content", {
      title,
      content_type: contentType,
      brand_tone_id: brandToneID,
    });
    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get(`/api/content/${id}`);
    return response.data;
  },
  list: async (limit = 20, offset = 0) => {
    const response = await api.get(`/api/content?limit=${limit}&offset=${offset}`);
    return response.data;
  },
  update: async (id: string, title: string, content: string) => {
    const response = await api.put(`/api/content/${id}`, { title, content });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/content/${id}`);
    return response.data;
  },
};

// Brand Tone API
export const brandAPI = {
  create: async (name: string, description: string, settings: string, teamID?: string) => {
    const response = await api.post("/api/brand", {
      name,
      description,
      settings,
      team_id: teamID,
    });
    return response.data;
  },
  list: async () => {
    const response = await api.get("/api/brand");
    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get(`/api/brand/${id}`);
    return response.data;
  },
  update: async (id: string, name: string, description: string, settings: string) => {
    const response = await api.put(`/api/brand/${id}`, { name, description, settings });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/brand/${id}`);
    return response.data;
  },
};

// Collaboration API
export const collaborationAPI = {
  share: async (contentID: string, userID: string, action: string) => {
    const response = await api.post("/api/collaboration/share", {
      content_id: contentID,
      user_id: userID,
      action,
    });
    return response.data;
  },
  addComment: async (contentID: string, comment: string) => {
    const response = await api.post("/api/collaboration/comment", {
      content_id: contentID,
      comment,
    });
    return response.data;
  },
  getCollaborations: async (contentID: string) => {
    const response = await api.get(`/api/collaboration/content/${contentID}`);
    return response.data;
  },
  createTeam: async (name: string) => {
    const response = await api.post("/api/collaboration/teams", { name });
    return response.data;
  },
  getTeams: async () => {
    const response = await api.get("/api/collaboration/teams");
    return response.data;
  },
  addTeamMember: async (teamID: string, userID: string, role: string) => {
    const response = await api.post(`/api/collaboration/teams/${teamID}/members`, {
      user_id: userID,
      role,
    });
    return response.data;
  },
};

// History API
export const historyAPI = {
  get: async (limit = 50, offset = 0) => {
    const response = await api.get(`/api/history?limit=${limit}&offset=${offset}`);
    return response.data;
  },
};

// Settings API
export const settingsAPI = {
  get: async () => {
    const response = await api.get("/api/settings");
    return response.data;
  },
  update: async (name?: string, email?: string) => {
    const response = await api.put("/api/settings", { name, email });
    return response.data;
  },
};

export default api;

