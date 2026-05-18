import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { organizationService } from "../services/organizationService";

const getOrganizationId = async (routeSlug) => {
  const storedId = localStorage.getItem("organizationId");
  const storedSlug = localStorage.getItem("organizationSlug");
  if (storedId && (!routeSlug || routeSlug === storedSlug)) return storedId;

  const slug = routeSlug || storedSlug;
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
  const { slug } = useParams();

  useEffect(() => {
    const loadRole = async () => {
      try {
        setRoleLoading(true);
        const organizationId = await getOrganizationId(slug);

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
  }, [slug]);

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
