import { css, SerializedStyles } from '@emotion/react';

import {
  LayoutDimensionProps,
  LayoutDisplayProps,
  LayoutFlexProps,
  LayoutPositionProps,
  LayoutMarginProps,
  LayoutPaddingProps,
  LayoutBackgroundProps,
  LayoutBorderProps,
  LayoutOrdersProps,
} from '~/components/molecules/layout/layout.types';

export const layoutResetStyles = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
`;

export const mixinDimensions = (
  props: LayoutDimensionProps
): SerializedStyles => {
  let { width, height } = props;
  if (
    !(
      height?.toString().includes('px') ||
      height?.toString().includes('%') ||
      height?.toString().includes('content')
    )
  ) {
    height = height && `${height}px`;
  }
  if (
    !(width?.toString().includes('auto') || width?.toString().includes('%'))
  ) {
    width = width && `${width}px`;
  }

  return css`
    width: ${width};

    height: ${height};

    min-width: ${props.minWidth};

    min-height: ${props.minHeight};

    max-width: ${props.maxWidth};

    max-height: ${props.maxHeight};
  `;
};

export const mixinDisplay = (props: LayoutDisplayProps): SerializedStyles => {
  return css`
    display: ${props.display && `${props.display}`};
    gap: ${props.gap ? `${props.gap}` : undefined};
  `;
};

export const mixinPosition = (props: LayoutPositionProps): SerializedStyles => {
  return css`
    position: ${props.position ? `${props.position}` : undefined};
    top: ${props.top ? `${props.top}px` : undefined};
    right: ${props.right ? `${props.right}px` : undefined};
    bottom: ${props.bottom ? `${props.bottom}px` : undefined};
    left: ${props.left ? `${props.left}px` : undefined};
  `;
};

export const mixinFlex = (props: LayoutFlexProps): SerializedStyles => {
  return css`
    flex-grow: ${props.grow ? `${props.grow}` : undefined};
    flex-shrink: ${props.shrink ? `${props.shrink}` : undefined};
    flex-direction: ${props.direction ? `${props.direction}` : undefined};
    flex-wrap: ${props.wrap ? `${props.wrap}` : undefined};
    align-content: ${props.alignContent ? `${props.alignContent}` : undefined};
    align-items: ${props.alignItems ? `${props.alignItems}` : undefined};
    justify-content: ${props.justifyContent
      ? `${props.justifyContent}`
      : undefined};
    justify-self: ${props.justifySelf ? `${props.justifySelf}` : undefined};
    flex: ${props.flex ? `${props.flex}` : undefined};
  `;
};
export const mixinMargin = (props: LayoutMarginProps): SerializedStyles => {
  let { marginBottom, marginRight, marginLeft, marginTop } = props;
  if (marginBottom && marginBottom.toString().includes('auto')) {
    marginBottom = props.marginBottom;
  } else {
    marginBottom = props.marginBottom && `${props.marginBottom}px`;
  }
  if (marginTop && marginTop.toString().includes('auto')) {
    marginTop = props.marginTop;
  } else {
    marginTop = props.marginTop && `${props.marginTop}px`;
  }
  if (marginLeft && marginLeft.toString().includes('auto')) {
    marginLeft = props.marginLeft;
  } else {
    marginLeft = props.marginLeft && `${props.marginLeft}px`;
  }
  if (marginRight && marginRight.toString().includes('auto')) {
    marginRight = props.marginRight;
  } else {
    marginRight = props.marginRight && `${props.marginRight}px`;
  }
  return css`
    margin: ${props.margin
      ? `${(props.margin as []).join('px ')}px`
      : undefined};

    margin-top: ${marginTop};

    margin-right: ${marginRight};

    margin-bottom: ${marginBottom};

    margin-left: ${marginLeft};
  `;
};

export const mixinPadding = (props: LayoutPaddingProps): SerializedStyles => {
  return css`
    padding: ${props.padding
      ? `${(props.padding as []).join('px ')}px`
      : undefined};
    padding-top: ${props.paddingTop ? `${props.paddingTop}px` : undefined};
    padding-right: ${props.paddingRight
      ? `${props.paddingRight}px`
      : undefined};
    padding-bottom: ${props.paddingBottom
      ? `${props.paddingBottom}px`
      : undefined};
    padding-left: ${props.paddingLeft ? `${props.paddingLeft}px` : undefined};
  `;
};

export const mixinBackground = (
  props: LayoutBackgroundProps
): SerializedStyles => {
  return css`
    background: ${props.background && `${props.background}`};
    background-color: ${props.backgroundColor
      ? `${props.backgroundColor}`
      : undefined};
    background-repeat: ${props.backgroundRepeat
      ? `${props.backgroundRepeat}`
      : undefined};
    background-size: ${props.backgroundSize
      ? `${props.backgroundSize}`
      : undefined};
  `;
};

export const mixinBorder = (props: LayoutBorderProps): SerializedStyles => {
  return css`
    border: ${props.border && props.border};
    border-radius: ${props.borderRadius ? `${props.borderRadius}` : undefined};
    border-top-left-radius: ${props.borderTopLeftRadius
      ? `${props.borderTopLeftRadius}`
      : undefined};
    border-top-right-radius: ${props.borderTopRightRadius
      ? `${props.borderTopRightRadius}`
      : undefined};
    border-bottom-left-radius: ${props.borderBottomLeftRadius
      ? `${props.borderBottomLeftRadius}`
      : undefined};
    border-bottom-right-radius: ${props.borderBottomRightRadius
      ? `${props.borderBottomRightRadius}`
      : undefined};
  `;
};

export const mixInOrders = (props: LayoutOrdersProps): SerializedStyles => {
  return css`
    box-shadow: ${props.boxShadow ? `${props.boxShadow}` : undefined};
    overflow: ${props.overflow ? `${props.overflow}` : undefined};
    overflow-y: ${props.overflowY ? `${props.overflowY}` : undefined};
  `;
};
