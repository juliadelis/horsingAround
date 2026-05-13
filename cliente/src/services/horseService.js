import { api } from "./api";

const getOrganizationId = async () => {
  const storedId = localStorage.getItem("organizationId");
  if (storedId) return storedId;

  const slug = localStorage.getItem("organizationSlug");
  if (!slug) return null;

  const response = await api.get("/organizations");
  const org = response.data.find((organization) => organization.slug === slug);
  if (org) {
    localStorage.setItem("organizationId", org.id);
    localStorage.setItem("organizationName", org.name);
  }
  return org?.id ?? null;
};

export const horseService = {
  getAll: async () => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.get(`/organizations/${organizationId}/cavalos`);
    return response.data;
  },

  getById: async (id) => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.get(
      `/organizations/${organizationId}/cavalos/${id}`,
    );
    return response.data;
  },

  create: async (formData) => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.post(
      `/organizations/${organizationId}/cavalos`,
      formData,
    );
    return response.data;
  },

  update: async (id, formData) => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.put(
      `/organizations/${organizationId}/cavalos/${id}`,
      formData,
    );
    return response.data;
  },

  delete: async (id) => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.delete(
      `/organizations/${organizationId}/cavalos/${id}`,
    );
    return response.data;
  },
};
