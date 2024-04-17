import React, { useRef } from "react";
import {
  Button,
  FormContainer,
  InputArea,
  Input,
  Label,
  InputFoto,
  Option,
} from "./style.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = ({ initialData }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const [temMedicacao, settemMedicacao] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [cavalo, setCavalo] = useState(
    initialData
      ? initialData
      : {
          nome: "",
          idade: "",
          racao: "",
          sexo: "",
          raca: "",
          feno: "",
          medicacao: "Não",
          aulas: "",
          nome_pai: "",
          nome_mae: "",
          peso: "",
        }
  );

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    setCavalo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const appendFields = (values, formData) => {
    for (var key in values) {
      formData.append(key, values[key]);
    }
  };

  const changeTemMedicacao = (e) => {
    if (e.target.value === "Sim") {
      settemMedicacao(true);
      return;
    }
    setCavalo((prev) => ({ ...prev, medicacao: "Não" }));
    settemMedicacao(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("foto", selectedFile);
      appendFields(cavalo, formData);

      console.log(cavalo);
      if (initialData) {
        await axios({
          method: "put",
          url: `https://horsing-jt2o20xg0-julia-delis-projects.vercel.app/cavalos/${cavalo.id}`,
          data: formData,

          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/cavalos");
      } else {
        await axios({
          method: "post",
          url: `https://horsing-jt2o20xg0-julia-delis-projects.vercel.app/cavalos`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        navigate("/cavalos");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContainer ref={ref}>
      <InputArea>
        <Label>Nome</Label>
        <Input
          value={cavalo.nome}
          type="text"
          onChange={handleChange}
          name="nome"
        />
      </InputArea>
      <InputArea>
        <Label>Idade</Label>
        <Input
          value={cavalo.idade}
          type="text"
          onChange={handleChange}
          name="idade"
        />
      </InputArea>
      <InputArea>
        <Label>Ração</Label>
        <Input
          value={cavalo.racao}
          type="text"
          onChange={handleChange}
          name="racao"
        />
      </InputArea>
      <InputArea>
        <Label>Sexo</Label>
        <Option
          value={cavalo.sexo}
          type="text"
          onChange={handleChange}
          name="sexo">
          <option value="-" hidden>
            -
          </option>
          <option value="Fêmea">Fêmea</option>
          <option value="Macho">Macho</option>
        </Option>
      </InputArea>
      <InputArea>
        <Label>Raça</Label>
        <Input
          value={cavalo.raca}
          type="text"
          onChange={handleChange}
          name="raca"
        />
      </InputArea>
      <InputArea>
        <Label>Feno</Label>
        <Option
          value={cavalo.feno}
          type="text"
          onChange={handleChange}
          name="feno">
          <option value="-" hidden>
            -
          </option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </Option>
      </InputArea>
      <InputArea>
        <Label>Medicação</Label>
        <Option type="text" onChange={changeTemMedicacao} name="temMedicacao">
          <option value="-" hidden>
            -
          </option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </Option>
      </InputArea>
      {temMedicacao && (
        <InputArea>
          <Label>Qual medicação seria?</Label>
          <Input
            value={cavalo.medicacao === "Não" ? "" : cavalo.medicacao}
            type="text"
            onChange={handleChange}
            name="medicacao"
          />
        </InputArea>
      )}
      <InputArea>
        <Label>Aulas</Label>
        <Option
          value={cavalo.aulas}
          type="text"
          onChange={handleChange}
          name="aulas">
          <option value="-" hidden>
            -
          </option>
          <option value="1">1x /sem</option>
          <option value="2">2x /sem</option>
          <option value="3">3x /sem</option>
          <option value="4">4x /sem</option>
          <option value="5">5x /sem</option>
          <option value="6">6x /sem</option>
          <option value="7">7x /sem</option>
          <option value="8">8x /sem</option>
        </Option>
      </InputArea>
      <InputArea>
        <Label>Nome do pai</Label>
        <Input
          value={cavalo.nome_pai}
          type="text"
          onChange={handleChange}
          name="nome_pai"
        />
      </InputArea>
      <InputArea>
        <Label>Nome da Mãe</Label>
        <Input
          value={cavalo.nome_mae}
          type="text"
          onChange={handleChange}
          name="nome_mae"
        />
      </InputArea>
      <InputArea>
        <Label>Peso</Label>
        <Input
          value={cavalo.peso}
          type="text"
          onChange={handleChange}
          name="peso"
        />
      </InputArea>
      <InputArea>
        <Label>Foto</Label>
        <InputFoto
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileSelect}
          name="foto"
        />
      </InputArea>

      <Button type="submit" onClick={handleClick}>
        SALVAR
      </Button>
    </FormContainer>
  );
};

export default Form;
