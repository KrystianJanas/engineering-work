import { Property } from 'csstype';

export interface TextMixinProps {
  weight?: Property.FontWeight;
  size?: Property.FontSize;
  color?: Property.Color;
  fontFamily?: 'Arial' | 'Verdana' | 'Inter';
  textShadow?: '1px 1px 5px black' | '1px 1px 5px white';
}

export const textMixin = ({
  weight = 400,
  size = 'main',
  color = 'black',
  fontFamily = 'Arial',
  textShadow,
}: TextMixinProps) => ({
  fontWeight: weight,
  fontSize: `${size}`,
  color: `${color}`,
  fontFamily: `${fontFamily}`,
  textShadow: `${textShadow}`,
  marginBottom: '0',
});