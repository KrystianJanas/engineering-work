// eslint-disable-next-line no-restricted-syntax
import React, { HTMLAttributes, Ref } from 'react';

import { Property } from 'csstype';

export interface LayoutDimensionProps {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
}

export interface LayoutProps
  extends Partial<HTMLAttributes<HTMLDivElement>>,
    LayoutDimensionProps,
    LayoutPositionProps,
    LayoutMarginProps,
    LayoutPaddingProps,
    LayoutDisplayProps,
    LayoutFlexProps,
    LayoutBackgroundProps,
    LayoutBorderProps,
    LayoutOrdersProps {
  ref?: Ref<any>;
  as?: React.ElementType;
}

export interface LayoutPaddingProps {
  padding?: number | string | number[];
  paddingTop?: number | string;
  paddingRight?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
}

export interface LayoutMarginProps {
  margin?: number | string | number[] | string[];
  marginTop?: number | string;
  marginRight?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
}

export interface LayoutPositionProps {
  position?: Property.Position;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

export interface LayoutFlexProps {
  grow?: Property.FlexGrow;
  shrink?: Property.FlexShrink;
  direction?: Property.FlexDirection;
  wrap?: Property.FlexWrap;
  alignContent?: Property.AlignContent;
  alignItems?: Property.AlignItems;
  justifyContent?: Property.JustifyContent;
  justifySelf?: Property.JustifySelf;
  gap?: Property.Gap;
  flex?: Property.Flex;
}

export interface LayoutDisplayProps {
  display?: Property.Display;
}

export interface LayoutBackgroundProps {
  background?: Property.Background;
  backgroundColor?: Property.BackgroundColor;
  backgroundRepeat?: Property.BackgroundRepeat;
}

export interface LayoutBorderProps {
  borderRadius?: Property.BorderRadius;
}

export interface LayoutOrdersProps {
  boxShadow?: Property.BoxShadow;
}
