import { Nav, Navbar } from 'react-bootstrap';

import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from '~/components/molecules/layout';
import { getRem } from '~/styles/utils';

import { PagesNav } from '../header.constants';

const StyledNavbar = styled(Navbar)`
  padding: 0 10px;
  height: 100px;
  border: 1px solid var(--border-grey);
  background: white;
`;

const StyledNavLink = styled(Nav.Link)`
  color: var(--text-grey-black);
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: ${getRem(18)};
  line-height: 28px;

  padding-right: 15px;

  &:hover {
    color: var(--text-green);
  }
`;

const StyledClickedNavLink = styled(Nav.Link)`
  color: var(--text-green) !important;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: ${getRem(18)};
  line-height: 28px;

  padding-right: 15px;
`;

const StyledLayout = styled(Layout)`
  text-align: center;
`;

const StyledNavbarBrand = styled(Navbar.Brand)`
  padding-left: 15px;
`;

const StyledNav = styled(Nav)`
  margin-left: 25px;
  gap: 20px;
`;

export const Header = () => {
  const { pathname } = useRouter();

  return (
    <StyledLayout>
      <StyledNavbar collapseOnSelect expand="lg">
        <Link href="/" passHref>
          <StyledNavbarBrand>Serwis Nieruchomości</StyledNavbarBrand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <StyledNav className="me-auto">
            {PagesNav.map((page) => (
              <Link key={page.href} href={page.href} passHref>
                {page.href === `/${pathname.split('/')[1]}` ? (
                  <StyledClickedNavLink>{page.pageName}</StyledClickedNavLink>
                ) : (
                  <StyledNavLink>{page.pageName}</StyledNavLink>
                )}
              </Link>
            ))}
          </StyledNav>
          <Nav>
            <Link href="/management" passHref>
              {pathname.includes('/management') ? (
                <StyledClickedNavLink>Panel zarządzania</StyledClickedNavLink>
              ) : (
                <StyledNavLink>Panel zarządzania</StyledNavLink>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </StyledNavbar>
    </StyledLayout>
  );
};
