import React from 'react';

import { pageTitles } from '../header.constants';

export const useActiveNavLink = (pathname: string) => {
  const [pageTitle, setPageTitle] = React.useState('Rental Service');
  const [activeNavLink, setActiveNavLink] = React.useState(
    pathname.split('/')[1]
  );

  React.useEffect(() => {
    pageTitles.forEach((page) => {
      if (page.href === pathname) {
        setActiveNavLink(pathname.split('/')[1]);
        return setPageTitle(page.title);
      }
      return 'Rental Service';
    });
  }, [pathname]);
  return {
    activeNavLink,
    pageTitle,
  };
};
