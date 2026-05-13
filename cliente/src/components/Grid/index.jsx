import React from "react";
import { horseService } from "../../services/horseService";
import {
  Card,
  Container,
  EmptyState,
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
import { useParams } from "react-router-dom";
const Grid = () => {
  const { slug } = useParams();
  const [cavalos, setCavalos] = useState([]);
  const fetchAllCavalos = async () => {
    try {
      const data = await horseService.getAll();
      setCavalos(data);
    } catch (err) {
      console.log("Erro ao buscar cavalos:", err);
    }
  };

  useEffect(() => {
    fetchAllCavalos();
  }, []);

  return (
    <Container>
      {cavalos.length === 0 ? (
        <EmptyState>
          <h2>Não há cavalos cadastrados nesta organização.</h2>
          <Botao to={`/${slug}/adicionar_cavalo`}>Adicionar Cavalo</Botao>
        </EmptyState>
      ) : (
        cavalos.map((cavalos) => (
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
            <Botao to={`/${slug}/cavalos/${cavalos.id}`}>Ver detalhes</Botao>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Grid;
