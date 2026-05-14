import React, { useRef } from "react";
import {
  Button,
  FormContainer,
  InputArea,
  Input,
  Label,
  InputFoto,
  Option,
  FileInputWrapper,
  FileInputLabel,
  FileName,
  ImagePreview,
  PreviewImage,
  DeleteButton,
  ButtonContainer,
} from "./style.js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { horseService } from "../../services/horseService";

const Form = ({ initialData }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [cavalo, setCavalo] = useState(
    initialData
      ? initialData
      : {
          name: "",
          owner: "",
          age: "",
          foodamount: "",
          gender: "",
          breed: "",
          hay: false,
          medication: false,
          medicationtype: "",
          lessons: "",
          fathersname: "",
          mothersname: "",
          weight: "",
          pictureurl: "",
        },
  );

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCavalo((prev) => ({ ...prev, pictureurl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteSelection = () => {
    setSelectedFile(null);
    setCavalo((prev) => ({ ...prev, pictureurl: "" }));

    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "weight" || name === "foodamount") {
      const sanitized = value.replace(/[^0-9.]/g, "");
      const [integerPart, decimalPart] = sanitized.split(".");
      const normalized = decimalPart !== undefined
        ? `${integerPart || "0"}.${decimalPart.slice(0, 2)}`
        : integerPart;

      setCavalo((prev) => ({ ...prev, [name]: normalized }));
      return;
    }

    if (name === "age") {
      const sanitized = value.replace(/[^0-9]/g, "");
      setCavalo((prev) => ({ ...prev, age: sanitized }));
      return;
    }

    setCavalo((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicationChange = (e) => {
    const value = e.target.value;
    if (value === "false") {
      // When medication is false, reset medicationType to null
      setCavalo((prev) => ({
        ...prev,
        medication: value,
        medicationtype: null,
      }));
    } else {
      setCavalo((prev) => ({ ...prev, medication: value }));
    }
  };

  const appendFields = (values, formData) => {
    for (var key in values) {
      // Don't send the preview image data URI to backend
      if (key !== "pictureurl") {
        // If medication is false, set medicationtype to null
        if (key === "medicationtype" && values.medication === "false") {
          formData.append(key, null);
        } else {
          formData.append(key, values[key]);
        }
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append("foto", selectedFile);
      }

      appendFields(cavalo, formData);

      let response;

      if (initialData) {
        response = await horseService.update(cavalo.id, formData);
      } else {
        response = await horseService.create(formData);
      }

      if (response.fotoUrl) {
        setCavalo((prev) => ({
          ...prev,
          pictureurl: response.fotoUrl,
        }));
      }

      const targetPath = slug ? `/${slug}/cavalos` : "/organizacoes";
      navigate(targetPath);
    } catch (err) {
      console.log("Erro ao salvar cavalo:", err);
    }
  };

  const isMedicationTrue =
    cavalo?.medication === "true" || cavalo?.medication === true;

  return (
    <FormContainer ref={ref}>
      <InputArea>
        <Label>Nome</Label>
        <Input
          value={cavalo.name}
          type="text"
          onChange={handleChange}
          name="name"
        />
      </InputArea>
      <InputArea>
        <Label>Proprietário</Label>
        <Input
          value={cavalo.owner}
          type="text"
          onChange={handleChange}
          name="owner"
        />
      </InputArea>
      <InputArea>
        <Label>Idade</Label>
        <Input
          value={cavalo.age}
          type="number"
          min="0"
          onChange={handleChange}
          name="age"
        />
      </InputArea>
      <InputArea>
        <Label>Ração</Label>
        <Input
          value={cavalo.foodamount}
          type="number"
          min="0"
          step="0.01"
          onChange={handleChange}
          name="foodamount"
        />
      </InputArea>
      <InputArea>
        <Label>Sexo</Label>
        <Option
          value={cavalo.gender}
          type="text"
          onChange={handleChange}
          name="gender">
          <option value="-" hidden>
            -
          </option>
          <option value="Femea">Fêmea</option>
          <option value="Macho">Macho</option>
        </Option>
      </InputArea>
      <InputArea>
        <Label>Raça</Label>
        <Input
          value={cavalo.breed}
          type="text"
          onChange={handleChange}
          name="breed"
        />
      </InputArea>
      <InputArea>
        <Label>Feno</Label>
        <Option
          value={cavalo.hay}
          type="text"
          onChange={handleChange}
          name="hay">
          <option value="-" hidden>
            -
          </option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </Option>
      </InputArea>
      <InputArea>
        <Label>Medicação</Label>
        <Option
          type="text"
          value={cavalo.medication}
          onChange={handleMedicationChange}
          name="medication">
          <option value="-" hidden>
            -
          </option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </Option>
      </InputArea>

      {isMedicationTrue && (
        <InputArea>
          <Label>Tratamento:</Label>
          <Input
            value={cavalo?.medicationtype}
            type="text"
            onChange={handleChange}
            name="medicationtype"
          />
        </InputArea>
      )}
      <InputArea>
        <Label>Aulas</Label>
        <Option
          value={cavalo.lessons}
          type="text"
          onChange={handleChange}
          name="lessons">
          <option value="-" hidden>
            -
          </option>
          <option value={1}>1x /sem</option>
          <option value={2}>2x /sem</option>
          <option value={3}>3x /sem</option>
          <option value={4}>4x /sem</option>
          <option value={5}>5x /sem</option>
          <option value={6}>6x /sem</option>
          <option value={7}>7x /sem</option>
          <option value={8}>8x /sem</option>
        </Option>
      </InputArea>
      <InputArea>
        <Label>Nome do pai</Label>
        <Input
          value={cavalo.fathersname}
          type="text"
          onChange={handleChange}
          name="fathersname"
        />
      </InputArea>
      <InputArea>
        <Label>Nome da Mãe</Label>
        <Input
          value={cavalo.mothersname}
          type="text"
          onChange={handleChange}
          name="mothersname"
        />
      </InputArea>
      <InputArea>
        <Label>Peso</Label>
        <Input
          value={cavalo.weight}
          type="number"
          min="0"
          step="0.01"
          onChange={handleChange}
          name="weight"
        />
      </InputArea>
      <InputArea>
        <Label>Foto</Label>
        <FileInputWrapper>
          <FileInputLabel htmlFor="file-input">Escolher arquivo</FileInputLabel>
          <InputFoto
            id="file-input"
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            onChange={handleFileSelect}
            name="foto"
          />
          {selectedFile && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <FileName>{selectedFile.name}</FileName>
              <DeleteButton onClick={handleDeleteSelection}>
                <BiTrash size={20} />
              </DeleteButton>
            </div>
          )}
          {cavalo.pictureurl && (
            <ImagePreview>
              <PreviewImage src={cavalo.pictureurl} alt="Preview da foto" />
            </ImagePreview>
          )}
        </FileInputWrapper>
      </InputArea>
      <ButtonContainer>
        <Button type="submit" onClick={handleClick}>
          SALVAR
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

export default Form;
