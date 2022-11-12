import * as React from 'react';
import { GlobalStyles } from '../core/styles';
import { ThemeWrapper } from './theme-wrapper';

const themeDecorator = story => <ThemeWrapper>
  <GlobalStyles />
  {story()}
</ThemeWrapper>

export const decorators = [themeDecorator];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
