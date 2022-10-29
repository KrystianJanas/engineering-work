import { Nav, Navbar } from 'react-bootstrap';

import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PagesNav } from '../header.constants';

const StyledNavbar = styled(Navbar)`
  padding: 0 10px;
  height: 100px;
  border: 1px solid #c3d4e966;
  background: white;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #333333;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;

  margin: 0 15px;

  &:hover {
    color: #12b9ac;
  }
`;

const StyledClickedNavLink = styled(Nav.Link)`
  color: #12b9ac !important;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;

  margin: 0 15px;
`;

export const Header = () => {
  const { pathname } = useRouter();

  return (
    <StyledNavbar collapseOnSelect expand="lg">
      <Link href="/" passHref>
        <Navbar.Brand>Serwis Nieruchomości</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {PagesNav.map((page) => (
            <Link key={page.href} href={page.href} passHref>
              {page.href === `/${pathname.split('/')[1]}` ? (
                <StyledClickedNavLink>{page.pageName}</StyledClickedNavLink>
              ) : (
                <StyledNavLink>{page.pageName}</StyledNavLink>
              )}
            </Link>
          ))}
        </Nav>
        <Nav>
          <Link href="/property" passHref>
            {pathname === '/property' ? (
              <StyledClickedNavLink>
                Zarządzaj Nieruchomością
              </StyledClickedNavLink>
            ) : (
              <StyledNavLink>Zarządzaj Nieruchomością</StyledNavLink>
            )}
          </Link>
          <Link href="/account" passHref>
            {pathname === '/account' ? (
              <StyledClickedNavLink>Twoje konto</StyledClickedNavLink>
            ) : (
              <StyledNavLink>Twoje konto</StyledNavLink>
            )}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </StyledNavbar>
  );
};
export default Header;
