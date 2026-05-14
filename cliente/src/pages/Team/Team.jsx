import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { memberService } from "../../services/memberService";
import {
  dialogStyles,
  CancelButton,
  DeleteButton,
  PageContainer,
  Header,
  Title,
  Subtitle,
  AddButton,
  Card,
  Table,
  Th,
  Td,
  ActionButton,
  MemberForm,
  Input,
  Select,
  FormActions,
  EmptyState,
  LoadingState,
  Spinner,
} from "./style";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "veterinarian", label: "Veterinário" },
  { value: "trainer", label: "Adestrador" },
  { value: "caretaker", label: "Cuidador" },
];

const Team = () => {
  const [members, setMembers] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const organizationName =
    localStorage.getItem("organizationName") || "Organização";

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await memberService.getAll();
      setMembers(data);
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
      toast.error("Não foi possível carregar os membros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    // Injetar estilos CSS para o Dialog
    const styleElement = document.createElement('style');
    styleElement.textContent = dialogStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 11);

      let formatted = digits;
      if (digits.length <= 2) {
        formatted = digits;
      } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length <= 10) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }

      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openCreateDialog = () => {
    setEditingMember(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "admin",
    });
    setDialogVisible(true);
  };

  const formatPhone = (phone) => {
    if (!phone) return "";
    
    const digits = String(phone).replace(/\D/g, "").slice(0, 11);

    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const normalizePhone = (phone) => phone.replace(/\D/g, "") || null;
  const normalizeEmail = (email) => email.trim().toLowerCase();

  const openEditDialog = (member) => {
    setEditingMember(member);
    setForm({
      name: member.name || "",
      email: member.email || "",
      phone: formatPhone(member.phone),
      role: member.role || "admin",
    });
    setDialogVisible(true);
  };

  const closeDialog = () => {
    if (submitting) return;

    setDialogVisible(false);
    setEditingMember(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      toast.error("Preencha o e-mail do membro.");
      return;
    }

    const emailAlreadyListed = members.some(
      (member) =>
        normalizeEmail(member.email) === normalizeEmail(form.email) &&
        member.id !== editingMember?.id,
    );

    if (emailAlreadyListed) {
      toast.info("Este e-mail já está na lista de membros desta organização.");
      return;
    }

    try {
      setSubmitting(true);
      let result;
      const payload = {
        ...form,
        phone: normalizePhone(form.phone),
      };

      if (editingMember) {
        result = await memberService.update(editingMember.id, payload);
        setMembers((prev) =>
          prev.map((member) =>
            member.id === editingMember.id
              ? { ...result, phone: payload.phone }
              : member
          )
        );
        toast.success("Membro atualizado com sucesso.");
      } else {
        result = await memberService.create(payload);

        if (result.invitationStatus === "already_member") {
          toast.info("Este e-mail já está na lista de membros desta organização.");
          closeDialog();
          return;
        }

        const createdMember = { ...(result.member ?? result), phone: payload.phone };
        setMembers((prev) => {
          const alreadyListed = prev.some(
            (member) => member.id === createdMember.id,
          );

          if (alreadyListed) {
            return prev.map((member) =>
              member.id === createdMember.id ? createdMember : member,
            );
          }

          return [createdMember, ...prev];
        });
        if (result.invitationStatus === "not_sent_missing_service_role") {
          toast.warning(
            "Membro autorizado, mas configure a service role do Supabase para enviar convites.",
          );
        } else {
          toast.success("Convite enviado e membro autorizado com sucesso.");
        }
      }

      closeDialog();
    } catch (error) {
      console.error("Erro ao salvar membro:", error);
      toast.error(
        error?.response?.data?.error || error?.message || "Erro ao salvar membro.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (member) => {
    setMemberToDelete(member);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      setDeleting(true);
      await memberService.delete(memberToDelete.id);
      setMembers((prev) => prev.filter((member) => member.id !== memberToDelete.id));
      toast.success("Membro removido com sucesso.");
    } catch (error) {
      console.error("Erro ao remover membro:", error);
      toast.error("Não foi possível remover o membro.");
    } finally {
      setDeleting(false);
      setDeleteDialogVisible(false);
      setMemberToDelete(null);
    }
  };

  const cancelDelete = () => {
    if (deleting) return;

    setDeleteDialogVisible(false);
    setMemberToDelete(null);
  };

  return (
    <PageContainer>
      <div>
      <Header>
        <div>
          <Title>Equipe</Title>
          <Subtitle>{organizationName}</Subtitle>
        </div>

        <AddButton type="button" onClick={openCreateDialog}>
          <FiPlus size={18} /> Adicionar membro
        </AddButton>
      </Header>

      <Card>
        {loading ? (
          <LoadingState>
            <Spinner />
            Carregando membros...
          </LoadingState>
        ) : members.length === 0 ? (
          <EmptyState>Nenhum membro cadastrado ainda.</EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Função</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th style={{ textAlign: "right" }}>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <Td>{member.name}</Td>
                  <Td>{roleOptions.find((role) => role.value === member.role)?.label ?? member.role}</Td>
                  <Td>{member.email}</Td>
                  <Td>{formatPhone(member.phone) || "-"}</Td>
                  <Td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <ActionButton
                      title="Editar"
                      type="button"
                      onClick={() => openEditDialog(member)}
                      style={{ marginRight: "8px" }}
                    >
                      <FiEdit size={16} />
                    </ActionButton>
                    <ActionButton
                      title="Remover"
                      type="button"
                      onClick={() => handleDelete(member)}>
                      <FiTrash2 size={16} />
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
</div>
    

      <Dialog
        header="Confirmar exclusão"
        visible={deleteDialogVisible}
        onHide={cancelDelete}
        style={{ width: "420px" }}
        modal
        className="p-fluid"
        footer={
          <FormActions>
            <CancelButton
              type="button"
              onClick={cancelDelete}
              disabled={deleting}
              style={{ marginRight: "12px" }}
            >
              Cancelar
            </CancelButton>
            <DeleteButton type="button" onClick={confirmDelete} disabled={deleting}>
              {deleting ? "Excluindo..." : "Excluir"}
            </DeleteButton>
          </FormActions>
        }
      >
        <p>
          Tem certeza que deseja remover o membro{' '}
          <strong>{memberToDelete?.name || ""}</strong>?
        </p>
      </Dialog>

      <Dialog
        header={editingMember ? "Editar membro" : "Adicionar membro"}
        visible={dialogVisible}
        onHide={closeDialog}
        style={{ width: "520px" }}
        modal
        className="p-fluid"
      >
        <MemberForm onSubmit={handleSubmit}>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
            disabled={submitting}
          />
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={submitting}
          />
          <Input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefone"
            disabled={submitting}
          />
          <Select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            disabled={submitting}
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormActions>
            <AddButton type="submit" disabled={submitting}>
              {submitting
                ? editingMember
                  ? "Atualizando..."
                  : "Enviando convite..."
                : editingMember
                ? "Atualizar membro"
                : "Enviar convite"}
            </AddButton>
          </FormActions>
        </MemberForm>
      </Dialog>
    </PageContainer>
  );
};

export default Team;
