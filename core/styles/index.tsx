import { Global } from '@emotion/react';

import { lightTheme } from '~/styles/themes';

import { baseStyles } from './base';
import { propertiesStyles } from './properties';
import { stylesReset } from './reset';

export const GlobalStyles = () => (
  <>
    <Global styles={stylesReset} />
    <Global styles={propertiesStyles} />
    <Global styles={baseStyles} />
    {/* <Global styles={darkTheme} /> */}
    <Global styles={lightTheme} />
  </>
);
