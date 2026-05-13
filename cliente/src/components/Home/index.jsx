import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { useHorseData } from "../../hooks/useHorseData";
import { organizationService } from "../../services/organizationService";

function Home() {
  const { slug } = useParams();
  const { cavalosF, cavalosM, cavalos, cavalosMedicados, cavaloMaisUsado } =
    useHorseData();

  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        let orgId = localStorage.getItem("organizationId");
        let selectedSlug = localStorage.getItem("organizationSlug");
        const organizationSlug = slug || selectedSlug;

        if (slug && selectedSlug && slug !== selectedSlug) {
          orgId = null;
          selectedSlug = slug;
          localStorage.removeItem("organizationId");
          localStorage.removeItem("organizationName");
          localStorage.setItem("organizationSlug", slug);
        }

        if (!orgId && organizationSlug) {
          const orgBySlug = await organizationService.getBySlug(organizationSlug);
          if (orgBySlug) {
            orgId = orgBySlug.id;
            localStorage.setItem("organizationId", orgId);
            localStorage.setItem("organizationName", orgBySlug.name);
            localStorage.setItem("organizationSlug", orgBySlug.slug);
          }
        }

        if (!orgId) {
          return;
        }

        const data = await organizationService.getById(orgId);
        setOrganization(data);
      } catch (error) {
        console.log("Erro ao buscar organização:", error);
      }
    };

    loadOrganization();
  }, [slug]);

  if (!organization) {
    return <h2>Carregando organização...</h2>;
  }

  return (
    <Container>
      <Container_E>
        <Hipica>Hípica {organization.name}</Hipica>
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
