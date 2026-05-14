import { api } from "./api";

export const organizationService = {
  getAll: async () => {
    const response = await api.get("/organizations");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
  },

  getMyRole: async (id) => {
    const response = await api.get(`/organizations/${id}/my-role`);
    return response.data;
  },

  getBySlug: async (slug) => {
    const response = await api.get("/organizations");
    return response.data.find((organization) => organization.slug === slug);
  },

  create: async (data) => {
    const response = await api.post("/organizations", data);
    return response.data;
  },
};
