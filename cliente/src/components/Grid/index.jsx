import React from "react";
import api from "../../services/api";
import {
  Card,
  Container,
  Item,
  ItemNome,
  ItemBanco,
  Img,
  CardText,
  ItemCorrespondente,
  ItemMedicacao,
  Botao,
} from "./style.js";
import { useState } from "react";
import { useEffect } from "react";
const Grid = () => {
  const [cavalos, setCavalos] = useState([]);
  const fetchAllCavalos = async () => {
    try {
      const res = await api.get("/cavalos");

      setCavalos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCavalos();
  }, []);

  return (
    <Container>
      {cavalos.map((cavalos) => (
        <Card className="cavalo" key={cavalos.id}>
          {cavalos.pictureurl && <Img src={cavalos.pictureurl} alt="imagem" />}
          <CardText>
            <ItemNome>{cavalos.name}</ItemNome>
            <ItemCorrespondente>
              <Item>Idade:</Item>
              <ItemBanco>{cavalos.age} anos</ItemBanco>
            </ItemCorrespondente>
            <ItemCorrespondente>
              <Item>Ração:</Item>
              <ItemBanco>{cavalos.foodamount} kg</ItemBanco>
            </ItemCorrespondente>
            <ItemCorrespondente>
              <Item>Aulas:</Item>
              <ItemBanco>{cavalos.lessons}</ItemBanco>
            </ItemCorrespondente>
            <ItemCorrespondente>
              <Item>Feno:</Item>
              <ItemBanco>
                {cavalos.hay === "true" || cavalos.hay === true ? "Sim" : "Não"}
              </ItemBanco>
            </ItemCorrespondente>
            <ItemMedicacao>
              <Item>Medicação:</Item>
              <ItemBanco>
                {cavalos.medication === "true" || cavalos.medication === true
                  ? cavalos.medicationtype
                  : "Não"}
              </ItemBanco>
            </ItemMedicacao>
          </CardText>
          <Botao to={`/cavalos/${cavalos.id}`}>Ver detalhes</Botao>
        </Card>
      ))}
    </Container>
  );
};

export default Grid;
