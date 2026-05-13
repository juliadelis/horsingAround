import React, { useEffect, useState } from "react";
import { memberService } from "../services/memberService";

const Team = () => {
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "caretaker",
  });

  const loadMembers = async () => {
    try {
      const data = await memberService.getAll();
      setMembers(data);
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await memberService.create(form);

      setForm({
        name: "",
        email: "",
        role: "caretaker",
      });

      await loadMembers();
    } catch (error) {
      console.error("Erro ao criar membro:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Equipe</h1>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
          marginBottom: "2rem",
        }}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">Administrador</option>
          <option value="veterinarian">Veterinário</option>
          <option value="trainer">Adestrador</option>
          <option value="caretaker">Cuidador</option>
        </select>

        <button type="submit">Adicionar membro</button>
      </form>

      {/* LISTAGEM */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        {members.map((member) => (
          <div
            key={member.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
            }}>
            <h3>{member.name}</h3>

            <p>Email: {member.email}</p>

            <p>Cargo: {member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
