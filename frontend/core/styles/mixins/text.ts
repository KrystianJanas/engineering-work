import { Property } from 'csstype';

export interface TextMixinProps {
  weight?: Property.FontWeight;
  size?: Property.FontSize;
  color?: Property.Color;
  fontFamily?: Property.Font;
  textShadow?: Property.TextShadow;
  lineHeight?: Property.LineHeight;
  textAlign?: Property.TextAlign;
}

export const textMixin = ({
  weight = 400,
  size = 'main',
  color = 'black',
  fontFamily = 'Inter',
  textShadow,
  lineHeight,
  textAlign,
}: TextMixinProps) => ({
  fontWeight: weight,
  fontSize: size,
  color,
  fontFamily,
  textShadow,
  marginBottom: '0',
  lineHeight,
  textAlign,
});
