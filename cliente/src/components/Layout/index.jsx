import { Outlet } from "react-router-dom";
import {
  ContainerMaior,
  Menu,
  Container,
  Title,
  Iconsvg,
  Linha,
} from "./style";
import { IoAddCircleOutline } from "react-icons/io5";
import { LiaHorseSolid } from "react-icons/lia";
import { HiOutlineHome } from "react-icons/hi2";

function Layout() {
  return (
    <div className="App">
      <ContainerMaior>
        <Menu>
          <Title to="/">
            <Iconsvg>
              <HiOutlineHome size={40} />
            </Iconsvg>
            Home
          </Title>
          <Linha />
          <Title to="cavalos">
            <Iconsvg>
              <LiaHorseSolid size={40} />
            </Iconsvg>
            Cavalos
          </Title>
          <Linha />
          <Title to="adicionar_cavalo">
            <Iconsvg>
              <IoAddCircleOutline size={40} />
            </Iconsvg>
            Adicionar Cavalo
          </Title>
        </Menu>

        <Container>
          <Outlet />
        </Container>
      </ContainerMaior>
    </div>
  );
}

export default Layout;
