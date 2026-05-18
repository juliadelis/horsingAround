import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { organizationService } from "../../services/organizationService";
import {
  Container,
  Title,
  IconOrg,
  Card,
  Botao,
  Form,
  Organizacao,
  LoadingState,
  Spinner,
  dialogStyles,
  Input,
  FormActions,
} from "./style.js";
import { TbHorseshoe } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";

const Organizations = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
  });

  const loadOrganizations = async () => {
    setLoading(true);
    try {
      const data = await organizationService.getAll();
      setOrganizations(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = dialogStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await organizationService.create(form);

      setForm({
        name: "",
        slug: "",
      });

      setShowDialog(false);
      loadOrganizations();
    } finally {
      setSubmitting(false);
    }
  };

  const selectOrganization = (organization) => {
    localStorage.setItem("organizationId", organization.id);
    localStorage.setItem("organizationName", organization.name);
    localStorage.setItem("organizationSlug", organization.slug);

    navigate(`/${organization.slug}`);
  };

  const getHorsesCount = (organization) => {
    return organization.horse_count || 0;
  };

  return (
    <Container>
      <Title>Minhas organizações</Title>

      <Organizacao>
        {loading ? (
          <LoadingState>
            <Spinner />
            Carregando organizações...
          </LoadingState>
        ) : organizations.length === 0 ? (
          <LoadingState>Nenhuma organização cadastrada.</LoadingState>
        ) : (
          organizations.map((organization) => (
            <Card
              key={organization.id}
              onClick={() => selectOrganization(organization)}>
              <IconOrg>
                <TbHorseshoe size={30} />
              </IconOrg>
              <div>
                <h2>{organization.name}</h2>

                <p>
                  {getHorsesCount(organization)}{" "}
                  {getHorsesCount(organization) === 1
                    ? "Cavalo cadastrado"
                    : "Cavalos cadastrados"}
                </p>
              </div>
            </Card>
          ))
        )}
      </Organizacao>

      <div>
        <Botao type="button" onClick={() => setShowDialog(true)}>
          <FiPlus size={20} />
          Adicionar organização
        </Botao>
      </div>

      <Dialog
        header="Criar organização"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: "520px" }}
        modal
        className="p-fluid">
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Nome da organização"
            required
            disabled={submitting}
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <Input
            placeholder="Slug"
            required
            disabled={submitting}
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value,
              })
            }
          />

          <FormActions>
            <Botao type="submit" disabled={submitting}>
              {submitting ? "Criando..." : "Criar organização"}
            </Botao>
          </FormActions>
        </Form>
      </Dialog>
    </Container>
  );
};

export default Organizations;
