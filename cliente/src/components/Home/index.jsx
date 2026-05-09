import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Item,
  ItemNome,
  ItemBanco,
  Img,
  CardText,
  ItemCorrespondente,
  Container_D,
  Container_E,
  Hipica,
  CardImg,
  DivImg,
} from "./style.js";
import axios from "axios";
import { useHorseData } from "../../hooks/useHorseData";

function Home() {
  const { cavalosF, cavalosM, cavalos, cavalosMedicados, cavaloMaisUsado } =
    useHorseData();

  return (
    <Container>
      <Container_E>
        <Hipica>Hípica Vale dos Anjos</Hipica>
        <Card>
          <ItemNome>Total de cavalos na Hípica:</ItemNome>
          <ItemCorrespondente>
            <Item>Fêmeas:</Item>
            <ItemBanco>{cavalosF}</ItemBanco>
            <Item>Machos:</Item>
            <ItemBanco>{cavalosM}</ItemBanco>
          </ItemCorrespondente>
        </Card>
        {cavalosMedicados.length > 0 && (
          <Card>
            <ItemNome>Cavalos sob medicação:</ItemNome>

            <ItemCorrespondente>
              <ItemBanco>
                {cavalosMedicados
                  .map((cavaloMedicado) => cavaloMedicado.name)
                  .join(", ")}
              </ItemBanco>
            </ItemCorrespondente>
          </Card>
        )}

        {cavaloMaisUsado && (
          <CardImg>
            {cavaloMaisUsado.pictureurl && (
              <Img src={cavaloMaisUsado.pictureurl} alt="imagem" />
            )}
            <CardText>
              <ItemNome>Cavalo mais usado pela escola de equitação: </ItemNome>
              <ItemBanco>{cavaloMaisUsado.name || ""}</ItemBanco>
            </CardText>
          </CardImg>
        )}
      </Container_E>
      <DivImg>
        <Container_D src="https://res.cloudinary.com/dgjpw8ei8/image/upload/v1682433253/images/x093h8swkteywf4nsqwy.jpg" />
      </DivImg>
    </Container>
  );
}

export default Home;
