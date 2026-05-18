import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ContainerMaior,
  Menu,
  Container,
  Title,
  Iconsvg,
  Linha,
  MobileToggle,
  MenuItems,
  Logo,
  LogoContainer,
  MenuAction,
  SelectedOrganization,
  SelectedOrganizationLabel,
  SelectedOrganizationSelect,
} from "./style";
import { IoAddCircleOutline, IoMenu, IoClose, IoLogOutOutline } from "react-icons/io5";
import { LiaHorseSolid } from "react-icons/lia";
import { HiOutlineHome } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { TbHorseshoe } from "react-icons/tb";
import logoIcon from "../../assets/icon.svg";
import { organizationService } from "../../services/organizationService";
import { useAuth } from "../../contexts/AuthContext";
import { useOrganizationRole } from "../../hooks/useOrganizationRole";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasAnyOrganization, setHasAnyOrganization] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const params = useParams();
  const selectedSlug = params.slug || localStorage.getItem("organizationSlug");
  const hasOrganization = Boolean(selectedSlug);
  const basePath = hasOrganization ? `/${selectedSlug}` : "/organizacoes";

  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { canAddHorse } = useOrganizationRole();

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const organizationsData = await organizationService.getAll();
        setOrganizations(organizationsData);
        setHasAnyOrganization(organizationsData.length > 0);

        const currentOrganization = organizationsData.find(
          (organization) => organization.slug === selectedSlug
        );

        if (currentOrganization) {
          localStorage.setItem("organizationId", currentOrganization.id);
          localStorage.setItem("organizationName", currentOrganization.name);
          localStorage.setItem("organizationSlug", currentOrganization.slug);
        }
      } catch (error) {
        console.error("Erro ao carregar organizações:", error);
        setHasAnyOrganization(false);
      }
    };

    loadOrganizations();
  }, [selectedSlug]);

const isActive = (path, exact = false) => {
  if (exact) {
    return location.pathname === path;
  }

  return location.pathname.startsWith(path);
};

const handleOrganizationChange = (event) => {
  const newSlug = event.target.value;
  const organization = organizations.find((item) => item.slug === newSlug);

  if (!organization) {
    return;
  }

  localStorage.setItem("organizationId", organization.id);
  localStorage.setItem("organizationName", organization.name);
  localStorage.setItem("organizationSlug", organization.slug);
  setMenuOpen(false);
  navigate(`/${organization.slug}`);
};

  return (
    <div className="App">
      <ContainerMaior>
        <Menu open={menuOpen}>
          <LogoContainer>
            <Logo src={logoIcon} alt="Horsing Around Logo" />
          </LogoContainer>
          <MobileToggle onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </MobileToggle>

          <MenuItems open={menuOpen}>
            {hasOrganization && hasAnyOrganization ? (
              <>
                <SelectedOrganization>
                  <SelectedOrganizationLabel>Organização atual</SelectedOrganizationLabel>
                  <SelectedOrganizationSelect
                    aria-label="Selecionar organizaÃ§Ã£o"
                    onChange={handleOrganizationChange}
                    value={selectedSlug || ""}
                  >
                    {organizations.map((organization) => (
                      <option key={organization.id} value={organization.slug}>
                        {organization.name}
                      </option>
                    ))}
                  </SelectedOrganizationSelect>
                </SelectedOrganization>
                <Linha />
                <Title   to={basePath}  $active={isActive(basePath, true)} onClick={() => setMenuOpen(false)}>
                  <Iconsvg>
                    <HiOutlineHome size={38} />
                  </Iconsvg>
                  Home
                </Title>
                <Linha />
                <Title  to={`${basePath}/cavalos`}  $active={isActive(`${basePath}/cavalos`)} onClick={() => setMenuOpen(false)}>
                  <Iconsvg>
                    <LiaHorseSolid size={38} />
                  </Iconsvg>
                  Cavalos
                </Title>
                <Linha />
                {canAddHorse && (
                  <>
                    <Title
                      to={`${basePath}/adicionar_cavalo`}
                      $active={isActive(`${basePath}/adicionar_cavalo`)}
                      onClick={() => setMenuOpen(false)}>
                      <Iconsvg>
                        <IoAddCircleOutline size={38} />
                      </Iconsvg>
                      Adicionar Cavalo
                    </Title>
                    <Linha />
                  </>
                )}
                <Title to="/organizacoes" $active={isActive(`/organizacoes`)} onClick={() => setMenuOpen(false)}>
                  <Iconsvg>
                    <TbHorseshoe size={38} />
                  </Iconsvg>
                  Organizações
                </Title>
                <Linha />
                <Title to={`${basePath}/equipe`} $active={isActive(`${basePath}/equipe`)} onClick={() => setMenuOpen(false)}>
                  <Iconsvg>
                    <GoPeople size={38} />
                  </Iconsvg>
                  Equipe
                </Title>
              </>
            ) : (
              <Title to="/organizacoes" onClick={() => setMenuOpen(false)}>
                <Iconsvg>
                  <TbHorseshoe size={38} />
                </Iconsvg>
                Organizações
              </Title>
            )}

            <Linha />
            <MenuAction type="button" onClick={async () => {
              try {
                await signOut();
              } catch (error) {
                console.error("Erro ao sair:", error);
              } finally {
                localStorage.removeItem("organizationId");
                localStorage.removeItem("organizationName");
                localStorage.removeItem("organizationSlug");
                navigate("/login");
              }
            }}>
              <Iconsvg>
                <IoLogOutOutline size={38} />
              </Iconsvg>
              Sair
            </MenuAction>
          </MenuItems>
        </Menu>

        <Container>
          <Outlet />
        </Container>
      </ContainerMaior>
    </div>
  );
}

export default Layout;
