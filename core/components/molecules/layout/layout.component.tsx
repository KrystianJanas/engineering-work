// eslint-disable-next-line no-restricted-syntax
import React, { forwardRef, Ref } from 'react';

import styled from '@emotion/styled';

import {
  layoutResetStyles,
  mixinDimensions,
  mixinFlex,
  mixinDisplay,
  mixinPosition,
  mixinMargin,
  mixinPadding,
  mixinBackground,
} from '~/components/molecules/layout/layout.styles';
import { LayoutProps } from '~/components/molecules/layout/layout.types';

const StyledLayout = styled.div<LayoutProps>`
  ${layoutResetStyles}
  ${mixinDimensions}
  ${mixinFlex}
  ${mixinDisplay}
  ${mixinPosition}
  ${mixinMargin}
  ${mixinPadding}
  ${mixinBackground}
`;

// eslint-disable-next-line @typescript-eslint/ban-types
export const Layout: React.FC<LayoutProps> = forwardRef(
  (props, ref: Ref<any>) => {
    return <StyledLayout ref={ref} {...props} />;
  }
);
