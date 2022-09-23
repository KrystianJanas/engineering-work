import { Nav, Navbar } from 'react-bootstrap';

import styled from '@emotion/styled';
import Link from 'next/link';

const StyledNavbar = styled(Navbar)`
  padding: 0 10px;
`;

const StyledNavLink = styled(Nav.Link)`
  @media (min-width: 992px) {
    margin: 0 5px;
  }

  &:hover {
    color: white;
  }
`;

export const Header = () => {
  return (
    <StyledNavbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link href="/" passHref>
        <Navbar.Brand>Serwis Nieruchomości</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Link href="/messages" passHref>
            <StyledNavLink>Wiadomości</StyledNavLink>
          </Link>
          <Link href="/watched" passHref>
            <StyledNavLink>Obserwowane</StyledNavLink>
          </Link>
        </Nav>
        <Nav>
          <Link href="/account" passHref>
            <StyledNavLink>Twoje konto</StyledNavLink>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};
export default Header;
