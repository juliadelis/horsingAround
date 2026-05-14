import { useEffect, useState } from "react";
import { organizationService } from "../services/organizationService";

const getOrganizationId = async () => {
  const storedId = localStorage.getItem("organizationId");
  if (storedId) return storedId;

  const slug = localStorage.getItem("organizationSlug");
  if (!slug) return null;

  const organizations = await organizationService.getAll();
  const organization = organizations.find((item) => item.slug === slug);

  if (organization) {
    localStorage.setItem("organizationId", organization.id);
    localStorage.setItem("organizationName", organization.name);
    localStorage.setItem("organizationSlug", organization.slug);
  }

  return organization?.id ?? null;
};

export const useOrganizationRole = () => {
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      try {
        setRoleLoading(true);
        const organizationId = await getOrganizationId();

        if (!organizationId) {
          setRole(null);
          return;
        }

        const data = await organizationService.getMyRole(organizationId);
        setRole(data.role);
      } catch (error) {
        console.error("Erro ao carregar permissão:", error);
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    loadRole();
  }, []);

  return {
    role,
    roleLoading,
    isAdmin: role === "admin",
    canAddHorse: ["admin", "caretaker", "trainer"].includes(role),
    canEditHorse: ["admin", "caretaker", "trainer", "veterinarian"].includes(
      role,
    ),
    canDeleteHorse: role === "admin",
    canManageTeam: role === "admin",
    isVeterinarian: role === "veterinarian",
  };
};
