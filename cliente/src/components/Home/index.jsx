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
  SkeletonCard,
  SkeletonImage,
  SkeletonImageCard,
  SkeletonLine,
  SkeletonSideImage,
  SkeletonTitle,
} from "./style.js";
import { useHorseData } from "../../hooks/useHorseData";
import { organizationService } from "../../services/organizationService";

function Home() {
  const { slug } = useParams();
  const { cavalosF, cavalosM, cavalos, cavalosMedicados, cavaloMaisUsado } =
    useHorseData();

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(false);

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
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    loadOrganization();
  }, [slug]);

  if (loading || !organization) {
    return (
      <Container>
        <Container_E aria-busy="true" aria-label="Carregando organização">
          <SkeletonTitle />
          <SkeletonCard>
            <SkeletonLine $width="70%" $height="28px" />
            <SkeletonLine $width="85%" />
          </SkeletonCard>
          <SkeletonCard>
            <SkeletonLine $width="58%" $height="28px" />
            <SkeletonLine $width="100%" />
          </SkeletonCard>
          <SkeletonImageCard>
            <SkeletonImage />
            <CardText>
              <SkeletonLine $width="80%" $height="28px" />
              <SkeletonLine $width="35%" />
            </CardText>
          </SkeletonImageCard>
        </Container_E>
        <DivImg>
          <SkeletonSideImage />
        </DivImg>
      </Container>
    );
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
