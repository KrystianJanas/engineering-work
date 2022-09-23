export interface TextMixinProps {
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  size?:
    | 'main'
    | 'sub'
    | 'small'
    | 'smaller'
    | '1 rem'
    | '1.1rem'
    | '1.25rem'
    | '1.5rem'
    | '1.75rem'
    | '2rem';
  color?: 'white' | 'black';
  fontFamily?: 'Arial' | 'Verdana';
  textShadow?: '1px 1px 5px black' | '1px 1px 5px white';
}

export const textMixin = ({
  weight = 400,
  size = 'main',
  color = 'white',
  fontFamily = 'Arial',
  textShadow,
}: TextMixinProps) => ({
  fontWeight: weight,
  fontSize: `${size}`,
  color: `${color}`,
  fontFamily: `${fontFamily}`,
  textShadow: `${textShadow}`,
});
