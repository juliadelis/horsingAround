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

export const memberService = {
  getAll: async () => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.get(`/organizations/${organizationId}/members`);
    return response.data;
  },

  create: async (data) => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.post(
      `/organizations/${organizationId}/members`,
      data,
    );
    return response.data;
  },

  update: async (memberId, data) => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.patch(
      `/organizations/${organizationId}/members/${memberId}`,
      data,
    );
    return response.data;
  },

  delete: async (memberId) => {
    const organizationId = await getOrganizationId();
    if (!organizationId) {
      throw new Error("Organização não selecionada.");
    }
    const response = await api.delete(
      `/organizations/${organizationId}/members/${memberId}`,
    );
    return response.data;
  },
};
