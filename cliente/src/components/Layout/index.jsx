import { Outlet, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
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
} from "./style";
import { IoAddCircleOutline, IoMenu, IoClose } from "react-icons/io5";
import { LiaHorseSolid } from "react-icons/lia";
import { HiOutlineHome } from "react-icons/hi2";
import { GoPeople } from "react-icons/go";
import { TbHorseshoe } from "react-icons/tb";
import logoIcon from "../../assets/icon.svg";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const selectedSlug = params.slug || localStorage.getItem("organizationSlug");
  const hasOrganization = Boolean(selectedSlug);
  const basePath = hasOrganization ? `/${selectedSlug}` : "/organizacoes";

  const location = useLocation();

const isActive = (path, exact = false) => {
  if (exact) {
    return location.pathname === path;
  }

  return location.pathname.startsWith(path);
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
            {hasOrganization ? (
              <>
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
