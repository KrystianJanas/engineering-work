import { Nav, Navbar } from 'react-bootstrap';

import styled from '@emotion/styled';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PagesNav } from '../header.constants';
import { useActiveNavLink } from '../hooks/useActiveNavLink';

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

  @media (min-width: 992px) {
    margin: 0 5px;
  }

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

  @media (min-width: 992px) {
    margin: 0 5px;
  }
`;

export const Header = () => {
  const { pathname } = useRouter();
  const { pageTitle } = useActiveNavLink(pathname);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <StyledNavbar collapseOnSelect expand="lg">
        <Link href="/" passHref>
          <Navbar.Brand>Serwis Nieruchomości</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {PagesNav.map((page) => (
              <Link key={page.href} href={page.href} passHref>
                {page.href === pathname ? (
                  <StyledClickedNavLink>{page.pageName}</StyledClickedNavLink>
                ) : (
                  <StyledNavLink>{page.pageName}</StyledNavLink>
                )}
              </Link>
            ))}
          </Nav>
          <Nav>
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
    </>
  );
};
export default Header;
